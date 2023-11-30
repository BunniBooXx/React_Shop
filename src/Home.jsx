import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch backend 
    fetch('http://localhost:5000/shop/test')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div>
      <h2>Available Products</h2>
      <div className="grid gap-4 grid-cols-3">
        {products.map(product => (
          <div key={product.id} className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={product.image} alt={product.product_name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.product_name}</h2>
              <p>{product.description}</p>
              <div className="card-actions justify-end">
                <Link to={`/product/${product.id}`} className="btn btn-primary">
                  View Item
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
