import { Box, Typography } from '@mui/material';
import { HomeBanner } from '../../../../shared/images';
import styles from './styles.module.scss';

export default function BannerHome() {
  return (
    <Box className={styles.banner}>
      <Box className={styles.bannerImg}>
        <Typography
          className={styles.bannerTitle}
          sx={{ fontSize: { xs: '16px', sm: '30px', md: '42px', lg: '64px' } }}
        >
          Made for those who do
        </Typography>
        <img src={HomeBanner} alt="home banner" />
      </Box>
    </Box>
  );
}
