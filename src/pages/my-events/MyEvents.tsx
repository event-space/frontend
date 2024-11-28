import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Input,
  InputLabel,
  Link,
  Modal,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useUserStore } from '../../app/store/useUserStore';
import { IUser } from '../../entities/types/IUser';
import useFetch from '../../shared/network/useFetch';
import { ISlot } from '../../entities/types/ISlot';

export interface IBooking {
  id: number;
  slot: ISlot;
  userEmail: string;
  bookingTime: string;
  status: string;
}

export default function MyEvents() {
  const { user: userInfo, loading } = useUserStore();
  const [data, setData] = useState<IBooking[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
          setData(response);
        }
      });
    }
  }, [loading]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
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
    return date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
  };

  const formatBookingTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString(); // Format as Date and Time (e.g., 28/11/2024, 07:25:23)
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
            <Typography sx={{ fontSize: '36px', fontWeight: '600' }}>
              My Orders
            </Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table aria-label="My Orders Table">
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>Booking Time</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((booking, index) => (
                    <TableRow key={booking.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {formatBookingTime(booking.bookingTime)}
                      </TableCell>
                      <TableCell>
                        {formatDate(booking.slot.startTime)}
                      </TableCell>
                      <TableCell>{booking.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => navigate(`/my-events/${booking.id}`)}
                        >
                          Details
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
            />
          </TableContainer>
        </Box>
      </div>
    </Box>
  );
}
