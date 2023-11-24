// Home.jsx
import React, { useState } from 'react';
import Form from '../src/Form';
import AdminDashboard from '../src/Admin';

function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductData = async (formData) => {
    try {
      if (selectedProduct) {
        // If selectedProduct exists, it means we're editing
        const response = await fetch(`http://localhost:5051/users/${selectedProduct.id}`, {
          method: 'PUT', // Use PUT for updating data
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyName: formData.companyName,
            price: formData.price,
            category: formData.category,
            subCategory: formData.subCategory,
            ProductDetails: formData.ProductDetails,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Update the products state with the edited product
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === selectedProduct.id ? formData : p))
        );
      } else {
        // If selectedProduct doesn't exist, it means we're adding a new product
        const response = await fetch('http://localhost:5051/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            companyName: formData.companyName,
            price: formData.price,
            category: formData.category,
            subCategory: formData.subCategory,
            ProductDetails: formData.ProductDetails,
          }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Add the new product to the products state
        setProducts([...products, formData]);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }

    // Reset the selectedProduct state after submitting the form
    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      <Form Data={handleProductData} selectedProduct={selectedProduct} />
      <AdminDashboard product={products} onEdit={handleEdit} />
    </div>
  );
}

export default Home;
