import { Box } from '@mui/material';
import React from 'react';

import styles from './styles.module.scss';

export default function Navigation() {
  return (
    <Box component="section">
      <div className="container">
        <Box component="div" className={styles.navigation} />
      </div>
    </Box>
  );
}
