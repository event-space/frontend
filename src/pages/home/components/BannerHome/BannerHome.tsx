import { Box, Typography } from '@mui/material';
import { HomeBanner } from '../../../../shared/images';

export default function BannerHome() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={HomeBanner}
        alt="home banner"
        sx={{
          width: '100%',
          height: '80%',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '80%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Тёмный слой с прозрачностью
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '16px', sm: '30px', md: '42px', lg: '64px' },
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          If you want to host events, you're in the right place
        </Typography>
      </Box>
    </Box>
  );
}
