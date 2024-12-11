import { FC } from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { ISpace } from '../../../entities/types/ISpace';
import { Link } from 'react-router-dom';

interface Props {
  interior: ISpace;
}

const InteriorItem: FC<Props> = ({ interior }) => {
  return (
    <Card
      component={Link}
      to={`/space/${interior.id}`}
      sx={{
        width: 345,
        borderRadius: '12px',
        boxShadow: 3,
        textDecoration: 'none',
      }}
    >
      <CardMedia
        component="img"
        image={`https://space-event.kenuki.org/order-service/api/v1/files/${interior.imageUrl}`}
        sx={{
          objectFit: 'cover',
          height: '150px',
          borderRadius: '12px 12px 0 0',
        }}
        alt={interior.name}
      />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: '600',
              color: '#333',
              fontSize: '1.25rem',
            }}
          >
            {interior.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', width: '150px' }}
          >
            {interior.location} {interior.address}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Price: {interior.baseRentalCost}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Max. Capacity: {interior.maxCapacity}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Size: {interior.size}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InteriorItem;
