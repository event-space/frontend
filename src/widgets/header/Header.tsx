import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
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
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function Header() {
  const [open, setOpen] = useState(false);

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

  const toggleDrawer = (open: boolean) => () => {
    setOpen(open);
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

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        padding: '20px',
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem component={Link} to="/spaces">
          <ListItemText primary="Notifications" />
        </ListItem>
        <ListItem component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItem>
        <ListItem component={Link} to="/faq">
          <ListItemText primary="FAQ" />
        </ListItem>
        {user?.isAuthenticated && (
          <>
            <ListItem component={Link} to="/events">
              <ListItemText primary="Events" />
            </ListItem>
            <ListItem component={Link} to="/notifications">
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem component={Link} to="/profile">
              <ListItemText primary="Profile" />
            </ListItem>
            <ListItem onClick={handleLogout}>
              <ListItemText primary="Log out" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

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
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            gap: '20px',
            alignItems: 'center',
          }}
        >
          <Navbar />
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              background: '#10107b',
            }}
          />
          {user?.isAuthenticated ? (
            <>
              <Box sx={{ display: 'flex', gap: '16px', color: '#10107b' }}>
                <Tooltip title="Events">
                  <IconButton sx={{ color: '#10107b' }} href="/events">
                    <EventIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Notifications">
                  <IconButton sx={{ color: '#10107b' }} href="/notifications">
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Profile">
                  <IconButton sx={{ color: '#10107b' }} href="/profile">
                    <AccountCircleIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Log out">
                  <IconButton sx={{ color: '#10107b' }} onClick={handleLogout}>
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          ) : (
            <>
              <Link
                to={'/login'}
                style={{
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#10107b',
                }}
              >
                Sign In
              </Link>
              <Link
                to={'/register'}
                style={{
                  textDecoration: 'none',
                  fontSize: '18px',
                  border: '1px solid #10107b',
                  fontWeight: '600',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  background: '#10107b',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Sign Up
              </Link>
            </>
          )}
        </Box>

        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton sx={{ color: '#10107b' }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Drawer для меню, который выезжает справа */}
      <Drawer
        anchor="right" // меню будет выезжать справа
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
