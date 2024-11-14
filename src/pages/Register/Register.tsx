import { Box, Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

import RegisterForm from './components/RegisterForm/RegisterForm';
import { Logo } from '../../shared/ui/Logo';

export default function RegisterPage() {
  const navigate = useNavigate();
  return (
    <Box component="section" className={styles.register}>
      <Box component="div" className={styles.rightSection}>
        <Box component="div" className={styles.registerInfoRight}>
          <Typography variant="h4">Hello Friend</Typography>
          <Typography variant="body1">
            To keep connected with us provide us with your information
          </Typography>
          <Button className={styles.signUpRight}>SignUp</Button>
        </Box>
      </Box>
      <Box component="div" className={styles.leftSection}>
        <div className="container">
          <Box className={styles.login__wrapper}>
            <Box>
              <Button onClick={() => navigate('/')}>Back</Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '15vh',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Logo />
              </Box>
              <Box component="div" className={styles.loginInfo}>
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
