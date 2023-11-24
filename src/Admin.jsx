import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';

const AdminDashboard = ({ product, onEdit }) => {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    fetchData();
  }, [product]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5051/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setProducts(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

//   const handleEdit = (product) => {
// console.log(product);
//   }

  const handleDelete = async(product) => {
    const id = product.id
console.log(id);
    try {
        const response = await fetch(`http://localhost:5051/users/${id}`, {
            method:'DELETE'
        });
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        console.log("asjdhasdgjadgh");
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    } catch (error) {
        console.error('Error deleting data:', error);
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product Center Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Sub-Category</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Other Details</TableCell>
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
  );
};

export default AdminDashboard;
