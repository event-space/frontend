import { useEffect, useState } from 'react';
import { Box, Button, FormControl, Typography } from '@mui/material';
import styles from './styles.module.scss';

export default function RegisterForm() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>('');

  useEffect(() => {
    setError('');
  }, []);

  const isFormValid =
    login.trim() !== '' &&
    password.trim() !== '' &&
    repeatPassword.trim() !== '';

  return (
    <FormControl required className={styles.loginForm}>
      <label htmlFor="login" className={styles.inputForm}>
        <Typography sx={{ fontWeight: '600' }}>YOUR LOGIN</Typography>
        <input
          type="text"
          placeholder="Enter your login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </label>

      <label htmlFor="password" className={styles.inputForm}>
        <Typography sx={{ fontWeight: '600' }}>YOUR PASSWORD</Typography>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <label htmlFor="repeatPassword" className={styles.inputForm}>
        <Typography sx={{ fontWeight: '600' }}>REPEAT PASSWORD</Typography>
        <input
          type="password"
          id="repeatPassword"
          placeholder="Repeat your password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </label>

      <Box className={styles.signIn}>
        <Typography>{error}</Typography>
        <Button className={styles.signInButton} disabled={!isFormValid}>
          Sign Up
        </Button>
      </Box>
    </FormControl>
  );
}
