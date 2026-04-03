# Residential

Веб-приложение на **Next.js** с лендингом, страницами жилого комплекса и **API на Prisma + PostgreSQL** (квартиры, дома, запросы на покупку, пользователи).

Исходный каркас — шаблон Berry (Material UI); рабочая кодовая база находится в каталоге **`full-version`**.

## Требования

- **Node.js** 18 или новее
- **PostgreSQL** (локально или удалённо)
- Рекомендуется **Yarn** 4.x (в проекте указан `packageManager`); подойдёт и **npm**

Проверка:

```bash
node --version
yarn --version
# или
npm --version
```

## Быстрый старт

1. Перейдите в каталог приложения:

```bash
cd full-version
```

2. Установите зависимости:

```bash
yarn install
```

или:

```bash
npm install
```

3. Настройте окружение: скопируйте пример и укажите **URL базы** и при необходимости **JWT**:

```bash
cp .env.example .env
```

Минимально нужны `DATABASE_URL` и для продакшена — надёжный `JWT_SECRET` (см. раздел [Переменные окружения](#переменные-окружения)).

4. Примените миграции и при желании наполните БД тестовыми данными:

```bash
yarn db:migrate
yarn db:seed
```

5. Запустите dev-сервер:

```bash
yarn dev
```

или:

```bash
npm run dev
```

6. Откройте в браузере: **http://localhost:3000**

## Переменные окружения

Шаблон всех переменных — **`full-version/.env.example`**. Файл **`.env`** не коммитится.

| Переменная | Назначение |
|------------|------------|
| `DATABASE_URL` | Подключение к PostgreSQL для Prisma и приложения |
| `JWT_SECRET` | Подпись токенов для маршрутов `/api/account/*` |

Остальные ключи в `.env.example` нужны только если вы используете соответствующие интеграции шаблона (Mapbox, Firebase, Auth0 и т.д.).

## База данных и миграции

- **Схема и модели:** `full-version/prisma/schema.prisma`
- **Миграции:** `full-version/prisma/migrations/`

Строка подключения задаётся только в **`.env`** в переменной **`DATABASE_URL`** (тот же URL использует Prisma CLI и рантайм через `src/lib/prisma.js`).

Полезные команды (из каталога `full-version`):

| Команда | Описание |
|---------|----------|
| `yarn db:migrate` | `prisma migrate dev` — применить миграции в разработке |
| `yarn db:generate` | `prisma generate` — пересобрать клиент после смены схемы |
| `yarn db:seed` | Запуск `prisma/seed.js` — тестовые дома, этажи, квартиры, пользователи |

Для чистой БД: поднимите PostgreSQL, пропишите `DATABASE_URL`, выполните `yarn db:migrate`, затем при необходимости `yarn db:seed`.

## Дополнительные команды

```bash
# Сборка для продакшена
yarn build

# Запуск production-сборки
yarn start

# Линтер
yarn lint
yarn lint:fix

# Форматирование
yarn prettier
```

## Возможные проблемы

**Порт 3000 занят** — Next.js предложит другой порт (например, 3001).

**Ошибки при установке зависимостей** — обновите Node.js; при необходимости удалите `node_modules` и lockfile вашего менеджера и установите зависимости снова:

```bash
rm -rf node_modules
yarn install
# или: rm package-lock.json && npm install
```

**Нет Yarn** — `npm install -g yarn` или используйте `npm` для команд выше.

**Ошибки Prisma / подключения к БД** — проверьте, что PostgreSQL запущен, база существует, а `DATABASE_URL` в `.env` совпадает с реальными хостом, портом, именем БД и учётными данными.

## Документация шаблона Berry

Если используются возможности админ-шаблона за пределами residential:

- [Интеграция компонентов](https://codedthemes.gitbook.io/berry/setup/integration)
- [Mock backend (устаревшее описание для чистого шаблона)](https://codedthemes.gitbook.io/berry/getting-started/mock-backend) — в этом проекте основной бэкенд для сущностей жилья — **Prisma + PostgreSQL**
