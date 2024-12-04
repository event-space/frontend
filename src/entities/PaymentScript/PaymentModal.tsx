import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import { useUserStore } from '../../app/store/useUserStore';
import useFetch from '../../shared/network/useFetch';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  eventDetails: any;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  open,
  onClose,
  onSuccess,
  eventDetails,
}) => {
  const { user } = useUserStore();
  const { fetchData: bookEvent } = useFetch<any>(
    `https://space-event.kenuki.org/order-service/api/v1/slots/book/${eventDetails.date.id}?userEmail=${user?.username}`,
  );

  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (cardElement === null) {
      console.error('Card element is not available');
      setIsProcessing(false);
      return;
    }

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
      console.error(error);
      setIsProcessing(false);
      return;
    }
    const success = true;

    if (success) {
      bookEvent({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.status === 'CONFIRMED') {
          onSuccess();
        }
      });
    }

    setIsProcessing(false);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: 'white',
          maxWidth: 400,
          margin: 'auto',
          mt: '10%',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Payment Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <CardElement options={{ hidePostalCode: true }} />

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button
              onClick={onClose}
              variant="outlined"
              color="primary"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isProcessing || !email || !stripe}
            >
              {isProcessing ? 'Processing...' : 'Pay Now'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default PaymentModal;
