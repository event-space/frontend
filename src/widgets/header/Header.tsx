import { Box, Button, Divider, IconButton, Tooltip } from '@mui/material';
import useFetch from '../../shared/network/useFetch';
import { IUser } from '../../entities/types/IUser';
import { useUserStore } from '../../app/store/useUserStore';
import { useEffect, useState } from 'react';
import { Logo } from '../../shared/ui/Logo';
import Navbar from '../navbar';
import { useNavigate } from 'react-router-dom';

import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import EventIcon from '@mui/icons-material/Event';

export default function Header() {
  const { user, loading, logout } = useUserStore();
  const [userData, setUserData] = useState<IUser>();
  const { fetchData } = useFetch<IUser>(
    'https://space-event.kenuki.org/security-service/api/user/profile',
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (!loading) {
      fetchData({
        headers: {
          Authorization: `Bearer ${user?.tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }).then(response => {
        if (response) {
          setUserData(response);
        }
      });
    }
  }, [loading]);

  console.log(userData);

  return (
    <div className="container">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Logo />
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Navbar />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ background: '#10107b' }}
          />
          {user?.isAuthenticated ? (
            <Box sx={{ display: 'flex', gap: '16px', color: '#10107b' }}>
              <Tooltip title="Events">
                <IconButton sx={{ color: '#10107b' }}>
                  <EventIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton sx={{ color: '#10107b' }}>
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Profile">
                <IconButton sx={{ color: '#10107b' }}>
                  <AccountCircleIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Log out">
                <IconButton sx={{ color: '#10107b' }} onClick={handleLogout}>
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: '16px', color: '#10107b' }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  borderColor: '#10107b',
                  color: '#10107b',
                }}
                href="/login"
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{
                  fontWeight: 'bold',
                  background: '#10107b',
                }}
                href="/register"
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}
