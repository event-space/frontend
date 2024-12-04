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
  Checkbox,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from './styles.module.scss';

export default function Notifications() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedNotifications, setSelectedNotifications] = useState<
    Set<number>
  >(new Set());

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        message: 'Your event "Tech Meetup" is confirmed.',
        date: '2024-12-01',
        status: 'unread',
      },
      {
        id: 2,
        message: 'New event "React Summit" added to your calendar.',
        date: '2024-11-28',
        status: 'read',
      },
      {
        id: 3,
        message: 'Your booking at "Cafe 42" is about to expire.',
        date: '2024-11-25',
        status: 'unread',
      },
    ]);
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

  const handleCheckboxChange = (id: number) => {
    const newSelected = new Set(selectedNotifications);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedNotifications(newSelected);
  };

  const handleMarkAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        selectedNotifications.has(notification.id)
          ? { ...notification, status: 'read' }
          : notification,
      ),
    );
    setSelectedNotifications(new Set());
  };

  const handleDelete = () => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(
        notification => !selectedNotifications.has(notification.id),
      ),
    );
    setSelectedNotifications(new Set());
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
              flexDirection: { xs: 'column', md: 'row' },
              gap: '20px',
              width: '100%',
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
                    backgroundColor: '#f0f0f0',
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
                    backgroundColor: '#f0f0f0',
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
                    backgroundColor: '#f0f0f0',
                  },
                }}
              >
                My Events
              </Button>
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
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#333',
                  }}
                >
                  Notifications
                </Typography>
              </Box>

              <Divider
                orientation="horizontal"
                flexItem
                sx={{
                  background: '#10107b',
                  marginBottom: '20px',
                }}
              />

              <TableContainer component={Paper}>
                <Table aria-label="Notifications Table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Checkbox
                          checked={
                            selectedNotifications.size === notifications.length
                          }
                          indeterminate={
                            selectedNotifications.size > 0 &&
                            selectedNotifications.size < notifications.length
                          }
                          onChange={() => {
                            if (
                              selectedNotifications.size ===
                              notifications.length
                            ) {
                              setSelectedNotifications(new Set());
                            } else {
                              setSelectedNotifications(
                                new Set(notifications.map(n => n.id)),
                              );
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>Message</TableCell>
                      <TableCell>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notifications
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map(notification => (
                        <TableRow key={notification.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedNotifications.has(
                                notification.id,
                              )}
                              onChange={() =>
                                handleCheckboxChange(notification.id)
                              }
                            />
                          </TableCell>
                          <TableCell
                            sx={{
                              fontWeight:
                                notification.status === 'unread'
                                  ? 'bold'
                                  : 'normal',
                              color:
                                notification.status === 'unread'
                                  ? 'black'
                                  : 'gray',
                            }}
                          >
                            {notification.message}
                          </TableCell>
                          <TableCell>{notification.date}</TableCell>
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
                  justifyContent: 'space-between',
                  marginTop: '20px',
                }}
              >
                <Button
                  variant="contained"
                  onClick={handleMarkAsRead}
                  disabled={selectedNotifications.size === 0}
                  sx={{
                    backgroundColor: 'blue',
                    '&:hover': {
                      backgroundColor: 'darkblue',
                    },
                  }}
                >
                  Mark as Read
                </Button>

                <Button
                  variant="contained"
                  onClick={handleDelete}
                  disabled={selectedNotifications.size === 0}
                  sx={{
                    backgroundColor: 'red',
                    '&:hover': {
                      backgroundColor: 'darkred',
                    },
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
