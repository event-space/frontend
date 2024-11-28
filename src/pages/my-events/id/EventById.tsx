import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import useFetch from '../../../shared/network/useFetch';
import { useUserStore } from '../../../app/store/useUserStore';
import { ISlot } from '../../../entities/types/ISlot';

export interface IBooking {
  id: number;
  slot: ISlot;
  userEmail: string;
  bookingTime: string;
  status: string;
}

export function MyEventDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState<IBooking | null>(null);
  const { fetchData } = useFetch<IBooking>(
    `https://space-event.kenuki.org/order-service/api/v1/slots/bookings/${id}`,
  );
  const { user: userInfo, loading } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && id) {
      fetchData({
        headers: {
          Authorization: `Bearer ${userInfo?.tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).then(response => {
        if (response) {
          setBooking(response);
        }
      });
    }
  }, [loading, id, fetchData, userInfo]);

  if (!booking) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Booking Details
      </Typography>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h6">Booking ID: {booking.id}</Typography>
        <Typography variant="body1">User Email: {booking.userEmail}</Typography>
        <Typography variant="body1">
          Booking Time: {new Date(booking.bookingTime).toLocaleString()}
        </Typography>
        <Typography variant="body1">Status: {booking.status}</Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          Slot Start Time: {new Date(booking.slot.startTime).toLocaleString()}
        </Typography>
        <Typography variant="body1">
          Slot End Time: {new Date(booking.slot.endTime).toLocaleString()}
        </Typography>
      </Paper>
      <Box sx={{ marginTop: 2 }}>
        <Button variant="outlined" onClick={() => navigate('/my-events')}>
          Back to My Orders
        </Button>
      </Box>
    </Box>
  );
}
