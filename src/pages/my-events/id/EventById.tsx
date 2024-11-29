import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import useFetch from '../../../shared/network/useFetch';
import { useUserStore } from '../../../app/store/useUserStore';
import { ISlot } from '../../../entities/types/ISlot';
import { ISpace } from '../../../entities/types/ISpace';

export interface IBooking {
  id: number;
  slot: ISlot;
  space: ISpace;
  userEmail: string;
  bookingTime: string;
  status: string;
}

export function MyEventDetail() {
  const { id } = useParams();
  const [booking, setBooking] = useState<IBooking | null>(null);
  const { fetchData } = useFetch<IBooking>(
    `https://space-event.kenuki.org/order-service/api/v1/slots/bookings/byId/${id}`,
  );
  const { user: userInfo } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return (
    <div className="container">
      <Box sx={{ padding: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Button variant="outlined" onClick={() => navigate('/my-events')}>
            Back to My Orders
          </Button>
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Booking Details
          </Typography>
        </Box>
        {booking && (
          <Paper sx={{ padding: 3 }}>
            <Typography
              sx={{
                alignSelf: 'end',
                textAlign: 'end',
                fontWeight: '600',
                color: booking.status === 'CONFIRMED' ? 'green' : 'red',
              }}
            >
              {booking.status}
            </Typography>
            <Box sx={{ display: 'flex', gap: '20px' }}>
              <Box>
                <img
                  src={`https://space-event.kenuki.org/order-service/api/v1/files/${booking.space.imageUrl}`}
                  width="300px"
                  height="200px"
                  alt={booking.space.name}
                  style={{ objectFit: 'cover' }}
                />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', gap: '10px' }}>
                  <Typography variant="body1" sx={{ fontWeight: '600' }}>
                    {booking.space.name}{' '}
                  </Typography>
                  <Typography variant="body1">
                    {booking.space.location} {booking.space.address}
                  </Typography>
                </Box>
                <Typography variant="body1">
                  Booking Time: {new Date(booking.bookingTime).toLocaleString()}
                </Typography>
                <Typography>
                  Date: {new Date(booking.slot.startTime).toLocaleString()}
                </Typography>
              </Box>
            </Box>
          </Paper>
        )}
      </Box>
    </div>
  );
}
