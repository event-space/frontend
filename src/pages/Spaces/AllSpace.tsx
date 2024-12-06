import { useEffect, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import { ISpace } from '../../entities/types/ISpace';
import InteriorItem from '../../shared/ui/Card/InteriorItem';
import useFetch from '../../shared/network/useFetch';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

export default function AllSpace() {
  const [spaces, setSpaces] = useState<ISpace[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredSpaces = spaces.filter(space =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSpaces.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredSpaces.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

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

          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ marginBottom: '20px' }}
          />

          <Box sx={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {currentItems.map(place =>
              place.imageUrl ? (
                <InteriorItem
                  key={place.id}
                  interior={place}
                  updateQuery={fetchData}
                />
              ) : null,
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              marginTop: '20px',
            }}
          >
            <Button
              variant="outlined"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Typography sx={{ display: 'flex', alignItems: 'center' }}>
              Page {currentPage} of {totalPages}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Box>
        </Box>
      </div>
    </section>
  );
}
