import React, { useState } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [flashMessage, setFlashMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/shop/login`, {
                username: username,
                password: password,
            });
            
            // Set a success flash message
            setFlashMessage('Login successful!');

            // Handle successful login, e.g., store JWT in local storage
            console.log('Login successful:', response.data);

            // Assuming the backend sends an auth token, store it in local storage
            localStorage.setItem("auth_token", response.data.auth_token);
        } catch (error) {
            // Set an error flash message
            setFlashMessage('Login failed. Please check your credentials.');

            // Handle login error
            console.error('Login error:', error.response.data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {flashMessage && <p className={flashMessage.includes('successful') ? 'text-green-600' : 'text-red-600'}>{flashMessage}</p>}
            <form>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded-md py-2 px-3"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-md py-2 px-3"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleLogin}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;

