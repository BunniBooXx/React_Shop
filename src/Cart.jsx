import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const authToken = localStorage.getItem('auth_token');
        const response = await axios.get(`${BACKEND_URL}/shop/cart`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        

        setCartItems(response.data.cart);
        
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };

    fetchCartData();
  }, []);

 

  const removeFromCart = (productId) => {
    const authToken = localStorage.getItem('auth_token');
    axios.post(`${BACKEND_URL}/shop/remove_from_cart/${productId}`,{}, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then(response => {
        console.log(response.data.message);
        setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
      })
      .catch(error => console.error('Error removing from cart:', error));
  };

  const clearCart = () => {
    const authToken = localStorage.getItem('auth_token');
    axios.post(`${BACKEND_URL}/shop/remove_all_from_cart`,{},{
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    })
      .then(response => {
        console.log(response.data.message);
        setCartItems([]);
      })
      .catch(error => console.error('Error clearing cart:', error));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <button className="btn btn-outline btn-error" onClick={()=> clearCart()}>
        Clear Cart
      </button>

      {cartItems.map((item) => (
        <div key={item.id} className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img src={item.image} alt={item.name} />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            <p>{item.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => removeFromCart(item.id)}>
                Remove From Cart
              </button>
            </div>
          </div>
        </div>
      ))}

      {cartItems.length > 0 && (
        <div>
          <h3>Total: ${calculateTotal()}</h3>
        </div>
      )}
    </div>
  );
};

export default Cart;


