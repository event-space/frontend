import { useState } from 'react';
import EventDetails from './EventDetails';
import OrderSummary from './OrderSummary';
import CalendarPage from './CalendarPage';
import { Box, Breadcrumbs, Divider, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function CreateEventFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [eventDetails, setEventDetails] = useState<Record<string, any>>({});
  const steps = [
    { id: 1, name: 'Create Event' },
    { id: 2, name: 'Select a Date' },
    { id: 3, name: 'Order Summary' },
  ];

  const handleNext = (data: Record<string, any>) => {
    setEventDetails(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const handleConfirm = () => {
    navigate('/');
  };

  return (
    <section>
      <div className="container">
        <Breadcrumbs aria-label="breadcrumb" sx={{ marginTop: '16px' }}>
          <Link underline="hover" color="inherit" onClick={() => navigate('/')}>
            Home
          </Link>
          <Typography sx={{ color: 'text.primary' }}>
            {steps[step - 1].name}
          </Typography>
        </Breadcrumbs>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginTop: '32px',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {steps.map(item => (
              <Typography
                key={item.id}
                sx={{
                  fontSize: '18px',
                  fontFamily: 'monospace',
                  fontWeight: step === item.id ? 'bold' : '500',
                  color: step === item.id ? '#4A148C' : 'black',
                  cursor: step >= item.id ? 'pointer' : 'default',
                  textDecoration: step === item.id ? 'underline' : 'none',
                  transition: 'color 0.3s ease',
                }}
                onClick={() => {
                  if (step >= item.id) setStep(item.id);
                }}
              >
                {item.name}
              </Typography>
            ))}
          </Box>
          <Divider />
        </Box>

        {step === 1 && <EventDetails onNext={handleNext} />}
        {step === 2 && (
          <CalendarPage
            onBack={handleBack}
            selectedSpace={eventDetails.space}
            onDateSelect={date => handleNext({ date })}
          />
        )}
        {step === 3 && (
          <OrderSummary
            eventDetails={eventDetails}
            onConfirm={handleConfirm}
            onBack={handleBack}
          />
        )}
      </div>
    </section>
  );
}
