import { Box, Button, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';
import { MakeEventBanner, BannerHome } from './components';
import InteriorItem from '../../shared/ui/Card/InteriorItem';
import { ISpace } from '../../entities/types/ISpace';
import useFetch from '../../shared/network/useFetch';

export default function HomePage() {
  const [spaces, setSpaces] = useState<ISpace[]>([]);

  const { fetchData } = useFetch<ISpace[]>(
    'https://space-event.kenuki.org/order-service/api/v1/space',
  );

  useEffect(() => {
    fetchData({
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response) {
        setSpaces(response);
      }
    });
  }, [fetchData]);

  return (
    <Box component="section" sx={{ background: 'white' }}>
      <div className="container">
        <Box
          component="div"
          className={styles.home}
          sx={{ marginBottom: '50px' }}
        >
          <BannerHome />
        </Box>
      </div>
      <MakeEventBanner />
      <Box
        className="container"
        sx={{
          position: 'relative',
          bottom: { xs: '300px', sm: '200px', md: '20px' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#4A148C',
            }}
          >
            Popular Spaces
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#8e24aa',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#6a1b9a',
              },
              padding: '10px 20px',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
            component={Link}
            to="/spaces"
          >
            All Spaces
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: { xs: 'center', md: 'space-between' },
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            marginTop: '80px',
            marginBottom: '30px',
            gap: '50px',
            position: 'relative',
          }}
        >
          {spaces
            .slice(0, 3)
            .map(place =>
              place.imageUrl ? (
                <InteriorItem key={place.id} interior={place} />
              ) : null,
            )}
        </Box>
      </Box>
    </Box>
  );
}
