import { Box, Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

import RegisterForm from './components/RegisterForm/RegisterForm';
import { Logo } from '../../shared/ui/Logo';

export default function RegisterPage() {
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
            <Box>
              <Button onClick={() => navigate('/')}>Back</Button>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                component="div"
                className={styles.loginInfo}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Typography sx={{ fontWeight: '700', fontSize: '38px' }}>
                  Sign Un to Event Space
                </Typography>
                <RegisterForm />
              </Box>
            </Box>
          </Box>
        </div>
      </Box>
    </Box>
  );
}
