import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import { useUserStore } from '../../app/store/useUserStore';
import { ISpace } from '../../entities/types/ISpace';
import useFetch from '../../shared/network/useFetch';
import { ISlot } from '../../entities/types/ISlot';
import { ArrowBack } from '@mui/icons-material';

type Week = (Date | null)[];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarPage({
  selectedSpace,
  onDateSelect,
  onBack,
}: {
  selectedSpace: ISpace;
  onDateSelect: (day: ISlot) => void;
  onBack: () => void;
}) {
  const { user } = useUserStore();
  const [events, setEvents] = useState<ISlot[]>([]);
  const { fetchData: fetchSlots } = useFetch<any>(
    `https://space-event.kenuki.org/order-service/api/v1/slots/${selectedSpace.id}`,
  );

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const daysInMonth: (Date | null)[] = [];
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    daysInMonth.push(new Date(currentYear, currentMonth, i));
  }

  const emptyCells: null[] = [];
  for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
    emptyCells.push(null);
  }

  const calendarRows: Week[] = [];
  const cells = [...emptyCells, ...daysInMonth];

  cells.forEach((day, i) => {
    if (i % 7 === 0) {
      calendarRows.push(cells.slice(i, i + 7) as Week);
    }
  });

  const findEventsForDate = (date: Date | null): ISlot[] => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.startTime.startsWith(dateStr));
  };

  const handleDateClick = (day: ISlot) => {
    onDateSelect(day);
  };

  useEffect(() => {
    fetchSlots({
      headers: {
        Authorization: `Bearer ${user?.tokens.accessToken}`,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response) {
        setEvents(response);
      }
    });
  }, [fetchSlots, user]);

  return (
    <Box sx={{ padding: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <IconButton color="primary" onClick={onBack}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Select Available Date for {selectedSpace.name}
        </Typography>
        <Typography></Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {daysOfWeek.map(day => (
                <TableCell key={day} align="center">
                  {day}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {calendarRows.map((week, index) => (
              <TableRow key={index}>
                {week.map((day, idx) => (
                  <TableCell key={idx} align="center">
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      {day ? (
                        <>
                          <Typography variant="body2">
                            {day.getDate()}
                          </Typography>
                          {findEventsForDate(day).length > 0 ? (
                            findEventsForDate(day).map(event => (
                              <Button
                                variant="contained"
                                color={event.booked ? 'error' : 'primary'}
                                size="small"
                                disabled={event.booked}
                                onClick={() => handleDateClick(event)}
                              >
                                {event.booked ? 'BOOKED' : 'Select'}
                              </Button>
                            ))
                          ) : (
                            <Button
                              variant="contained"
                              color="info"
                              size="small"
                              disabled
                            >
                              weekend
                            </Button>
                          )}
                        </>
                      ) : null}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
