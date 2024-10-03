import { Box, Button, Typography } from '@mui/material';

import styles from './styles.module.scss';

import { Logo } from '../../shared/ui';
import RegisterForm from './components/LoginForm/RegisterForm';

export default function Register() {
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
        <Logo />
        <Box component="div" className={styles.registerInfo}>
          <Typography sx={{ fontWeight: '700', fontSize: '38px' }}>
            Sign Un to Event Space
          </Typography>
          <RegisterForm />
        </Box>
      </Box>
    </Box>
  );
}
