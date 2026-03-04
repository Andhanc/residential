'use client';

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import AppBar from 'ui-component/extended/AppBar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import Building from '../components/Building'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import SendIcon from '@mui/icons-material/Send'
import './Building9Page.css'

// Исходные размеры изображения (для которых рассчитаны координаты)
const ORIGINAL_IMAGE_WIDTH = 1920

function Building9Page() {
  const router = useRouter()
  const [scale, setScale] = useState(1)
  const imageRef = useRef(null)

  useEffect(() => {
    const updateScale = () => {
      if (imageRef.current) {
        const actualWidth = imageRef.current.offsetWidth
        const newScale = actualWidth / ORIGINAL_IMAGE_WIDTH
        setScale(newScale)
      }
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  const handleFlatClick = (flatId) => {
    console.log('Flat clicked:', flatId)
    // Переход на страницу этажа при клике
    if (flatId === 'flat-1') {
      router.push('/building-9/floor?entrance=4&floor=3')
    } else if (flatId === 'flat-2') {
      router.push('/building-9/floor?entrance=4&floor=2')
    } else if (flatId === 'flat-3') {
      router.push('/building-9/floor?entrance=4&floor=1')
    }
  }

  // Координаты и размеры квартиры 1 (исходные значения для 1920px)
  const flat1X = 904.5
  const flat1Y = 264
  const flat1Width = 935
  const flat1Height = 231
  // Polygon для ховера (10 точек из Figma) - будет масштабироваться
  const flat1PolygonPoints = [
    [702.6, 0],
    [927, 91.5],
    [924, 187],
    [702.0, 133],
    [-0.5, 226],
    [-0.5, 137.5],
    [48, 129],
    [48, 113],
    [583.5, 0],
    [607, 17.5]
  ]
  const flat1Polygon = flat1PolygonPoints.map(([x, y]) => `${x * scale}px ${y * scale}px`).join(', ')

  const flat1Data = {
    name: 'Этаж 3',
    status: 'В продаже',
    apartments: '4 квартиры',
    price: 'Цена по запросу'
  }

  // Координаты и размеры квартиры 2 (исходные значения для 1920px)
  const flat2X = 904.5
  const flat2Y = 408
  const flat2Width = 931
  const flat2Height = 173
  // Polygon для ховера (6 точек из Figma) - будет масштабироваться
  const flat2PolygonPoints = [
    [0, 90],
    [703, 0],
    [924, 51],
    [924, 148.5],
    [703, 116.5],
    [0, 169.5]
  ]
  const flat2Polygon = flat2PolygonPoints.map(([x, y]) => `${x * scale}px ${y * scale}px`).join(', ')

  const flat2Data = {
    name: 'Этаж 2',
    status: 'В продаже',
    apartments: 'Квартиры',
    price: 'Цена по запросу'
  }

  // Координаты и размеры квартиры 3 (исходные значения для 1920px)
  const flat3X = 904.5
  const flat3Y = 527
  const flat3Width = 930
  const flat3Height = 133
  // Polygon для ховера (6 точек из Figma) - будет масштабироваться
  const flat3PolygonPoints = [
    [0, 49],
    [702.5, 0],
    [923, 28.5],
    [923, 123],
    [702.5, 115],
    [0, 123]
  ]
  const flat3Polygon = flat3PolygonPoints.map(([x, y]) => `${x * scale}px ${y * scale}px`).join(', ')

  const flat3Data = {
    name: 'Этаж 1',
    status: 'В продаже',
    apartments: 'Квартиры',
    price: 'Цена по запросу'
  }

  return (
    <>
      <AppBar />
      <div className="building9-page">
        <div className="building9-image-section">
          <img 
            ref={imageRef}
            src="https://grand-village.by/upload/Houses/house4.jpg" 
            alt="Дом 9"
            className="building9-image"
            onLoad={() => {
              if (imageRef.current) {
                const actualWidth = imageRef.current.offsetWidth
                const newScale = actualWidth / ORIGINAL_IMAGE_WIDTH
                setScale(newScale)
              }
            }}
          />
          <Building
            image="/assets/images/residential/house 9 flat 1 .png"
            x={flat1X * scale}
            y={flat1Y * scale}
            width={flat1Width * scale}
            height={flat1Height * scale}
            polygon={flat1Polygon}
            zIndex={20}
            id="flat-1"
            onClick={() => handleFlatClick('flat-1')}
            buildingData={flat1Data}
          />
          <Building
            image="/assets/images/residential/house 9 flat 2.png"
            x={flat2X * scale}
            y={flat2Y * scale}
            width={flat2Width * scale}
            height={flat2Height * scale}
            polygon={flat2Polygon}
            zIndex={20}
            id="flat-2"
            onClick={() => handleFlatClick('flat-2')}
            buildingData={flat2Data}
          />
          <Building
            image="/assets/images/residential/house 9 flat 3.png"
            x={flat3X * scale}
            y={flat3Y * scale}
            width={flat3Width * scale}
            height={flat3Height * scale}
            polygon={flat3Polygon}
            zIndex={20}
            id="flat-3"
            onClick={() => handleFlatClick('flat-3')}
            buildingData={flat3Data}
          />
        </div>
        <div className="building9-content">
          {/* Здесь позже можно добавить описание дома, преимущества и условия покупки */}
        </div>

        {/* Блок "Помочь с выбором квартиры в доме 9?" */}
        <Box
          sx={{
            mt: 6,
            mb: 4,
            bgcolor: '#f5f0ff',
            borderRadius: 3,
            px: { xs: 2.5, md: 6 },
            py: { xs: 4, md: 5.5 }
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 600,
              mb: 4,
              fontSize: { xs: '1.8rem', md: '2.1rem' }
            }}
          >
            Помочь с выбором квартиры в доме №9?
          </Typography>

          <Grid
            container
            spacing={4}
            alignItems="stretch"
          >
            {/* Левая карточка с контактами офиса продаж */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: 'common.white',
                  borderRadius: 3,
                  p: { xs: 4, md: 7 },
                  height: { xs: 360, md: 420 },
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 3, color: 'secondary.main' }}
                >
                  Наш офис продаж
                </Typography>

                <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                  +375 (44) 568-13-74
                </Typography>

                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  г. Минск, проспект Дзержинского, дом № 34, пом. 267
                </Typography>
                <Typography variant="body1" sx={{ mb: 1.5 }}>
                  Пн–пт с 9:00 по 19:00, Сб с 10:00 по 16:00
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  info@grand-village.by
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  Подберём лучшие планировки в доме №9, расскажем о ходе строительства и доступных
                  вариантах оплаты.
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                    Что вы получите:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    — подбор квартир по бюджету и этажу;
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    — расчёт стоимости с учётом рассрочки или кредита;
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    — ответы на вопросы по инфраструктуре комплекса.
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', maxWidth: 360 }}
                >
                  Оставьте контакты — менеджер свяжется с вами в течение рабочего дня удобным
                  способом.
                </Typography>

                <Box
                  sx={{
                    mt: 4,
                    display: 'flex',
                    gap: 3
                  }}
                >
                  <InstagramIcon sx={{ fontSize: 28, color: '#d9d9d9' }} />
                  <FacebookIcon sx={{ fontSize: 28, color: '#d9d9d9' }} />
                  <SendIcon sx={{ fontSize: 28, color: '#d9d9d9' }} />
                </Box>
              </Box>
            </Grid>

            {/* Правая карточка с формой */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: 'common.white',
                  borderRadius: 3,
                  p: { xs: 4, md: 7 },
                  height: { xs: 360, md: 420 }
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Имя *"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Телефон *"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="E‑mail"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Удобное время для звонка"
                      placeholder="например, с 10:00 до 19:00"
                      variant="outlined"
                    />
                  </Grid>

                  {/* Кнопка отправки на месте комментария */}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="secondary"
                      sx={{
                        textTransform: 'none',
                        borderRadius: 999,
                        px: 6,
                        py: 1.5,
                        fontWeight: 600,
                        fontSize: 16
                      }}
                    >
                      Отправить
                    </Button>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 1.5, display: 'block' }}
                    >
                      Сообщить о нарушении
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked
                          sx={{
                            color: 'primary.main',
                            '&.Mui-checked': { color: 'primary.main' }
                          }}
                        />
                      }
                      sx={{ alignItems: 'flex-start' }}
                      label={
                        <Typography variant="caption" color="text.secondary">
                          Нажимая кнопку «Отправить», я принимаю условия пользовательского
                          соглашения и даю согласие на обработку моих персональных данных
                          на условиях и для целей, определённых в Соглашении на обработку
                          персональных данных.
                        </Typography>
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Информационный футер страницы дома */}
        <Box
          component="footer"
          sx={{
            mt: 4,
            py: 3,
            borderTop: '1px solid',
            borderColor: 'divider',
            textAlign: 'center',
            color: 'text.secondary',
            fontSize: 12
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Информация о доме №9 и доступных квартирах носит ознакомительный характер и не является
            публичной офертой. Актуальные данные уточняйте в отделе продаж.
          </Typography>
        </Box>
      </div>
    </>
  )
}

export default Building9Page
