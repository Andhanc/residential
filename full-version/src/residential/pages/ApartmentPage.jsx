'use client';

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

import AppBar from 'ui-component/extended/AppBar'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import SendIcon from '@mui/icons-material/Send'
import RouterLink from 'next/link'

const APARTMENT_CONFIG = {
  '2A': {
    image: '/assets/images/residential/house 9 floor 1.png',
    area: '81,79 м²',
    price: '450 172 BYN'
  },
  '2B': {
    image: '/assets/images/residential/house 9 floor 2.png',
    area: '81,79 м²',
    price: '450 172 BYN'
  },
  '2C': {
    image: '/assets/images/residential/house 9 floor 3.png',
    area: '81,79 м²',
    price: '450 172 BYN'
  },
  '2D': {
    image: '/assets/images/residential/house 9 floor 4.png',
    area: '81,79 м²',
    price: '450 172 BYN'
  }
}

function ApartmentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const floor = searchParams.get('floor') || '1'
  const code = searchParams.get('apt') || '2A'

  const config = APARTMENT_CONFIG[code] || APARTMENT_CONFIG['2A']

  const title = `Квартира ${code}`

  return (
    <>
      <AppBar />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          pt: 8,
          pb: 6
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ px: { xs: 2, lg: '10vw' } }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
              <Link component={RouterLink} href="/" color="inherit">
                Главная
              </Link>
              <Link component={RouterLink} href="/building-9" color="inherit">
                Дом №9
              </Link>
              <Link component={RouterLink} href="/building-9/floor?entrance=4&floor=1" color="inherit">
                Подъезд 4
              </Link>
              <Typography color="inherit">Этаж {floor}</Typography>
              <Typography color="text.primary">{title}</Typography>
            </Breadcrumbs>

            {/* Основной блок как большая "страница квартиры" */}
            <Box
              sx={{
                mt: 4,
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: 2,
                px: { xs: 2.5, md: 5 },
                py: { xs: 3, md: 4 }
              }}
            >
              {/* Верхняя строка с этажом, площадью и статусом */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 2,
                  mb: { xs: 3, md: 4 }
                }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                  <Box
                    sx={{
                      px: 1.75,
                      py: 0.5,
                      borderRadius: 999,
                      border: '1px solid #f0f0f0',
                      fontSize: 14
                    }}
                  >
                    Этаж {floor}
                  </Box>
                  <Box
                    sx={{
                      px: 1.75,
                      py: 0.5,
                      borderRadius: 999,
                      border: '1px solid #f0f0f0',
                      fontSize: 14
                    }}
                  >
                    {config.area}
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 999,
                    bgcolor: '#2eb85c',
                    px: 3,
                    py: 0.75,
                    fontWeight: 600,
                    fontSize: 14,
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#24964a', boxShadow: 'none' }
                  }}
                >
                  В продаже
                </Button>
              </Box>

              <Grid container spacing={6} alignItems="flex-start">
                {/* Левая часть - большой план квартиры + превью */}
                <Grid item xs={12} md={6.5}>
                  <Box
                    sx={{
                      bgcolor: 'common.white',
                      borderRadius: 2,
                      p: 2,
                      boxShadow: 1,
                      display: 'flex',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      component="img"
                      src={config.image}
                      alt={title}
                      sx={{
                        width: '100%',
                        maxWidth: 560,
                        height: 'auto',
                        borderRadius: 2,
                        display: 'block'
                      }}
                    />
                  </Box>

                  {/* Небольшие превью планировок под основным изображением */}
                  <Box
                    sx={{
                      mt: 2.5,
                      display: 'flex',
                      gap: 2
                    }}
                  >
                    {[config.image].map((imgSrc, index) => (
                      <Box
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        sx={{
                          flex: '0 0 110px',
                          height: 90,
                          bgcolor: 'common.white',
                          borderRadius: 2,
                          overflow: 'hidden',
                          boxShadow: 1,
                          border: index === 0 ? '2px solid' : '1px solid',
                          borderColor: index === 0 ? 'primary.main' : '#e0e0e0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Box
                          component="img"
                          src={imgSrc}
                          alt={title}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Grid>

                {/* Правая часть - информация о квартире */}
                <Grid item xs={12} md={5.5}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      color: 'secondary.main',
                      fontSize: { xs: '1.9rem', md: '2.2rem' }
                    }}
                  >
                    Квартира {code}: {config.area}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5
                    }}
                  >
                    {config.price}
                  </Typography>

                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 3 }}>
                    5504 BYN/м²
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      — Высота потолков 2,7 м
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      — Качественная штукатурка стен и цементно-песчаная стяжка полов
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      — Оптоволоконный кабель
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      — Индивидуальные счетчики воды, тепла и электроэнергии
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      — Окна ПВХ с двухкамерными стеклопакетами
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      — Горизонтальная разводка отопления и стальные радиаторы
                    </Typography>
                  </Box>
                </Grid>
              </Grid>

              {/* Кнопка записи внизу карточки */}
              <Box sx={{ mt: 5, textAlign: 'center' }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    textTransform: 'none',
                    borderRadius: 999,
                    px: 6,
                    py: 1.75,
                    fontSize: '1rem'
                  }}
                >
                  Записаться на консультацию
                </Button>
                <Button
                  variant="text"
                  sx={{ textTransform: 'none', ml: 3 }}
                  onClick={() => router.back()}
                >
                  К плану этажа
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>

      {/* Блок "Помочь с выбором?" на всю ширину */}
      <Box
        sx={{
          bgcolor: '#f5f0ff',
          py: { xs: 5, md: 7 },
          mt: 6
        }}
      >
          <Container maxWidth="xl">
            <Box
              sx={{
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
                Помочь с выбором?
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: 3, md: 4 }
                }}
              >
                {/* Левая карточка с контактами офиса продаж */}
                <Box
                  sx={{
                    flex: 1,
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
                    Поможем подобрать квартиру в Berry, расскажем про акции, условия рассрочки и
                    доступные планировки.
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                      Что вы получите:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      — персональный подбор квартир под ваш бюджет;
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      — расчёт стоимости с учётом рассрочки или кредита;
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      — ответы на вопросы по инфраструктуре и срокам строительства.
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

                  {/* Соцсети снизу карточки */}
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

                {/* Правая карточка с формой */}
                <Box
                  sx={{
                    flex: 1,
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

                    {/* Кнопка отправки на месте поля комментария */}
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
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Информационный футер страницы квартиры */}
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
            Вся информация о квартирах носит ознакомительный характер и не является публичной
            офертой. Актуальные цены и доступность уточняйте у менеджеров отдела продаж.
          </Typography>
        </Box>
      </Box>
    </>
  )
}

export default ApartmentPage

