import React, { useState } from 'react';
import axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/shop/signup`, {
                username: username,
                password: password,
            });
            // Handle successful signup, e.g., redirect to login page
            console.log('Signup successful:', response.data);
        } catch (error) {
            // Handle signup error
            console.error('Signup error:', error.response.data.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
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
                    onClick={handleSignup}
                    className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none"
                >
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;

