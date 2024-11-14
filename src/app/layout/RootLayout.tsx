import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../../widgets';
import { Box } from '@mui/material';

export default function RootLayout() {
  return (
    <Box sx={{ width: '100%' }}>
      <header className="header">
        <Header />
      </header>
      <Box component="div" sx={{ background: '#F2F2F2', minHeight: '90vh' }}>
        <Outlet />
      </Box>
      <footer className="footer">
        <Footer />
      </footer>
    </Box>
  );
}
