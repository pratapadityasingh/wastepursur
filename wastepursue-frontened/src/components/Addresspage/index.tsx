"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useUserContext } from '../context';
import router from 'next/navigation';
import { log } from 'console';

interface Address {
    fullName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}


const AddressPage = () => {
    const [userId, setUserId] = useState<string>('');
    const [address, setAddress] = useState<Address>({
        fullName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
    });

    const decodeJwtToken = (token: string) => {
        try {
            const [_, payloadEncoded] = token.split('.');
            const payloadDecoded = atob(payloadEncoded);
            return JSON.parse(payloadDecoded);
        } catch (error) {
            console.error('Error decoding JWT token:', error.message);
            return null;
        }
    };

    // const decodedPayload = decodeJwtToken(localStorage.getItem('jwt') || '');

   

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const decodedPayload = decodeJwtToken(localStorage.getItem('jwt') || '');
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // alert('hello')
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
        // console.log( BASE_URL,"baseurl<<<<<<<<");
        const decodedPayload = decodeJwtToken(localStorage.getItem('jwt') || '');
        
        try {
            const response = await axios.post(`${BASE_URL}/api/user/address/${decodedPayload.userId}`, address);
            // console.log(response.data);
    
          
            setAddress({
                fullName: '',
                addressLine1: '',
                addressLine2: '',
                city: '',
                state: '',
                postalCode: '',
                country: ''
            });
        } catch (error) {
            console.error('Error:', error); 
        }
    };


    return (
        <>
            <div className='w-full bg-[#060B27]  h-screen text-white'>
                <div className="container mx-auto py-[100px] w-[840px]">
                    <h1 className="text-2xl font-bold mb-8">Shipping Address</h1>
                    <form onSubmit={handleSubmit} className="space-y-4 ">
                        <div className='flex gap-5 '>
                            <div>
                                <label className="block mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={address.fullName}
                                    onChange={handleChange}
                                    className="w-[400px] border rounded-md text-black px-3 py-2" />
                            </div>
                            <div>
                                <label className="block mb-1">Address Line 1</label>
                                <input
                                    type="text"
                                    name="addressLine1"
                                    value={address.addressLine1}
                                    onChange={handleChange}
                                    className="w-[400px] border rounded-md px-3 text-black py-2" />
                            </div>
                        </div>
                        <div className='flex gap-5 '>
                            <div>
                                <label className="block mb-1">Address Line 2</label>
                                <input
                                    type="text"
                                    name="addressLine2"
                                    value={address.addressLine2}
                                    onChange={handleChange}
                                    className="w-[400px] border rounded-md px-3 text-black py-2" />
                            </div>
                            <div>
                                <label className="block mb-1">City</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={handleChange}
                                    className="w-[400px] border rounded-md px-3  text-black py-2" />
                            </div>
                        </div>

                        <div className='flex  gap-5'>
                            <div>
                                <label className="block mb-1">State</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    onChange={handleChange}
                                    className="w-[400px] border rounded-md px-3 text-black py-2" />
                            </div>
                            <div>
                                <label className="block mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={address.postalCode}
                                    onChange={handleChange}
                                    className="w-[400px] border rounded-md px-3 text-black py-2" />
                            </div>

                        </div>
                        <div className='flex gap-5 '>
                            <div>
                                <label className="block mb-1">Country</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={address.country}
                                    onChange={handleChange}
                                    className="w-[400px] border rounded-md px-3 text-black py-2" />
                            </div>
                            

                        </div>

                        <div className=''>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-36"
                            >
                                Buy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddressPage;
