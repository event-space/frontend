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
  TextField,
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

export default function MyEvents() {
  const location = useLocation();
  const path = location.pathname;
  const { user: userInfo, loading } = useUserStore();
  const [data, setData] = useState<IBooking[]>([]);
  const [filteredData, setFilteredData] = useState<IBooking[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [priceFilter, setPriceFilter] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [bookingDateFilter, setBookingDateFilter] = useState('');
  const { fetchData } = useFetch<any>(
    `https://space-event.kenuki.org/order-service/api/v1/slots/bookings/email?userEmail=${userInfo?.username}`,
  );
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
          setFilteredData(reversedData);
        }
      });
    }
  }, [loading]);

  useEffect(() => {
    let filtered = [...data];

    if (priceFilter) {
      const price = Number(priceFilter);
      filtered = filtered.filter(
        booking => booking.space.baseRentalCost <= price,
      );
    }

    if (startDateFilter) {
      filtered = filtered.filter(
        booking =>
          new Date(booking.slot.startTime) >= new Date(startDateFilter),
      );
    }

    if (bookingDateFilter) {
      filtered = filtered.filter(
        booking => new Date(booking.bookingTime) >= new Date(bookingDateFilter),
      );
    }

    setFilteredData(filtered);
  }, [priceFilter, startDateFilter, bookingDateFilter, data]);

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
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
            }}
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
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Subtle hover effect
                  },
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
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Subtle hover effect
                  },
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
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Subtle hover effect
                  },
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

              {/* Filters Section */}
              <Box
                sx={{
                  marginBottom: 3,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 2,
                  justifyContent: 'space-between',
                }}
              >
                <TextField
                  label="Max Price"
                  type="number"
                  value={priceFilter}
                  onChange={e => setPriceFilter(e.target.value)}
                  variant="outlined"
                  size="small"
                  sx={{ flexBasis: { xs: '100%', sm: '30%' } }} // Responsive width
                />
                <TextField
                  label="Event Start Date"
                  type="date"
                  value={startDateFilter}
                  onChange={e => setStartDateFilter(e.target.value)}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ flexBasis: { xs: '100%', sm: '30%' } }} // Responsive width
                />
                <TextField
                  label="Booking Date"
                  type="date"
                  value={bookingDateFilter}
                  onChange={e => setBookingDateFilter(e.target.value)}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ flexBasis: { xs: '100%', sm: '30%' } }} // Responsive width
                />
              </Box>

              {/* Orders Table */}
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
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData
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
                              fontWeight: '600', // Make status more prominent
                            }}
                          >
                            {booking.status}
                          </TableCell>
                          <TableCell>{booking.space.baseRentalCost}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredData.length}
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
    </Box>
  );
}
