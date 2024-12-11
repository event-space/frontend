/* eslint-disable no-console */
import { ChangeEvent, useCallback, useState } from 'react';
import { Box, Button, FormControl, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import useFetch from '../../../../shared/network/useFetch';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [error, setError] = useState<string | undefined>('');
  const { fetchData } = useFetch<{
    error: string;
  }>('https://space-event.kenuki.org/security-service/api/auth/register');

  const handleLoginChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLogin(e.target.value);
      if (error) setError('');
    },
    [error],
  );

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (error) setError('');
    },
    [error],
  );

  const handleRePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setRepeatPassword(e.target.value);
      if (error) setError('');
    },
    [error],
  );

  const onSubmit = useCallback(async () => {
    if (password.length < 8) {
      setError('Password length must be at least 8 characters');
    } else if (password !== repeatPassword) {
      setError('Password not same');
    } else {
      fetchData({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: login,
          password,
        }),
      }).then(resp => {
        if (resp && resp.error) {
          setError(resp.error);
        } else {
          navigate('/login');
        }
      });
    }
  }, [login, navigate, password, repeatPassword]);

  const isFormValid =
    login.trim() !== '' &&
    password.trim() !== '' &&
    repeatPassword.trim() !== '';

  return (
    <FormControl
      required
      className={styles.loginForm}
      sx={{ maxWidth: '500px' }}
    >
      <label htmlFor="login" className={styles.inputForm}>
        <Typography sx={{ fontWeight: '600' }}>YOUR LOGIN</Typography>
        <input
          type="text"
          placeholder="Enter your login"
          value={login}
          onChange={handleLoginChange}
          style={{
            border:
              error === 'Email already exists!' ||
              error === 'Password length must be at least 8 characters'
                ? '1px solid red'
                : 'none',
          }}
        />
      </label>

      <label htmlFor="password" className={styles.inputForm}>
        <Typography sx={{ fontWeight: '600' }}>YOUR PASSWORD</Typography>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          style={{
            border: error === 'Password not same' ? '1px solid red' : 'none',
          }}
        />
      </label>

      <label htmlFor="repeatPassword" className={styles.inputForm}>
        <Typography sx={{ fontWeight: '600' }}>REPEAT PASSWORD</Typography>
        <input
          type="password"
          id="repeatPassword"
          placeholder="Repeat your password"
          value={repeatPassword}
          onChange={handleRePasswordChange}
          style={{
            border: error === 'Password not same' ? '1px solid red' : 'none',
          }}
        />
      </label>
      <Typography sx={{ color: 'red' }}>{error}</Typography>
      <Box className={styles.signIn}>
        <Button
          className={styles.signInButton}
          disabled={!isFormValid}
          onClick={onSubmit}
        >
          Sign Up
        </Button>
      </Box>
    </FormControl>
  );
}
