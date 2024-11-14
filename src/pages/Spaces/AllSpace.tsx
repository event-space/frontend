import { useEffect, useState } from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { ISpace } from '../../entities/types/ISpace';
import InteriorItem from '../../shared/ui/Card/InteriorItem';
import useFetch from '../../shared/network/useFetch';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';

export default function AllSpace() {
  const [spaces, setSpaces] = useState<ISpace[]>([]);
  const navigate = useNavigate();

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
    <section className={styles.createSpacePage}>
      <div className="container">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginTop: '20px',
          }}
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              onClick={() => navigate('/')}
            >
              Home
            </Link>
            <Typography sx={{ color: 'text.primary' }}>Spaces</Typography>
          </Breadcrumbs>
          <Typography sx={{ fontSize: '36px', fontWeight: '600' }}>
            Spaces
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              justifyContent: 'space-between',
              gap: 4,
            }}
          >
            {spaces.map(place =>
              place.imageUrl ? (
                <InteriorItem
                  key={place.id}
                  interior={place}
                  updateQuery={fetchData}
                />
              ) : null,
            )}
          </Box>
        </Box>
      </div>
    </section>
  );
}
