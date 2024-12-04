import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useUserStore } from '../../app/store/useUserStore';
import PaymentModal from '../../entities/PaymentScript/PaymentModal';

interface OrderSummaryProps {
  eventDetails: any;
  onConfirm: () => void;
  onBack: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  eventDetails,
  onConfirm,
  onBack,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSuccess = () => {
    onConfirm();
    handleCloseModal();
  };

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
        <Button variant="contained" color="primary" onClick={handleOpenModal}>
          Confirm & Pay
        </Button>
      </Box>

      <PaymentModal
        eventDetails={eventDetails}
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </Box>
  );
};

export default OrderSummary;
