import React, { useState, useEffect } from 'react';
import { TextField,Button, FormControl,InputLabel,Select,MenuItem,Dialog, DialogTitle, DialogContent, DialogActions,} from '@mui/material';
import style from './form.module.css'

const ProductForm = ({ Data, selectedProduct }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subCategory: '',
    companyName: '', 
    price: '',
    ProductDetails: '', 
  });

  useEffect(() => {
    if (selectedProduct) {

      setFormData(selectedProduct);
      setOpen(true);
      console.log(selectedProduct);
    } else {

      setFormData({
        category: '',
        subCategory: '',
        companyName: '', 
        price: '',
        ProductDetails: '', 
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
        return ['tomato', 'carrot', 'cucumber']; 
      default:
        return [];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Data(formData);
    setFormData({
      category: '',
      subCategory: '',
      companyName: '', 
      price: '',
      ProductDetails: '', 
    });
    handleClose(); 
  };

  
  return (

    <div className={style.form}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Product Form</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Company Name" 
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
              label="Product Details" 
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
