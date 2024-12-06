import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useUserStore } from '../../app/store/useUserStore';
import useFetch from '../../shared/network/useFetch';
import { ISlot } from '../../entities/types/ISlot';
import { ISpace } from '../../entities/types/ISpace';

export interface IBooking {
  id: number;
  slot: ISlot;
  space: ISpace;
  userEmail: string;
  bookingTime: string;
  status: string;
}

type Week = (Date | null)[];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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

export default function MyEvents() {
  const location = useLocation();
  const path = location.pathname;
  const { user: userInfo, loading } = useUserStore();
  const [data, setData] = useState<IBooking[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<number | null>(
    null,
  );
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const { fetchData } = useFetch<any>(
    `https://space-event.kenuki.org/order-service/api/v1/slots/bookings/email?userEmail=${userInfo?.username}`,
  );

  const handleDelete = async (id: number) => {
    setSelectedBookingId(id);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedBookingId !== null) {
      const response = await fetch(
        `https://space-event.kenuki.org/order-service/api/v1/slots/bookings/${selectedBookingId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.ok) {
        setData(prevData =>
          prevData.filter(booking => booking.id !== selectedBookingId),
        );
        setOpenDialog(false); // Close the dialog after successful deletion
      }
    }
  };

  const handleEdit = async (id: number, spaceId: number) => {
    setSelectedBookingId(id);
    const response = await fetch(
      `https://space-event.kenuki.org/order-service/api/v1/slots/${spaceId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    if (data) {
      setEvents(data);
    }
    setOpenEditDialog(true);
  };

  const cancelDelete = () => {
    setOpenDialog(false);
    setSelectedBookingId(null);
  };

  const cancelEdit = () => {
    setOpenEditDialog(false);
    setSelectedBookingId(null);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      fetchData({
        headers: {
          Authorization: `Bearer ${userInfo?.tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).then(response => {
        if (response) {
          const reversedData = response.reverse();
          setData(reversedData);
        }
      });
    }
  }, [loading]);

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB');
  };

  const formatBookingTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  const [events, setEvents] = useState<ISlot[]>([]);

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

  const handleNextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth(currentMonth + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth(currentMonth - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
  };

  const handleDateClick = (day: ISlot) => {
    console.log(day);
  };

  return (
    <Box component="section" className={styles.profile}>
      <div className="container">
        <Box component="div" className={styles.profile__wrapper}>
          <Box>
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate('/')}
              >
                Home
              </Link>
              <Link
                underline="hover"
                color="inherit"
                onClick={() => navigate('/profile')}
              >
                Profile
              </Link>
              <Typography sx={{ color: 'text.primary' }}>My Orders</Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: 'flex-start',
                marginTop: '20px',
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="text"
                href="/profile"
                color={path === '/profile' ? 'primary' : 'inherit'}
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
              >
                Profile
              </Button>
              <Button
                variant="text"
                href="/notifications"
                color={path === '/notifications' ? 'primary' : 'inherit'}
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
              >
                Notifications
              </Button>
              <Button
                variant="text"
                href="/my-events"
                color={path === '/my-events' ? 'primary' : 'inherit'}
                sx={{
                  fontSize: '16px',
                  fontWeight: '600',
                  '&:hover': { backgroundColor: '#f0f0f0' },
                }}
              >
                My Events
              </Button>
            </Box>
            <Box sx={{ width: '100%', padding: '20px' }}>
              <Typography
                sx={{
                  fontSize: '36px',
                  fontWeight: '600',
                  marginBottom: '20px',
                }}
              >
                My Orders
              </Typography>

              <TableContainer component={Paper}>
                <Table aria-label="My Orders Table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Index</TableCell>
                      <TableCell>Place Name</TableCell>
                      <TableCell>Event Time</TableCell>
                      <TableCell>Booked Time</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((booking, index) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell>{booking.space.name}</TableCell>
                          <TableCell>
                            {formatDate(booking.slot.startTime)}
                          </TableCell>
                          <TableCell>
                            {formatBookingTime(booking.bookingTime)}
                          </TableCell>
                          <TableCell
                            sx={{
                              color:
                                booking.status === 'CONFIRMED'
                                  ? 'green'
                                  : 'red',
                              fontWeight: '600',
                            }}
                          >
                            {booking.status}
                          </TableCell>
                          <TableCell>{booking.space.baseRentalCost}</TableCell>
                          <TableCell>
                            <Button
                              variant="outlined"
                              color="primary"
                              onClick={() =>
                                handleEdit(booking.id, booking.space.id)
                              }
                            >
                              Edit
                            </Button>
                            <Button
                              variant="text"
                              color="error"
                              onClick={() => handleDelete(booking.id)}
                            >
                              Cancel
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={data.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  sx={{ marginTop: '20px' }}
                />
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </div>

      <Dialog open={openDialog} onClose={cancelDelete}>
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel this booking?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            No
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditDialog} onClose={cancelEdit}>
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
        <DialogActions>
          <Button onClick={cancelEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setOpenEditDialog(false)} color="secondary">
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
