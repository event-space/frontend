import { Box, Button, Typography } from '@mui/material';
import useFetch from '../../shared/network/useFetch';
import { useUserStore } from '../../app/store/useUserStore';

export default function OrderSummary({
  eventDetails,
  onConfirm,
  onBack,
}: {
  eventDetails: any;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const { user } = useUserStore();
  const { fetchData: bookEvent } = useFetch<any>(
    `https://space-event.kenuki.org/order-service/api/v1/slots/book/${eventDetails.date.id}?userEmail=${user?.username}`,
  );

  const formattedDate = new Date(eventDetails.date.startTime)
    .toISOString()
    .split('T')[0];

  const handleConfirmBooking = () => {
    bookEvent({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response.status === 'CONFIRMED') {
        onConfirm();
      }
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Order Summary
      </Typography>
      <Typography variant="body1">Event Name: {eventDetails.name}</Typography>
      <Typography variant="body1">Space: {eventDetails.space.name}</Typography>
      <Typography variant="body1">Date: {formattedDate}</Typography>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" color="primary" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleConfirmBooking}
        >
          Confirm & Pay
        </Button>
      </Box>
    </Box>
  );
}
