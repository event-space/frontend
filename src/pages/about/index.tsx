import { Box, Typography } from '@mui/material';

export default function AboutPage() {
  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="container">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#333',
          }}
        >
          About Us
        </Typography>
        <img
          src="https://bed-booking.com/wp-content/uploads/2024/09/fotografowie-copy.webp"
          alt="Описание изображения"
          style={{
            width: '100%',
            height: 'auto',
            marginBottom: '16px',
            borderRadius: '8px',
          }}
        />
        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            color: '#555',
          }}
        >
          Welcome to our platform! We specialize in providing a seamless booking
          experience for venues and spaces tailored to your needs. Whether
          you're planning an event, organizing a business meeting, or looking
          for a creative space, our website offers a wide range of options to
          suit your requirements. With user-friendly features, real-time
          availability, and secure booking, we aim to make your search for the
          perfect venue simple and stress-free.
        </Typography>
      </div>
    </Box>
  );
}
