import { Box } from '@mui/material';

import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default function Header() {
  return (
    <Box component="section">
      <div className="container">
        <Box component="div" className={styles.header}>
          <Box component="div" className={styles.locale} />
          <Box component="div" className={styles.headerWrapper}>
            <Link to="/">
              <img src="" alt="logo" />
            </Link>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
