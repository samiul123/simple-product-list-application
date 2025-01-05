import React from 'react';
import { Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

const Product = ({ product, onDelete }) => {
  if (!product) return null;

  return (
    <Grid item key={product.id} xs={12} sm={6} md={4}>
      <Card sx={{ position: 'relative', boxShadow: 3 }}>
        <IconButton
          onClick={() => onDelete(product.id)}
          color="error"
          sx={{
            position: 'absolute',
            top: 2,
            left: 6,
            zIndex: 1
          }}
        >
          <DeleteIcon />
        </IconButton>
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{ width: '100%', height: '200px', objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            {product.name}
          </Typography>
          <Typography variant="body1">
            ${product.price}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {product.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Product;