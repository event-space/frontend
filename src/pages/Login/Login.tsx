import { Box, Button, Typography } from '@mui/material';

import styles from './styles.module.scss';
import LoginForm from './components/LoginForm/LoginForm';
import { Logo } from '../../shared/ui';

export default function Login() {
  return (
    <Box component="section" className={styles.login}>
      <Box component="div" className={styles.leftSection}>
        <Logo />
        <Box component="div" className={styles.loginInfo}>
          <Typography sx={{ fontWeight: '700', fontSize: '38px' }}>
            Sign In to Event Space
          </Typography>
          <LoginForm />
        </Box>
      </Box>
      <Box component="div" className={styles.rightSection}>
        <Box component="div" className={styles.loginInfoRight}>
          <Typography variant="h4">Welcome Back</Typography>
          <Typography variant="body1">
            To keep connected with us provide us with your information
          </Typography>
          <Button className={styles.signInRight}>SignIn</Button>
        </Box>
      </Box>
    </Box>
  );
}
