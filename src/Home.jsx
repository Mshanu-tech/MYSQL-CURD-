import React, { useEffect, useState } from 'react';
import Form from '../src/Form';
import AdminDashboard from '../src/Admin';
import style from './home.module.css';


function Home() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductData = async (formData) => {
    try {
      if (selectedProduct) {
        const response = await fetch(`http://localhost:5051/users/${selectedProduct.id}`, {
          method: 'PUT', 
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

        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === selectedProduct.id ? formData : p))
        );
      } else {
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

        setProducts([...products, formData]);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }

    setSelectedProduct(null);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  }



  return (
    <div>
      <Form Data={handleProductData} selectedProduct={selectedProduct} />
      <AdminDashboard product={products} onEdit={handleEdit} />
    </div>
  );
}

export default Home;
