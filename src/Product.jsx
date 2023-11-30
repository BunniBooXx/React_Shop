import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [flashMessage, setFlashMessage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/shop/product/${productId}`, {
        
        });

        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
          console.log("Received data:", data.product);
        } else {
          console.error('Error fetching product details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    try {
      const authToken = localStorage.getItem('auth_token');
      
      // Check if the user is authenticated before making the request
      if (!authToken) {
        setFlashMessage('Please log in to add items to the cart.');
        // Clear flash message after a few seconds (adjust as needed)
        setTimeout(() => setFlashMessage(null), 3000);
        return;
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/shop/add_to_cart/${productId}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          //credentials: 'include', // Include this to send cookies with the request
        }
      );

      if (response.ok) {
        setFlashMessage('Item added to cart successfully!');
        // Clear flash message after a few seconds (adjust as needed)
        setTimeout(() => setFlashMessage(null), 3000);
        console.log('Item added to cart successfully!');
        // You may want to show a success message or update the UI accordingly
      } else {
        throw new Error(`Error adding item to cart: ${response.statusText}`);
      }
    } catch (error) {
      setFlashMessage('Error adding item to cart. Please try again.');
      // Clear flash message after a few seconds (adjust as needed)
      setTimeout(() => setFlashMessage(null), 3000);
      console.error('Error adding product to cart:', error.message);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={product.image} alt={product.product_name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.product_name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
        {flashMessage && <p className="flash-message">{flashMessage}</p>}
      </div>
    </div>
  );
};

export default ProductDetails;



