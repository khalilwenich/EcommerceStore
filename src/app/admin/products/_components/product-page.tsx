import React, { useState, useEffect } from "react";
import { ProductForm } from "../_components/ProductForm"; // Adjust the import path as necessary

function ProductPage() {
  const [products, setProducts] = useState([]);

  const handleProductAdded = () => {
    fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products"); // Replace with your actual API endpoint
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product Page</h1>
      <ProductForm onProductAdded={handleProductAdded} />
      <div>
        <h2>Product List</h2>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProductPage;
