import React, { FC, useCallback, useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Divider,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ISpace } from '../../../entities/types/ISpace';

interface Props {
  interior: ISpace;
  updateQuery(): void;
}

const InteriorItem: FC<Props> = ({ interior, updateQuery }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: interior.name,
    address: interior.address,
    location: interior.location,
    size: interior.size,
    maxCapacity: interior.maxCapacity,
    baseRentalCost: interior.baseRentalCost,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleEditSubmit = useCallback(async () => {
    const spaceRequest = {
      name: form.name,
      address: form.address,
      location: form.location,
      size: form.size,
      maxCapacity: form.maxCapacity,
      baseRentalCost: form.baseRentalCost,
    };

    const formData = new FormData();
    formData.append('spaceRequest', JSON.stringify(spaceRequest));
    formData.append('name', form.name || '');
    formData.append('address', form.address || '');
    formData.append('location', form.location || '');
    formData.append('size', String(form.size)); // Convert to string
    formData.append('maxCapacity', String(form.maxCapacity)); // Convert to string
    formData.append('baseRentalCost', String(form.baseRentalCost)); // Convert to string

    if (selectedFile) {
      formData.append('file', selectedFile);
    }

    try {
      const response = await fetch(
        `https://zenuki.kz/api/v1/space/${
          selectedFile ? 'updateWithFile' : 'update'
        }/${interior.id}`,
        {
          method: 'PUT',
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error('Failed to update space');
      }

      handleClose();
      updateQuery();
    } catch (error) {
      console.error('Error:', error);
    }
  }, [form, interior.id, updateQuery, selectedFile]);

  const handleDelete = useCallback(async () => {
    const response = await fetch(
      `https://zenuki.kz/api/v1/space/delete/${interior.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to delete space');
    }

    updateQuery();
  }, [interior.id, updateQuery]);

  return (
    <>
      <Card sx={{ width: 345, borderRadius: '12px', boxShadow: 3 }}>
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
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
          {/* Render Edit and Delete buttons only if on /space page */}
          {location.pathname === '/space' && (
            <Box
              sx={{
                marginTop: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ width: '125px', borderRadius: '8px' }}
                onClick={handleOpen}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: '125px', borderRadius: '8px' }}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Space</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            variant="outlined"
            value={form.name}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Location"
            name="location"
            fullWidth
            variant="outlined"
            value={form.location}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Address"
            name="address"
            fullWidth
            variant="outlined"
            value={form.address}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Size"
            name="size"
            type="number"
            fullWidth
            variant="outlined"
            value={form.size}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Max Capacity"
            name="maxCapacity"
            type="number"
            fullWidth
            variant="outlined"
            value={form.maxCapacity}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            margin="dense"
            label="Base Rental Cost"
            name="baseRentalCost"
            type="number"
            fullWidth
            variant="outlined"
            value={form.baseRentalCost}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <Box mt={2}>
            <Typography variant="body2">Upload New Image</Typography>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ marginTop: '8px' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleEditSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InteriorItem;
