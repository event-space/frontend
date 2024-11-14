import { Box, Button, Input, Typography } from '@mui/material';
import styles from './styles.module.scss';

export default function RegisterBanner() {
  return (
    <Box className={styles.registerBanner}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          padding: '25px 0px',
        }}
      >
        <Typography
          sx={{ color: 'white', fontSize: '36px', fontWeight: '600' }}
        >
          Make your own Event
        </Typography>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Input
            placeholder="Email"
            disableUnderline
            sx={{
              border: '1px solid white',
              padding: '5px 10px',
              background: 'white',
              fontSize: '16px',
              width: '250px',
              color: '#10107b',
              borderRadius: '5px',
            }}
          />
          <Button
            sx={{
              border: '1px solid #10107b',
              background: '#10107b',
              color: 'white',
              fontWeight: '600',
              padding: '5px 10px',
              borderRadius: '5px',
              fontSize: '16px',
              width: '150px',
              cursor: 'pointer',
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
