import { useEffect, useState } from 'react';
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
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
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [filterPrice, setFilterPrice] = useState<string>('lowToHigh');
  const [filterCapacity, setFilterCapacity] = useState<number | 'all'>('all');
  const [filterSize, setFilterSize] = useState<number | 'all'>('all');
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

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOrder(event.target.value);
  };

  const handlePriceChange = (event: SelectChangeEvent<string>) => {
    setFilterPrice(event.target.value);
  };

  const handleCapacityChange = (event: SelectChangeEvent<string | number>) => {
    const value = event.target.value;
    setFilterCapacity(value === 'all' ? 'all' : Number(value));
  };

  const handleSizeChange = (event: SelectChangeEvent<string | number>) => {
    const value = event.target.value;
    setFilterSize(value === 'all' ? 'all' : Number(value));
  };

  // Фильтрация
  const filteredSpaces = spaces
    .filter(
      space =>
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter(
      space => filterCapacity === 'all' || space.maxCapacity >= filterCapacity,
    )
    .filter(space => filterSize === 'all' || space.size >= filterSize);

  // Сортировка
  const sortedSpaces = filteredSpaces.sort((a, b) => {
    if (sortOrder === 'newest') {
      return b.id - a.id;
    } else if (sortOrder === 'oldest') {
      return a.id - b.id;
    } else if (sortOrder === 'price') {
      if (filterPrice === 'lowToHigh') {
        return a.baseRentalCost - b.baseRentalCost;
      } else {
        return b.baseRentalCost - a.baseRentalCost;
      }
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedSpaces.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedSpaces.length / itemsPerPage);

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

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 4,
            }}
          >
            <FormControl>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortOrder} onChange={handleSortChange}>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Price</InputLabel>
              <Select value={filterPrice} onChange={handlePriceChange}>
                <MenuItem value="lowToHigh">Low to High</MenuItem>
                <MenuItem value="highToLow">High to Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Capacity</InputLabel>
              <Select value={filterCapacity} onChange={handleCapacityChange}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value={10}>Up to 10</MenuItem>
                <MenuItem value={20}>Up to 20</MenuItem>
                <MenuItem value={50}>Up to 50</MenuItem>
                <MenuItem value={100}>Up to 100</MenuItem>
              </Select>
            </FormControl>

            <FormControl>
              <InputLabel>Size</InputLabel>
              <Select value={filterSize} onChange={handleSizeChange}>
                <MenuItem value="all">All</MenuItem>
                <MenuItem value={50}>Up to 50 m²</MenuItem>
                <MenuItem value={100}>Up to 100 m²</MenuItem>
                <MenuItem value={200}>Up to 200 m²</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
