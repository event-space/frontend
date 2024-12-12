import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../app/store/useUserStore'; // Адаптируйте путь к вашему стору

export default function FAQPage() {
  const navigate = useNavigate();
  const { user } = useUserStore(); // Предполагается, что `useUserStore` предоставляет данные пользователя

  const handleButtonClick = () => {
    if (user) {
      navigate('/events'); // Если пользователь авторизован, перенаправить на /events
    } else {
      navigate('/login'); // Если пользователь не авторизован, перенаправить на /login
    }
  };

  return (
    <Box>
      <div className="container">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '#333',
            textAlign: 'left',
          }}
        >
          Frequently Asked Questions
        </Typography>
        {[
          {
            question: 'What is this platform about?',
            answer:
              'This platform is designed to help users book venues and spaces for various purposes such as events, meetings, and more. We aim to provide a seamless and user-friendly booking experience.',
          },
          {
            question: 'How can I book a venue?',
            answer:
              'To book a venue, simply search for your desired location, select the venue that suits your needs, and follow the steps to complete your booking.',
          },
          {
            question: 'Is there a customer support service?',
            answer:
              'Yes, our customer support team is available to assist you with any inquiries or issues. You can contact us via email or phone.',
          },
          {
            question: 'What payment methods are accepted?',
            answer:
              'We accept various payment methods, including credit cards, PayPal, and direct bank transfers.',
          },
          {
            question: 'Can I cancel or modify my booking?',
            answer:
              'Yes, you can cancel or modify your booking depending on the venue’s cancellation policy. Please check the details in your booking confirmation.',
          },
          {
            question: 'Is there a mobile app available?',
            answer:
              'Currently, our platform is available via the website. We are working on developing a mobile app for an even better experience.',
          },
          {
            question: 'Are there any additional fees?',
            answer:
              'Some venues may charge additional fees for specific services. All costs are transparently displayed during the booking process.',
          },
          {
            question: 'Can I view the venue before booking?',
            answer:
              'Yes, many venues offer a virtual tour or images on their profile. If you wish to visit in person, you can contact the venue directly.',
          },
          {
            question: 'How do I leave feedback for a venue?',
            answer:
              'After your event, you will receive an email with a link to leave feedback. Your feedback helps us improve our platform and services.',
          },
          {
            question: 'What if I face issues during my booking?',
            answer:
              'If you encounter any issues, please contact our customer support team immediately. We are here to assist you.',
          },
        ].map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`faq${index + 1}-content`}
              id={`faq${index + 1}-header`}
            >
              <Typography>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </Box>
  );
}
