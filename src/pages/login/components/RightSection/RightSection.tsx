import { Box, Button, Typography } from '@mui/material';
import styles from './styles.module.scss';

export default function RightSection() {
  return (
    <Box
      component="div"
      className={styles.rightSection}
      sx={{ display: { xs: 'none', sm: 'flex' } }}
    >
      <Box component="div" className={styles.loginInfoRight}>
        <Typography variant="h4">Welcome Back</Typography>
        <Typography variant="body1">
          To keep connected with us provide us with your information
        </Typography>
        <Button className={styles.signInRight}>SignIn</Button>
      </Box>
    </Box>
  );
}
