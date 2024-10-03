import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import { Footer, Header } from '../../widgets';

export default function RootLayout() {
  return (
    <div className="root-layout">
      <Header />
      <Box component="div" sx={{ marginTop: '150px' }}>
        <Outlet />
      </Box>
      <Footer />
    </div>
  );
}
