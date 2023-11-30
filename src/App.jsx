import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './SignUp';
import HomePage from './Home';
import ProductDetails from './Product';
import Cart from './Cart';


function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container mt-4">
                    <Routes>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/product/:productId" element={<ProductDetails/>}/>

                        <Route path="/cart" element={<Cart/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;

