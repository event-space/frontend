import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

function Logo() {
  return (
    <Link to="/" className={styles.link}>
      <Typography className={styles.logo}>
        Event <span>Space</span>
      </Typography>
    </Link>
  );
}

export default Logo;
