import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Typography,
} from '@mui/material';
import styles from './styles.module.scss';
import { useUserStore } from '../../../../app/store/useUserStore';
import useFetch from '../../../../shared/network/useFetch';

export default function LoginForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { data, error, loading, fetchData } = useFetch<{
    accessToken: string;
    refreshToken: string;
  }>('https://space-event.kenuki.org/security-service/api/auth/login');

  const { login: contextLogin, user, loading: userLoading } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      contextLogin(login, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      navigate('/');
    }
  }, [data, contextLogin, navigate]);

  useEffect(() => {
    if (user && user.isAuthenticated) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetchData({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ emailOrUsername: login, password }),
    });
  };

  const isFormValid = login.trim() !== '' && password.trim() !== '';

  return (
    <Box component="form" onSubmit={handleSubmit} className={styles.loginForm}>
      <label htmlFor="login" className={styles.inputForm}>
        <Typography sx={{ fontWeight: '600' }}>YOUR LOGIN</Typography>
        <input
          type="text"
          placeholder="Enter your login"
          value={login}
          onChange={handleUsernameChange}
          style={{ border: error ? '1px solid red' : 'none' }}
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
          onChange={handlePasswordChange}
          style={{ border: error ? '1px solid red' : 'none' }}
        />
        {error && <Typography sx={{ color: 'red' }}>{error}</Typography>}
      </label>
      <Box className={styles.signIn}>
        <Button
          className={styles.signInButton}
          disabled={!isFormValid || loading}
          onClick={() => handleSubmit}
          type="submit"
        >
          {loading ? <CircularProgress size={24} /> : 'Sign In'}
        </Button>
      </Box>
    </Box>
  );
}
