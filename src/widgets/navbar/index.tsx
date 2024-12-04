import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

export default function Navbar() {
  const location = useLocation();
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
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexWrap: 'wrap',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      {settings.map(item => (
        <Link
          to={item.path}
          key={item.path}
          style={{
            textDecoration: 'none',
            fontSize: '18px',
            color: '#10107b',
            fontWeight: '600',
            borderBottom:
              location.pathname === item.path ? '2px solid #5e09cb' : '',
          }}
        >
          {item.text}
        </Link>
      ))}
    </Box>
  );
}
