// ProductForm.jsx
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const ProductForm = ({ Data, selectedProduct }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    companyName: '', // Change from 'productCenterName' to 'companyName'
    price: '',
    ProductDetails: '', // Change from 'otherDetails' to 'ProductDetails'
  });

  useEffect(() => {
    if (selectedProduct) {
      // If selectedProduct prop is provided, populate the form with its data
      setFormData(selectedProduct);
      setOpen(true);
      console.log(selectedProduct);
    } else {
      // If no selectedProduct, reset the form data
      setFormData({
        category: '',
        subCategory: '',
        companyName: '', // Change from 'productCenterName' to 'companyName'
        price: '',
        ProductDetails: '', // Change from 'otherDetails' to 'ProductDetails'
      });
    }
  }, [selectedProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getSubCategories = () => {
    switch (formData.category) {
      case 'electronics':
        return ['charger', 'phone'];
      case 'vegetables':
        return ['tomato', 'carrot', 'cucumber']; // Add more vegetables as needed
      default:
        return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Data(formData);
    handleClose(); // Close the modal after submission
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Open Form
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Product Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Company Name" // Change from 'Product Center Name' to 'Company Name'
              name="companyName"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.companyName}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="vegetables">Vegetables</MenuItem>
                {/* Add more categories as needed */}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="subCategory-label">Sub-Category</InputLabel>
              <Select
                labelId="subCategory-label"
                label="Sub-Category"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
              >
                {getSubCategories().map((subCategory) => (
                  <MenuItem key={subCategory} value={subCategory}>
                    {subCategory}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Price"
              name="price"
              fullWidth
              margin="normal"
              variant="outlined"
              value={formData.price}
              onChange={handleInputChange}
            />
            <TextField
              label="Product Details" // Change from 'Other Details' to 'Product Details'
              name="ProductDetails"
              fullWidth
              margin="normal"
              variant="outlined"
              multiline
              rows={4}
              value={formData.ProductDetails}
              onChange={handleInputChange}
            />
            <DialogActions>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductForm;
