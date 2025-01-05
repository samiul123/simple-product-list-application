import React, { useState, useEffect } from 'react';
import { Alert, Container, Grid, Typography, Box } from '@mui/material';
import apiClient from '../api/apiClient';
import Product from './Product';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  //implement the get products function
  const fetchProducts = async () => {
    try {
      const response = await apiClient.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.response?.data?.message || 'Failed to fetch data');
    } 
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  //implement the delete function
  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/api/products/${id}`);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      setError(error.response?.data?.message || 'Failed to delete data');
    }
  };

  return (
    <Container>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', textAlign: 'center', margin: '40px 0' }}
      >
        Simple Card List
      </Typography>

      {
        error && (
          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginBottom: '20px' }}
          >
            <Alert severity='error'>
              {error}
            </Alert>
          </Box>
        )
      }

      {
        products.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            sx={{ marginBottom: '20px' }}
          >
            <Alert severity="info">
              Product list is empty
            </Alert>
          </Box>
          
        ) : (
          <Grid container spacing={3} sx={{marginBottom: '30px'}}>
            {products.map((product) => (
              <Product key={product.id} product={product} onDelete={handleDelete} />
            ))}
          </Grid>
        )
      }
    </Container>
  );
};

export default ProductList;