'use client';

import React from 'react'
import { useRouter } from 'next/navigation'
import AppBar from 'ui-component/extended/AppBar'
import Building from '../components/Building'
import './ApartmentsPage.css'

function ApartmentsPage() {
  const router = useRouter()

  const handleBuildingClick = (buildingId) => {
    console.log('Building clicked:', buildingId)
    // Переход на страницу дома 9 при клике на building-9
    if (buildingId === 'building-9') {
      router.push('/building-9')
    }
    // Здесь можно добавить логику для обработки клика на другие дома
  }

  // ============================================
  // Данные о домах
  // ============================================
  const buildingsData = {
    'building-1': {
      name: 'Дом 1',
      status: 'В продаже',
      apartments: '15 квартир в продаже',
      price: 'Цена по запросу'
    },
    'building-2': {
      name: 'Дом 2',
      status: 'В продаже',
      apartments: '8 квартир в продаже',
      price: 'Цена по запросу'
    },
    'building-3': {
      name: 'Дом 3',
      status: 'Продан',
      apartments: '0 квартир в продаже',
      price: 'Все квартиры проданы'
    },
    'building-4': {
      name: 'Дом 4',
      status: 'В продаже',
      apartments: '12 квартир в продаже',
      price: 'Цена по запросу'
    },
    'building-5': {
      name: 'Дом 5',
      status: 'В продаже',
      apartments: '10 квартир в продаже',
      price: 'Цена по запросу'
    },
    'building-6': {
      name: 'Дом 6',
      status: 'В продаже',
      apartments: '6 квартир в продаже',
      price: 'Цена по запросу'
    },
    'building-7': {
      name: 'Дом 7',
      status: 'Продан',
      apartments: '0 квартир в продаже',
      price: 'Все квартиры проданы'
    },
    'building-8': {
      name: 'Дом 8',
      status: 'В продаже',
      apartments: '18 квартир в продаже',
      price: 'Цена по запросу'
    },
    'building-9': {
      name: 'Дом 9',
      status: 'В продаже',
      apartments: '20 квартир в продаже',
      price: 'Цена по запросу'
    },
    'building-10': {
      name: 'Дом 10',
      status: 'В продаже',
      apartments: '7 квартир в продаже',
      price: 'Цена по запросу'
    },
    'building-11': {
      name: 'Дом 11',
      status: 'В продаже',
      apartments: '14 квартир в продаже',
      price: 'Цена по запросу'
    },
    'building-12': {
      name: 'Дом 12',
      status: 'В продаже',
      apartments: '16 квартир в продаже',
      price: 'Цена по запросу'
    },
    'building-13': {
      name: 'Дом 13',
      status: 'Продан',
      apartments: '0 квартир в продаже',
      price: 'Все квартиры проданы'
    }
  }

  // ============================================
  // Координаты и размеры нарезанной картинки
  // ============================================
  // Дом 1
  const building1X = 134        // X координата
  const building1Y = 666        // Y координата
  const building1Width = 388    // Ширина картинки
  const building1Height = 347   // Высота картинки
  // Polygon координаты для clip-path (23 точки из Figma)
  const building1Polygon = `
    317px 347px, 
    30.5px 152px, 
    0px 47px, 
    46px 18.5px, 
    46px 14.5px, 
    52px 10px, 
    56.5px 12px, 
    72.5px 0px, 
    84px 8px, 
    92.5px 1.5px, 
    151px 31.5px, 
    156px 28px, 
    182px 37.5px, 
    182px 49.5px, 
    255px 99px, 
    255px 112px, 
    297px 136px, 
    328.5px 145.5px, 
    328.5px 160.5px, 
    362.5px 179px, 
    362.5px 186.5px, 
    375px 193.5px, 
    391px 289.5px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 2
  const building2X = 335        // X координата
  const building2Y = 110        // Y координата
  const building2Width = 248    // Ширина картинки
  const building2Height = 168   // Высота картинки
  // Polygon координаты для clip-path (13 точек из Figma)
  const building2Polygon = `
    240px 67px, 
    248px 145.5px, 
    207px 169.5px, 
    4.5px 88.5px, 
    0px 20.5px, 
    43px 0px, 
    78.5px 18.5px, 
    103px 21px, 
    124px 36.5px, 
    139px 42.5px, 
    159px 39.5px, 
    177.5px 39.5px, 
    191.5px 44.5px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 3
  const building3X = 605        // X координата
  const building3Y = 79         // Y координата
  const building3Width = 191    // Ширина картинки
  const building3Height = 178   // Высота картинки
  // Polygon координаты для clip-path (17 точек из Figma)
  const building3Polygon = `
    50.5px 174px, 
    6.5px 157px, 
    0px 71px, 
    45px 42px, 
    48px 44px, 
    71px 32px, 
    77.5px 32px, 
    114px 10.5px, 
    139.5px 0px, 
    163px 7px, 
    175px 10.5px, 
    187px 15.5px, 
    189.5px 103.5px, 
    111px 144px, 
    112px 156px, 
    94.5px 166.5px, 
    74px 159px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 4
  const building4X = 357        // X координата
  const building4Y = 495       // Y координата
  const building4Width = 393   // Ширина картинки
  const building4Height = 315  // Высота картинки
  // Polygon координаты для clip-path (39 точек из Figma)
  const building4Polygon = `
    18.5px 141px, 
    0px 39.5px, 
    35.5px 18px, 
    35.5px 15px, 
    41px 11px, 
    44px 12px, 
    57.5px 2px, 
    66.5px 6.5px, 
    74.5px 0px, 
    88.5px 7.5px, 
    98.5px 1px, 
    128.5px 17.5px, 
    128.5px 23px, 
    154.5px 33.5px, 
    154.5px 42.5px, 
    157px 41.5px, 
    162px 40.5px, 
    162px 51px, 
    172px 56.5px, 
    180.5px 51px, 
    201.5px 63px, 
    206.5px 59.5px, 
    234px 69.5px, 
    234px 82.5px, 
    263.5px 98px, 
    263.5px 108.5px, 
    276px 118px, 
    272.5px 121.5px, 
    281px 126px, 
    288px 121.5px, 
    311.5px 134.5px, 
    319.5px 132px, 
    346px 139px, 
    346px 155.5px, 
    378px 170.5px, 
    378px 180.5px, 
    391px 187px, 
    393.5px 282.5px, 
    340.5px 324px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 5
  const building5X = 894        // X координата
  const building5Y = 353        // Y координата
  const building5Width = 215    // Ширина картинки
  const building5Height = 217   // Высота картинки
  // Polygon координаты для clip-path (16 точек из Figma)
  const building5Polygon = `
    211.5px 22.5px, 
    210px 106.5px, 
    194px 120px, 
    200.5px 123.5px, 
    200.5px 138px, 
    179.5px 154px, 
    164px 145.5px, 
    125.5px 175px, 
    131.5px 178px, 
    131.5px 192px, 
    111px 208.5px, 
    94.5px 201.5px, 
    66.5px 220.5px, 
    0px 192px, 
    0px 106.5px, 
    152px 0px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 6
  const building6X = 788        // X координата
  const building6Y = 299        // Y координата
  const building6Width = 136    // Ширина картинки
  const building6Height = 152  // Высота картинки
  // Polygon координаты для clip-path (11 точек из Figma)
  const building6Polygon = `
    135.5px 21.5px, 
    135.5px 108.5px, 
    122.5px 117px, 
    125.5px 119.5px, 
    125.5px 133.5px, 
    104px 148px, 
    87px 141.5px, 
    61.5px 156.5px, 
    0px 129.5px, 
    0px 51px, 
    78px 0px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 7
  const building7X = 647        // X координата
  const building7Y = 245        // Y координата
  const building7Width = 133    // Ширина картинки
  const building7Height = 133   // Высота картинки
  // Polygon координаты для clip-path (10 точек из Figma)
  const building7Polygon = `
    77px 0px, 
    130.5px 20px, 
    132.5px 91.5px, 
    119.5px 101px, 
    119.5px 113.5px, 
    102.5px 126px, 
    84px 116px, 
    54px 135.5px, 
    2.5px 104px, 
    0px 46px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 8
  const building8X = 496        // X координата
  const building8Y = 317        // Y координата
  const building8Width = 424   // Ширина картинки
  const building8Height = 378  // Высота картинки
  // Polygon координаты для clip-path (25 точек из Figma)
  const building8Polygon = `
    361.5px 379.5px, 
    9.5px 124.5px, 
    0px 26.5px, 
    55px 0px, 
    63px 6px, 
    73.5px 2.5px, 
    114.5px 26.5px, 
    118.5px 23.5px, 
    137px 31.5px, 
    137px 40.5px, 
    230px 107px, 
    243px 100.5px, 
    243px 110px, 
    249px 107px, 
    272px 124px, 
    272px 128.5px, 
    329px 170.5px, 
    329px 183px, 
    359px 202.5px, 
    388px 210.5px, 
    388px 224px, 
    412.5px 242px, 
    412.5px 248.5px, 
    423px 255.5px, 
    423px 345.5px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 9
  const building9X = 561        // X координата
  const building9Y = 660        // Y координата
  const building9Width = 482   // Ширина картинки
  const building9Height = 441  // Высота картинки
  // Polygon координаты для clip-path (29 точек из Figma)
  const building9Polygon = `
    0px 341.5px, 
    115.5px 243px, 
    115.5px 231px, 
    322px 58px, 
    335.5px 66px, 
    409px 0px, 
    480px 33px, 
    480px 102px, 
    471px 110px, 
    471px 129px, 
    447px 151.5px, 
    427.5px 142.5px, 
    376px 188px, 
    384px 192.5px, 
    384px 208px, 
    356px 233px, 
    337px 222px, 
    276.5px 273px, 
    286.5px 279px, 
    286.5px 295.5px, 
    259px 321px, 
    237.5px 309.5px, 
    171.5px 368.5px, 
    180.5px 374.5px, 
    180.5px 392.5px, 
    149.5px 420.5px, 
    127.5px 409px, 
    83.5px 446.5px, 
    1.5px 390.5px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 10
  const building10X = 1287       // X координата
  const building10Y = 217        // Y координата
  const building10Width = 271   // Ширина картинки
  const building10Height = 244  // Высота картинки
  // Polygon координаты для clip-path (32 точки из Figma)
  const building10Polygon = `
    2px 178.5px, 
    60.5px 127.5px, 
    60.5px 115.5px, 
    114.5px 68px, 
    116.5px 68px, 
    167px 25px, 
    178px 30px, 
    209px 0px, 
    266.5px 18.5px, 
    262.5px 64.5px, 
    257px 69.5px, 
    262.5px 72px, 
    262.5px 83.5px, 
    249.5px 97px, 
    234.5px 91.5px, 
    209px 111.5px, 
    218.5px 114.5px, 
    218.5px 129px, 
    203px 142px, 
    187px 136.5px, 
    160px 155px, 
    170px 158px, 
    170px 172.5px, 
    154.5px 185.5px, 
    138px 180.5px, 
    107px 204px, 
    119.5px 208px, 
    119.5px 219px, 
    100.5px 236px, 
    82.5px 228.5px, 
    60.5px 246.5px, 
    0px 222px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 11
  const building11X = 788        // X координата
  const building11Y = 172        // Y координата
  const building11Width = 469   // Ширина картинки
  const building11Height = 241  // Высота картинки
  // Polygon координаты для clip-path (31 точка из Figma)
  const building11Polygon = `
    435.5px 245px, 
    310.5px 208px, 
    310.5px 204px, 
    254px 183.5px, 
    249.5px 187px, 
    135.5px 154px, 
    135.5px 150.5px, 
    77px 129px, 
    67px 132.5px, 
    3px 114px, 
    0px 26px, 
    28.5px 0px, 
    59.5px 2.5px, 
    97.5px 13px, 
    105px 6.5px, 
    117px 2.5px, 
    131px 2.5px, 
    131px 23px, 
    191.5px 35px, 
    231.5px 51px, 
    253.5px 58.5px, 
    280.5px 48.5px, 
    294.5px 56.5px, 
    294.5px 65.5px, 
    360.5px 83px, 
    398.5px 101.5px, 
    413.5px 98.5px, 
    427.5px 105.5px, 
    427.5px 116px, 
    466.5px 126px, 
    462px 208.5px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 12
  const building12X = 938        // X координата
  const building12Y = 77         // Y координата
  const building12Width = 416    // Ширина картинки
  const building12Height = 254  // Высота картинки
  // Polygon координаты для clip-path (40 точек из Figma)
  const building12Polygon = `
    410px 226px, 
    369px 258.5px, 
    341.5px 247px, 
    330px 252px, 
    330px 240px, 
    322.5px 238px, 
    322.5px 221px, 
    285px 210.5px, 
    285px 201.5px, 
    271px 193px, 
    255.5px 195px, 
    215.5px 176.5px, 
    151.5px 160px, 
    150.5px 152px, 
    139px 142.5px, 
    118.5px 148.5px, 
    108.5px 152px, 
    76.5px 140.5px, 
    0px 112.5px, 
    4px 23.5px, 
    45.5px 0px, 
    77.5px 16px, 
    90px 16px, 
    108.5px 23.5px, 
    121.5px 23.5px, 
    132.5px 33px, 
    149px 38.5px, 
    162.5px 36px, 
    176px 44px, 
    176px 51.5px, 
    199px 56px, 
    218.5px 65.5px, 
    232.5px 62.5px, 
    250px 76.5px, 
    267.5px 74px, 
    277.5px 85px, 
    299px 88px, 
    325px 99px, 
    323px 113px, 
    417.5px 144.5px
  `.trim().replace(/\s+/g, ' ')
  
  // Дом 13
  const building13X = 1086       // X координата
  const building13Y = 4         // Y координата
  const building13Width = 365    // Ширина картинки
  const building13Height = 247  // Высота картинки
  // Polygon координаты для clip-path (47 точек из Figma)
  const building13Polygon = `
    318px 248.5px, 
    270.5px 226.5px, 
    270.5px 212.5px, 
    176.5px 181.5px, 
    178.5px 167.5px, 
    151px 155.5px, 
    130px 153.5px, 
    120.5px 141.5px, 
    102px 143.5px, 
    86px 130.5px, 
    68.5px 132.5px, 
    51px 123.5px, 
    30.5px 120px, 
    29px 113px, 
    0px 97.5px, 
    2px 15.5px, 
    38px 0px, 
    48px 4.5px, 
    61px 3.5px, 
    74.5px 14px, 
    89px 15.5px, 
    104.5px 9px, 
    116px 15.5px, 
    116px 27px, 
    128.5px 34.5px, 
    141px 34.5px, 
    152.5px 44px, 
    161px 44px, 
    162.5px 55px, 
    182.5px 55px, 
    191px 61.5px, 
    206.5px 67px, 
    206.5px 56.5px, 
    215px 56.5px, 
    215px 65.5px, 
    226px 61.5px, 
    237px 69.5px, 
    237px 79px, 
    288px 101.5px, 
    288px 120px, 
    305px 125px, 
    317.5px 118.5px, 
    329.5px 118.5px, 
    337.5px 127px, 
    337.5px 136.5px, 
    365px 149px, 
    355.5px 229.5px
  `.trim().replace(/\s+/g, ' ')
  // ============================================

  return (
    <>
      <AppBar />
      <div className="apartments-page">
        <div className="apartments-image-section">
          <img 
            src="https://s.domovita.by/images/8e/0c7ba4a95a44069270afed198ff0c598.webp" 
            alt="Residential complex"
            className="apartments-image"
          />
          <Building
            image="/assets/images/residential/Slice 1.png"
            x={building1X}
            y={building1Y}
            width={building1Width}
            height={building1Height}
            polygon={building1Polygon}
            zIndex={15}
            id="building-1"
            onClick={() => handleBuildingClick('building-1')}
            buildingData={buildingsData['building-1']}
          />
          <Building
            image="/assets/images/residential/Slice 2.png"
            x={building2X}
            y={building2Y}
            width={building2Width}
            height={building2Height}
            polygon={building2Polygon}
            id="building-2"
            onClick={() => handleBuildingClick('building-2')}
            buildingData={buildingsData['building-2']}
          />
          <Building
            image="/assets/images/residential/Slice 3.png"
            x={building3X}
            y={building3Y}
            width={building3Width}
            height={building3Height}
            polygon={building3Polygon}
            zIndex={12}
            id="building-3"
            onClick={() => handleBuildingClick('building-3')}
            buildingData={buildingsData['building-3']}
          />
          <Building
            image="/assets/images/residential/Slice 4.png"
            x={building4X}
            y={building4Y}
            width={building4Width}
            height={building4Height}
            polygon={building4Polygon}
            zIndex={5}
            id="building-4"
            onClick={() => handleBuildingClick('building-4')}
            buildingData={buildingsData['building-4']}
          />
          <Building
            image="/assets/images/residential/Slice 5.png"
            x={building5X}
            y={building5Y}
            width={building5Width}
            height={building5Height}
            polygon={building5Polygon}
            id="building-5"
            onClick={() => handleBuildingClick('building-5')}
            buildingData={buildingsData['building-5']}
          />
          <Building
            image="/assets/images/residential/Slice 6.png"
            x={building6X}
            y={building6Y}
            width={building6Width}
            height={building6Height}
            polygon={building6Polygon}
            id="building-6"
            onClick={() => handleBuildingClick('building-6')}
            buildingData={buildingsData['building-6']}
          />
          <Building
            image="/assets/images/residential/Slice 7.png"
            x={building7X}
            y={building7Y}
            width={building7Width}
            height={building7Height}
            polygon={building7Polygon}
            zIndex={8}
            id="building-7"
            onClick={() => handleBuildingClick('building-7')}
            buildingData={buildingsData['building-7']}
          />
          <Building
            image="/assets/images/residential/Slice 8.png"
            x={building8X}
            y={building8Y}
            width={building8Width}
            height={building8Height}
            polygon={building8Polygon}
            id="building-8"
            onClick={() => handleBuildingClick('building-8')}
            buildingData={buildingsData['building-8']}
          />
          <Building
            image="/assets/images/residential/Slice 9.png"
            x={building9X}
            y={building9Y}
            width={building9Width}
            height={building9Height}
            polygon={building9Polygon}
            id="building-9"
            onClick={() => handleBuildingClick('building-9')}
            buildingData={buildingsData['building-9']}
          />
          <Building
            image="/assets/images/residential/Slice 10.png"
            x={building10X}
            y={building10Y}
            width={building10Width}
            height={building10Height}
            polygon={building10Polygon}
            id="building-10"
            onClick={() => handleBuildingClick('building-10')}
            buildingData={buildingsData['building-10']}
          />
          <Building
            image="/assets/images/residential/Slice 11.png"
            x={building11X}
            y={building11Y}
            width={building11Width}
            height={building11Height}
            polygon={building11Polygon}
            id="building-11"
            onClick={() => handleBuildingClick('building-11')}
            buildingData={buildingsData['building-11']}
          />
          <Building
            image="/assets/images/residential/Slice 12.png"
            x={building12X}
            y={building12Y}
            width={building12Width}
            height={building12Height}
            polygon={building12Polygon}
            id="building-12"
            onClick={() => handleBuildingClick('building-12')}
            buildingData={buildingsData['building-12']}
          />
          <Building
            image="/assets/images/residential/Slice 13.png"
            x={building13X}
            y={building13Y}
            width={building13Width}
            height={building13Height}
            polygon={building13Polygon}
            id="building-13"
            onClick={() => handleBuildingClick('building-13')}
            buildingData={buildingsData['building-13']}
          />
        </div>
        <div className="apartments-content">
          {/* Здесь позже можно добавить список доступных квартир и фильтры */}
        </div>
      </div>
    </>
  )
}

export default ApartmentsPage
