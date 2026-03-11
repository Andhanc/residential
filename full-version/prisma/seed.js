'use strict';

require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const HOUSE_STATUSES = ['NOT_COMPLETED', 'COMPLETED'];
const DEAL_STATUSES = ['NEW', 'IN_PROGRESS', 'COMPLETED', 'CANCELED'];

async function main() {
  console.log('🌱 Начинаем заполнение БД...');

  // Очищаем в обратном порядке из-за внешних ключей
  await prisma.purchaseRequest.deleteMany();
  await prisma.apartment.deleteMany();
  await prisma.floor.deleteMany();
  await prisma.house.deleteMany();
  // Пользователей не трогаем, чтобы не удалить зарегистрированных
  // await prisma.user.deleteMany();

  // --- Дома ---
  const houseCount = 8;
  const houses = [];
  for (let i = 0; i < houseCount; i++) {
    const floorsCount = faker.number.int({ min: 5, max: 12 });
    const house = await prisma.house.create({
      data: {
        name: `Дом ${i + 1}`,
        address: faker.location.streetAddress({ useFullAddress: true }),
        floorsCount,
        status: faker.helpers.arrayElement(HOUSE_STATUSES),
        background: faker.helpers.maybe(() => faker.image.url(), { probability: 0.3 }) ?? null
      }
    });
    houses.push(house);
  }
  console.log(`  Создано домов: ${houses.length}`);

  // --- Этажи и квартиры ---
  const allApartments = [];
  for (const house of houses) {
    for (let f = 1; f <= house.floorsCount; f++) {
      const floor = await prisma.floor.create({
        data: {
          houseId: house.id,
          number: f,
          planImage: faker.helpers.maybe(() => faker.image.url(), { probability: 0.2 }) ?? null,
          layer: f
        }
      });
      const aptsPerFloor = faker.number.int({ min: 2, max: 5 });
      for (let a = 0; a < aptsPerFloor; a++) {
        const rooms = faker.number.int({ min: 1, max: 4 });
        const area = faker.number.float({ min: 28, max: 120, fractionDigits: 2 });
        const price = faker.number.float({ min: 50_000, max: 350_000, fractionDigits: 2 });
        const apt = await prisma.apartment.create({
          data: {
            floorId: floor.id,
            number: `${f}${String(a + 1).padStart(2, '0')}`,
            rooms,
            area,
            price,
            isCommissioned: house.status === 'COMPLETED' ? faker.datatype.boolean() : false,
            article: faker.string.alphanumeric(8).toUpperCase(),
            planImage: faker.helpers.maybe(() => faker.image.url(), { probability: 0.2 }) ?? null
          }
        });
        allApartments.push(apt);
      }
    }
  }
  console.log(`  Создано квартир: ${allApartments.length}`);

  // --- Пользователи (дополнительные, без конфликта с уже зарегистрированными) ---
  const existingEmails = (await prisma.user.findMany({ select: { email: true } })).map((u) => u.email);
  const userCount = 15;
  const users = [];
  for (let i = 0; i < userCount; i++) {
    let email = faker.internet.email().toLowerCase();
    while (existingEmails.includes(email)) {
      email = faker.internet.email().toLowerCase();
    }
    existingEmails.push(email);
    const passwordHash = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        fullName: faker.person.fullName(),
        phone: faker.phone.number(),
        email,
        passwordHash
      }
    });
    users.push(user);
  }
  console.log(`  Создано пользователей: ${users.length}`);

  // --- Запросы на покупку ---
  const requestCount = Math.min(40, users.length * 3);
  for (let i = 0; i < requestCount; i++) {
    const user = faker.helpers.arrayElement(users);
    const apartment = faker.helpers.arrayElement(allApartments);
    await prisma.purchaseRequest.create({
      data: {
        userId: user.id,
        apartmentId: apartment.id,
        requestDate: faker.date.past({ years: 1 }),
        status: faker.helpers.arrayElement(DEAL_STATUSES)
      }
    });
  }
  console.log(`  Создано запросов на покупку: ${requestCount}`);

  console.log('✅ БД успешно заполнена.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
