import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
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
  Radio,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import useFetch from '../../shared/network/useFetch';
import { useUserStore } from '../../app/store/useUserStore';

export default function Notifications() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const { user } = useUserStore();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedNotification, setSelectedNotification] = useState<
    number | null
  >(null);
  const { fetchData } = useFetch<any>(
    `https://space-event.kenuki.org/order-service/notifications/get?isRead=false`,
  );
  const { fetchData: read } = useFetch<any>(
    `https://space-event.kenuki.org/order-service/notifications/get?isRead=true`,
  );

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const unreadResponse = await fetchData({
          headers: {
            Authorization: `Bearer ${user?.tokens.accessToken}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });

        const readResponse = await read({
          headers: {
            Authorization: `Bearer ${user?.tokens.accessToken}`,
            'Content-Type': 'application/json',
          },
          method: 'GET',
        });

        // Объединяем результаты из двух запросов
        if (unreadResponse && readResponse) {
          setNotifications([...unreadResponse, ...readResponse]);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMarkAsRead = async () => {
    if (selectedNotification !== null) {
      await fetch(
        `https://space-event.kenuki.org/order-service/notifications/read?notificationId=${selectedNotification}`,
        {
          headers: {
            Authorization: `Bearer ${user?.tokens.accessToken}`,
          },
          method: 'GET',
        },
      );

      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === selectedNotification
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
      setSelectedNotification(null);
    }
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
              <Typography sx={{ color: 'text.primary' }}>
                Notifications
              </Typography>
            </Breadcrumbs>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '20px',
              backgroundColor: '#f5f5f5',
              borderRadius: '10px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              marginTop: '20px',
            }}
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '20px',
              }}
            >
              Notifications
            </Typography>
            <Divider sx={{ background: '#10107b', marginBottom: '20px' }} />
            <TableContainer component={Paper}>
              <Table aria-label="Notifications Table">
                <TableHead>
                  <TableRow>
                    <TableCell>Select</TableCell>
                    <TableCell>Message</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notifications
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(notification => (
                      <TableRow key={notification.id}>
                        <TableCell>
                          <Radio
                            checked={selectedNotification === notification.id}
                            disabled={notification.isRead}
                            onChange={() =>
                              setSelectedNotification(notification.id)
                            }
                          />
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: notification.isRead ? 'normal' : 'bold',
                            color: notification.isRead ? 'gray' : 'black',
                          }}
                        >
                          {notification.content}
                        </TableCell>
                        <TableCell>
                          {notification.isRead ? 'Read' : 'Unread'}
                        </TableCell>
                        <TableCell>{notification.date || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={notifications.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}
            >
              <Button
                variant="contained"
                onClick={handleMarkAsRead}
                disabled={selectedNotification === null}
                sx={{
                  backgroundColor: 'blue',
                  '&:hover': {
                    backgroundColor: 'darkblue',
                  },
                }}
              >
                Mark as Read
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
