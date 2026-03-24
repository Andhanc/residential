'use client';

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AppBar from 'ui-component/extended/AppBar'
import Building from '../components/Building'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Slider from '@mui/material/Slider'
import Grid from '@mui/material/Grid'
import RouterLink from 'next/link'
import './FloorPlanPage.css'

// Данные о подъездах и этажах
const ENTRANCES = [1, 2, 3, 4]
const FLOORS = [1, 2, 3]

// Данные по квартире этажа 1 (координаты исходно для оригинального размера плана)
const APARTMENT1 = {
  x: 12,
  y: 57,
  width: 336,
  height: 529,
  // Вершины полигона внутри картинки квартиры (по данным из макета)
  polygonPoints: [
    [208, 259],
    [208, 322.5],
    [333.5, 322.5],
    [333.5, 535],
    [105, 535],
    [105, 526],
    [0, 526],
    [0, 0],
    [114.5, 0],
    [114.5, 259]
  ]
}

// Данные по квартире этажа 2
const APARTMENT2 = {
  x: 128,
  y: 28,
  width: 322,
  height: 284,
  polygonPoints: [
    [0, 283.5026697022765],
    [0, 23.458844133099824],
    [112.5, 23.458844133099824],
    [112.5, 0],
    [203, 0],
    [203, 21.46234676007005],
    [322, 21.46234676007005],
    [322, 285]
  ]
}

// Данные по квартире этажа 3
const APARTMENT3 = {
  x: 452,
  y: 26,
  width: 322,
  height: 284,
  polygonPoints: [
    [0, 23.5],
    [117, 23.5],
    [117, 0],
    [207.5, 0],
    [207.5, 22],
    [322, 22],
    [322, 285],
    [0, 285]
  ]
}

// Данные по квартире этажа 4
const APARTMENT4 = {
  x: 555,
  y: 54,
  width: 332,
  height: 539,
  polygonPoints: [
    [334.5, 5],
    [334.5, 475],
    [330, 475],
    [330, 529],
    [230, 529],
    [230, 539.5],
    [0, 539.5],
    [0, 324],
    [125, 324],
    [125, 261.5],
    [220, 261.5],
    [220, 0],
    [334.5, 0]
  ]
}

const APARTMENT_CODES = ['2A', '2B', '2C', '2D']
const HOUSE_ID = 9

const formatByn = (value) => {
  const numberValue = Number(value)
  if (Number.isNaN(numberValue)) return 'По запросу'
  return `${new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 }).format(numberValue)} BYN`
}

const formatArea = (value) => {
  const numberValue = Number(value)
  if (Number.isNaN(numberValue)) return '—'
  return `${new Intl.NumberFormat('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(numberValue)} м²`
}

function FloorPlanPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedEntrance, setSelectedEntrance] = useState(
    parseInt(searchParams.get('entrance')) || 4
  )
  const [selectedFloor, setSelectedFloor] = useState(
    parseInt(searchParams.get('floor')) || 3
  )

  // Состояния для фильтров поиска квартир
  const [selectedBuilding, setSelectedBuilding] = useState('')
  const [selectedRooms, setSelectedRooms] = useState(null)
  const [areaRange, setAreaRange] = useState([34, 82])
  const [dbApartments, setDbApartments] = useState([])

  const handleEntranceChange = (entrance) => {
    setSelectedEntrance(entrance)
    router.push(`/building-9/floor?entrance=${entrance}&floor=${selectedFloor}`)
  }

  const handleFloorChange = (floor) => {
    setSelectedFloor(floor)
    router.push(`/building-9/floor?entrance=${selectedEntrance}&floor=${floor}`)
  }

  const handleAreaChange = (event, newValue) => {
    setAreaRange(newValue)
  }

  const handleResetFilters = () => {
    setSelectedBuilding('')
    setSelectedRooms(null)
    setAreaRange([34, 82])
  }

  const handleShowApartments = () => {
    // Здесь можно добавить логику для показа квартир
    console.log('Показать квартиры', {
      building: selectedBuilding,
      rooms: selectedRooms,
      area: areaRange
    })
  }

  useEffect(() => {
    let isMounted = true

    const loadApartments = async () => {
      try {
        const response = await fetch(`/api/apartments?houseId=${HOUSE_ID}`)
        if (!response.ok) throw new Error('Failed to load apartments')
        const apartments = await response.json()

        if (isMounted && Array.isArray(apartments)) {
          setDbApartments(apartments)
        }
      } catch (error) {
        console.error('Не удалось получить квартиры из БД', error)
      }
    }

    loadApartments()

    return () => {
      isMounted = false
    }
  }, [])

  const floorApartments = useMemo(() => {
    return dbApartments
      .filter((apartment) => Number(apartment?.floor?.number) === selectedFloor)
      .sort((a, b) => String(a.number).localeCompare(String(b.number)))
      .slice(0, 4)
  }, [dbApartments, selectedFloor])

  const apartmentSlots = [
    { layout: APARTMENT1, image: '/assets/images/residential/house 9 floor 1.png', id: 'floor-apartment-1' },
    { layout: APARTMENT2, image: '/assets/images/residential/house 9 floor 2.png', id: 'floor-apartment-2' },
    { layout: APARTMENT3, image: '/assets/images/residential/house 9 floor 3.png', id: 'floor-apartment-3' },
    { layout: APARTMENT4, image: '/assets/images/residential/house 9 floor 4.png', id: 'floor-apartment-4' }
  ]

  // Данные полигонов квартир (без масштабирования, в пикселях исходного макета)
  const apartment1Polygon = APARTMENT1.polygonPoints
    .map(([x, y]) => `${x}px ${y}px`)
    .join(', ')

  const apartment2Polygon = APARTMENT2.polygonPoints
    .map(([x, y]) => `${x}px ${y}px`)
    .join(', ')

  const apartment3Polygon = APARTMENT3.polygonPoints
    .map(([x, y]) => `${x}px ${y}px`)
    .join(', ')

  const apartment4Polygon = APARTMENT4.polygonPoints
    .map(([x, y]) => `${x}px ${y}px`)
    .join(', ')
  const apartmentPolygons = [apartment1Polygon, apartment2Polygon, apartment3Polygon, apartment4Polygon]

  return (
    <>
      <AppBar />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          pt: 10,
          pb: 4
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ px: { xs: 2, lg: '10vw' } }}>
          {/* Breadcrumbs */}
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
            <Link component={RouterLink} href="/" color="inherit">
              Главная
            </Link>
            <Link component={RouterLink} href="/building-9" color="inherit">
              Дом №9
            </Link>
            <Typography color="text.primary">
              Подъезд {selectedEntrance}
            </Typography>
            <Typography color="text.primary">
              Этаж {selectedFloor}
            </Typography>
          </Breadcrumbs>

          {/* Заголовок и кнопки */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600 }}>
              Этаж {selectedFloor}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" sx={{ textTransform: 'none' }}>
                В шахматном порядке
              </Button>
              <Button variant="contained" color="secondary" sx={{ textTransform: 'none' }}>
                Планировки
              </Button>
            </Box>
          </Box>

          {/* Выбор подъезда и этажа */}
          <Box sx={{ display: 'flex', gap: 4, mb: 4 }}>
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Подъезд
              </Typography>
              <ButtonGroup variant="outlined" aria-label="entrance selection">
                {ENTRANCES.map((entrance) => (
                  <Button
                    key={entrance}
                    variant={selectedEntrance === entrance ? 'contained' : 'outlined'}
                    color={selectedEntrance === entrance ? 'secondary' : 'inherit'}
                    onClick={() => handleEntranceChange(entrance)}
                    sx={{
                      minWidth: 60,
                      textTransform: 'none',
                      '&.MuiButton-contained': {
                        bgcolor: 'secondary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'secondary.dark'
                        }
                      }
                    }}
                  >
                    {entrance}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Этаж
              </Typography>
              <ButtonGroup variant="outlined" aria-label="floor selection">
                {FLOORS.map((floor) => (
                  <Button
                    key={floor}
                    variant={selectedFloor === floor ? 'contained' : 'outlined'}
                    color={selectedFloor === floor ? 'secondary' : 'inherit'}
                    onClick={() => handleFloorChange(floor)}
                    sx={{
                      minWidth: 60,
                      textTransform: 'none',
                      '&.MuiButton-contained': {
                        bgcolor: 'secondary.main',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'secondary.dark'
                        }
                      }
                    }}
                  >
                    {floor}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
          </Box>

          {/* План этажа */}
          <Box
            className="floor-plan-container"
            sx={{
              position: 'relative',
              maxWidth: 'none',
              mx: 'auto',
              bgcolor: 'background.paper',
              borderRadius: 2,
              overflow: 'visible',
              boxShadow: 2
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: 'auto',
                overflow: 'hidden',
                borderRadius: 2
              }}
            >
            <img
              src="/assets/images/residential/house 9 flat plan.png"
              alt={`План этажа ${selectedFloor}, подъезд ${selectedEntrance}`}
              className="floor-plan-image"
            />

            {/* Квартиры на плане (данные подтягиваются из БД) */}
            {apartmentSlots.map((slot, index) => {
              const dbApartment = floorApartments[index]
              const apartmentCode = APARTMENT_CODES[index]
              const rooms = dbApartment?.rooms
              const area = dbApartment?.area
              const isCommissioned = dbApartment?.isCommissioned
              const statusLabel = typeof isCommissioned === 'boolean'
                ? (isCommissioned ? 'Сдана' : 'В продаже')
                : 'В продаже'

              return (
                <Building
                  key={slot.id}
                  image={slot.image}
                  x={slot.layout.x}
                  y={slot.layout.y}
                  width={slot.layout.width}
                  height={slot.layout.height}
                  polygon={apartmentPolygons[index]}
                  zIndex={20}
                  id={slot.id}
                  onClick={() => router.push(
                    `/apartment?floor=${selectedFloor}&apt=${apartmentCode}${dbApartment?.id ? `&apartmentId=${dbApartment.id}` : ''}`
                  )}
                  buildingData={{
                    name: dbApartment
                      ? `Этаж ${selectedFloor} квартира №${dbApartment.number}`
                      : `Этаж ${selectedFloor} квартира ${apartmentCode}`,
                    status: statusLabel,
                    apartments: dbApartment
                      ? `${rooms}-комн. · ${formatArea(area)}`
                      : '',
                    price: dbApartment ? formatByn(dbApartment.price) : 'По запросу'
                  }}
                />
              )
            })}

          </Box>

          </Box>

          {/* Блок поиска квартир */}
          <Box
            sx={{
              width: '100%',
              mt: 6,
              bgcolor: 'grey.50',
              borderRadius: 3,
              p: 4,
              boxShadow: 1
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              sx={{
                mb: 4,
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              Подбор квартир в Berry
            </Typography>

            <Grid container spacing={3}>
              {/* Выбор дома */}
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel id="building-select-label">Выбор дома</InputLabel>
                  <Select
                    labelId="building-select-label"
                    id="building-select"
                    value={selectedBuilding}
                    label="Выбор дома"
                    onChange={(e) => setSelectedBuilding(e.target.value)}
                    sx={{
                      bgcolor: 'background.paper',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'grey.300'
                      }
                    }}
                  >
                    <MenuItem value="">
                      <em>Выберите дом</em>
                    </MenuItem>
                    <MenuItem value="1">Дом 1</MenuItem>
                    <MenuItem value="2">Дом 2</MenuItem>
                    <MenuItem value="3">Дом 3</MenuItem>
                    <MenuItem value="4">Дом 4</MenuItem>
                    <MenuItem value="9">Дом 9</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* Количество комнат */}
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Количество комнат
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {[1, 2, 3].map((rooms) => (
                    <Button
                      key={rooms}
                      variant={selectedRooms === rooms ? 'contained' : 'outlined'}
                      color={selectedRooms === rooms ? 'secondary' : 'inherit'}
                      onClick={() => setSelectedRooms(selectedRooms === rooms ? null : rooms)}
                      sx={{
                        minWidth: 50,
                        height: 50,
                        borderRadius: '50%',
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        '&.MuiButton-contained': {
                          bgcolor: 'secondary.main',
                          color: 'white',
                          '&:hover': {
                            bgcolor: 'secondary.dark'
                          }
                        }
                      }}
                    >
                      {rooms}
                    </Button>
                  ))}
                </Box>
              </Grid>

              {/* Площадь */}
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
                  Площадь
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                  <TextField
                    value={areaRange[0]}
                    onChange={(e) => setAreaRange([parseInt(e.target.value) || 34, areaRange[1]])}
                    size="small"
                    type="number"
                    sx={{
                      width: 80,
                      bgcolor: 'background.paper',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ mx: 1 }}>
                    —
                  </Typography>
                  <TextField
                    value={areaRange[1]}
                    onChange={(e) => setAreaRange([areaRange[0], parseInt(e.target.value) || 82])}
                    size="small"
                    type="number"
                    sx={{
                      width: 80,
                      bgcolor: 'background.paper',
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    м²
                  </Typography>
                </Box>
                <Slider
                  value={areaRange}
                  onChange={handleAreaChange}
                  valueLabelDisplay="auto"
                  min={20}
                  max={150}
                  sx={{
                    color: 'secondary.main',
                    '& .MuiSlider-thumb': {
                      bgcolor: 'secondary.main'
                    },
                    '& .MuiSlider-track': {
                      bgcolor: 'secondary.main'
                    }
                  }}
                />
              </Grid>
            </Grid>

            {/* Кнопки действий */}
            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleShowApartments}
                sx={{
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: 600
                }}
              >
                Показать квартиры
              </Button>
              <Button
                variant="outlined"
                onClick={handleResetFilters}
                sx={{
                  textTransform: 'none',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'grey.400',
                    bgcolor: 'grey.100'
                  }
                }}
              >
                Сбросить фильтры
              </Button>
            </Box>
          </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default FloorPlanPage
