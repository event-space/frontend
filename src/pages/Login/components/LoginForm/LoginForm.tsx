import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, FormControl, Typography } from '@mui/material';
import styles from './styles.module.scss';

export default function LoginForm() {
  // State to track login and password input values
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>();

  useEffect(() => {
    setError('');
  }, []);

  // Function to check if inputs are filled
  const isFormValid = login.trim() !== '' && password.trim() !== '';

  return (
    <FormControl required className={styles.loginForm}>
      <label htmlFor="login" className={styles.inputForm}>
        <Typography sx={{ fontWeight: '600' }}>YOUR LOGIN</Typography>
        <input
          type="text"
          placeholder="Enter your login"
          value={login}
          onChange={(e) => setLogin(e.target.value)} // Update login state
        />
      </label>
      <label htmlFor="password" className={styles.inputForm}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography sx={{ fontWeight: '600' }}>YOUR PASSWORD</Typography>
          <Link to="/forgot" className={styles.forgot}>
            <Typography>Forgot your password?</Typography>
          </Link>
        </Box>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
        />
      </label>
      <Box className={styles.signIn}>
        <Typography>{error}</Typography>
        <Button className={styles.signInButton} disabled={!isFormValid}>
          Sign In
        </Button>
      </Box>
    </FormControl>
  );
}
