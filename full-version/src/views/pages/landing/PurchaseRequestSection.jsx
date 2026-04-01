'use client';

import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { MultiStepForm } from '@/components/ui/multistep-form';
import { ThemeMode } from 'config';

export default function PurchaseRequestSection() {
  const theme = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <Box
      sx={{
        py: 12.5,
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100'
      }}
    >
      <Container>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2.5 }}>
          <Typography variant="h2" align="center" sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}>
            Оставьте свои данные и мы свяжемся с вами
          </Typography>
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', maxWidth: 720 }}>
            Это обычная заявка без бронирования квартиры. Мы уточним детали и поможем подобрать лучший вариант.
          </Typography>

          <Box sx={{ mt: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <MultiStepForm
              onComplete={async (values) => {
                try {
                  setIsSubmitting(true);
                  const res = await fetch('/api/purchase-requests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      fullName: values.fullName,
                      phone: values.phone,
                      email: values.email,
                      isReservation: false
                    })
                  });

                  const data = await res.json().catch(() => ({}));
                  if (!res.ok) {
                    window.alert(data?.error || 'Не удалось отправить заявку.');
                    return;
                  }

                  window.alert('Заявка отправлена. Мы свяжемся с вами в ближайшее время.');
                } catch (error) {
                  console.error('Failed to submit purchase request', error);
                  window.alert('Не удалось отправить заявку. Попробуйте позже.');
                } finally {
                  setIsSubmitting(false);
                }
              }}
              includeReservationStep={false}
            />
          </Box>

          {isSubmitting && (
            <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
              Отправляем заявку…
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}

