import { Box, Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import LoginForm from './components/LoginForm/LoginForm';
import RightSection from './components/RightSection/RightSection';
import { Logo } from '../../shared/ui/Logo';

export default function LoginPage() {
  const navigate = useNavigate();
  return (
    <Box component="section" className={styles.login}>
      <Box
        component="div"
        sx={{ flexDirection: 'column', width: '100%' }}
        className={styles.leftSection}
      >
        <div className="container">
          <Box
            className={styles.login__wrapper}
            sx={{ flexDirection: 'column', width: '100%' }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button onClick={() => navigate('/')}>Back</Button>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Logo />
              </Box>
              <Box></Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20vh',
              }}
            >
              <Box
                component="div"
                className={styles.loginInfo}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Typography sx={{ fontWeight: '700', fontSize: '38px' }}>
                  Sign In to Event Space
                </Typography>
                <LoginForm />
              </Box>
            </Box>
          </Box>
        </div>
      </Box>
      <RightSection />
    </Box>
  );
}
