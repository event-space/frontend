import React, { useEffect, useState } from 'react';
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

  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );

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
    const dateStr = date.toDateString();
    return events.filter(event => {
      const eventDate = new Date(event.startTime).toDateString();
      return eventDate === dateStr;
    });
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
  }, [user]);

  const handleNextMonth = () => {
    if (currentMonth < new Date().getMonth() + 2) {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth > new Date().getMonth()) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

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
        <Box></Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          {monthNames[currentMonth]} {currentYear}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handlePrevMonth}
            disabled={currentMonth === new Date().getMonth()}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            onClick={handleNextMonth}
            disabled={currentMonth === new Date().getMonth() + 1}
          >
            Next
          </Button>
        </Box>
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
                                key={event.id}
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
                              No Slots
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
