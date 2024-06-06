
"use client"
import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const Registration = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    
    const router = useRouter();

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
        const url = `${BASE_URL}/api/user/register`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username, 
                    email,
                    password,
                    phone,
                })
            });

            if (!response.ok) {
                toast.error('Registration Failed! Fill all field');
                throw new Error('Failed to register');
            }

            setUsername('');
            setEmail('');
            setPassword('');
            setPhone('');

            const data = await response.json();
            toast.success('Registration success');
            console.log('Registration successful:', data);
            router.push('/login');
        } catch (error) {
            console.error('Error registering:', error.message);
            if (error.message.includes('email already exists')) {
                toast.error('Email already exists');
            } else {
                toast.error('Registration already exist or failed');
                setErrorMessage('Registration already exist or failed');
                
            }
        }
    };

    return (
        <div className="container mx-auto lg:px-4 lg:py-8 px-7 pb-2 pt-[100px] bgghk bg-[#060B27]">
            <h1 className="text-3xl font-bold mb-6 text-white text-center">Register</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto lg:mb-[100px] bg-transparent p-6 rounded shadow-md box_shadow">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-white">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-white">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-white">Phone:</label>
                    <input
                        type="number"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-white">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    />
                </div>
                {errorMessage && (
                    <div className="text-red-500 mb-4">
                        {errorMessage}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full bg-[#cfff13] text-black p-2 rounded"
                >
                    Register Now
                </button>
                <div className="text-center mt-4 text-white">
                    Already have an account? 
                    <Link href="/login" className="text-[#cfff13] hover:underline">
                        Login here
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Registration;
