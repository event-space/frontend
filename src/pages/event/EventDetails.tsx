import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  CardMedia,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../app/store/useUserStore';
import useFetch from '../../shared/network/useFetch';
import { ISpace } from '../../entities/types/ISpace';

export default function EventDetails({
  onNext,
}: {
  onNext: (data: any) => void;
}) {
  const { user: userInfo } = useUserStore();
  const [spaces, setSpaces] = useState<ISpace[]>([]);
  const [selectedSpace, setSelectedSpace] = useState<ISpace>();
  const [eventName, setEventName] = useState('');

  const { fetchData: fetchSpaces } = useFetch<any>(
    'https://space-event.kenuki.org/order-service/api/v1/space',
  );

  useEffect(() => {
    fetchSpaces({
      headers: {
        Authorization: `Bearer ${userInfo?.tokens.accessToken}`,
        'Content-Type': 'application/json',
      },
    }).then(response => {
      if (response) {
        setSpaces(response);
      }
    });
  }, []);

  const handleNext = () => {
    onNext({
      name: eventName,
      space: selectedSpace,
      userEmail: userInfo?.username,
    });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Step 1. Create Event
      </Typography>
      <TextField
        label="Event Name"
        value={eventName}
        onChange={e => setEventName(e.target.value)}
        fullWidth
        required
        sx={{ mb: 3 }}
      />
      <Select
        value={selectedSpace?.id || ''}
        onChange={e =>
          setSelectedSpace(spaces.find(space => space.id === e.target.value))
        }
        displayEmpty
        fullWidth
        required
        sx={{ mb: 3 }}
      >
        <MenuItem value="" disabled>
          Select Space
        </MenuItem>
        {spaces.map((space: any) => (
          <MenuItem key={space.id} value={space.id}>
            {space.name}
          </MenuItem>
        ))}
      </Select>
      {selectedSpace && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1">Space Details:</Typography>
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <CardMedia
              component="img"
              image={`https://space-event.kenuki.org/order-service/api/v1/files/${selectedSpace.imageUrl}`}
              sx={{ objectFit: 'cover', height: '350px', width: '650px' }}
              alt={selectedSpace.name}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Typography variant="body1">
                Name:{' '}
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    fontSize: '18px',
                  }}
                >
                  {selectedSpace.name}
                </span>
              </Typography>
              <Typography variant="body2">
                Location:{' '}
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    fontSize: '18px',
                  }}
                >
                  {selectedSpace.location}
                </span>
              </Typography>
              <Typography variant="body2">
                Address:{' '}
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    fontSize: '18px',
                  }}
                >
                  {selectedSpace.address}
                </span>
              </Typography>
              <Typography variant="body2">
                Capacity:{' '}
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    fontSize: '18px',
                  }}
                >
                  {selectedSpace.maxCapacity}
                </span>
              </Typography>
              <Typography variant="body2">
                Size:{' '}
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    fontSize: '18px',
                  }}
                >
                  {selectedSpace.size}
                </span>
              </Typography>
              <Typography sx={{ fontSize: '18px', fontWeight: '600' }}>
                Cost:{' '}
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    fontSize: '20px',
                  }}
                >
                  {selectedSpace.baseRentalCost} тг
                </span>
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={!eventName || !selectedSpace}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
