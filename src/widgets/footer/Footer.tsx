import { Box, Typography } from '@mui/material';

import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

export default function Footer() {
  const settings = [
    {
      text: 'Home',
      path: '/',
    },
    {
      text: 'Spaces',
      path: '/spaces',
    },
    {
      text: 'About',
      path: '/about',
    },
    {
      text: 'FAQ',
      path: '/faq',
    },
  ];

  return (
    <div className="container" style={{ background: '#10107b' }}>
      <Box className={styles.footerWrapper}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: '20px 0',
          }}
        >
          {settings.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                fontSize: '18px',
                color: 'white',
                fontWeight: '600',
              }}
            >
              {item.text}
            </Link>
          ))}
        </Box>
        <Box className={styles.buttom}>
          <Typography className={styles.copyright}>
            <Link to="/" className={styles.link}>
              Event Space
            </Link>
          </Typography>
          <Typography className={styles.copyright}>
            Non Copyrighted © 2024
          </Typography>
        </Box>
      </Box>
    </div>
  );
}
