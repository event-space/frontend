import { Box, Button, Typography } from '@mui/material';

export default function OrderSummary({
  eventDetails,
  onConfirm,
  onBack,
}: {
  eventDetails: any;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const formattedDate = new Date(eventDetails.date.startTime)
    .toISOString()
    .split('T')[0];

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
        <Button variant="contained" color="primary" onClick={onConfirm}>
          Confirm & Pay
        </Button>
      </Box>
    </Box>
  );
}
