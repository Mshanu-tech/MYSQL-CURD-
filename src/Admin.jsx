import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import style from './admin.module.css'

const AdminDashboard = ({ product, onEdit }) => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchData();
  }, [product]);

  useEffect(() => {
    const lowerCaseSearch = searchQuery.toLowerCase();
    if (lowerCaseSearch.trim() === '') {
      setProducts(originalProducts);
    } else {
      const filtered = originalProducts.filter((product) =>
        product.companyName.toLowerCase().includes(lowerCaseSearch)
      );
      setProducts(filtered);
    }
  }, [searchQuery, originalProducts]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5051/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setOriginalProducts(result);
      setProducts(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (product) => {
    const id = product.id
    console.log(id);
    try {
      const response = await fetch(`http://localhost:5051/users/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log("asjdhasdgjadgh");
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }
  
  return (
    <>
      <div className={style.header}>
        <h3 style={{ fontSize: "25px" }}>Product List </h3>
        <div className={style.searchContainer}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ marginRight: '10px' }}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Company Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Sub-Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Product Details</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.companyName}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.subCategory}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.ProductDetails}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => onEdit(product)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(product)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminDashboard;
