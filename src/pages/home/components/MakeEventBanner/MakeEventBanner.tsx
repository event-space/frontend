import { Box, Button, Typography } from '@mui/material';
import styles from './styles.module.scss';
import { BannerMakeEvent } from '../../../../shared/images';
import { useUserStore } from '../../../../app/store/useUserStore';
import { useNavigate } from 'react-router-dom';

export default function MakeEventBanner() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const handleEvent = () => {
    navigate('/events');
  };
  const handleLogin = () => {
    navigate('/login');
  };
  return (
    <Box
      className={styles.makeEventBanner}
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        height: { xs: '400px', md: '200px' },
        alignItems: { xs: 'center', md: 'end' },
        bottom: { xs: '400px', sm: '300px', md: '200px', lg: '100px' },
        justifyContent: { xs: 'end', md: 'center' },
      }}
    >
      <img src={BannerMakeEvent} alt="make event banner" />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '25px 0px',
        }}
      >
        <Typography
          sx={{ color: 'white', fontSize: '36px', fontWeight: '600' }}
        >
          Make your own Event{' '}
        </Typography>
        <Typography
          sx={{ color: 'white', fontSize: '18px', fontWeight: '300' }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
        </Typography>
        <Button
          sx={{
            color: 'white',
            fontSize: '18px',
            background: '#7848F4',
            borderRadius: '5px',
            width: '60%',
          }}
          onClick={user?.isAuthenticated ? handleEvent : handleLogin}
        >
          Create Events
        </Button>
      </Box>
    </Box>
  );
}
