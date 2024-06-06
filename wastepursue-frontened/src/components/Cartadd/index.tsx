"use client";
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { log } from 'console';


interface CardData {
    totalQuantity: any;
    product: any;
    name: string;

    price: string;
    url: string;
    description: string;

}

const Cartpage = () => {
    const { pId }: any = useParams();
    const [cartDetails, setCartDetails] = useState<CardData[]>([]);
    const [totPrice, setTotPrice] = useState<number>(0);
    const [editMode, setEditMode] = useState<boolean | null>(null);
    const [newQuantity, setNewQuantity] = useState<number>(1);

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


    const getProductById = async () => {
        const decodedPayload = decodeJwtToken(localStorage.getItem('jwt') || '');
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        try {
            const response = await axios.get(`${BASE_URL}/api/cart/getcart/${decodedPayload.userId}`);
            localStorage.setItem('count', response?.data.length);
            setCartDetails(response.data);
        } catch (error) {
            console.error('Error fetching product by ID:', error);
        }
    };

    useEffect(() => {
        getProductById();
    }, []);

    useEffect(() => {
        const prices = cartDetails.map((product) => product.product?.price * product.totalQuantity);
        const total = prices.reduce((acc, curr) => acc + curr, 0);
        setTotPrice(total);
    }, [cartDetails]);

    const handleBuyClick = (productId) => {
        console.log(`Buy button clicked for product with ID ${productId}`);
    };

    const handleDeleteClick = async (productId: any) => {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
        const decodedPayload = decodeJwtToken(localStorage.getItem('jwt') || '');

        try {
            await axios.delete(`${BASE_URL}/api/cart/cart/${decodedPayload.userId}/${productId}`);
            setCartDetails(cartDetails.filter(product => product.product._id !== productId));
        } catch (error) {
            console.error('Error deleting product from cart:', error);
        }
    };

    const handleEditClick = (productId) => {
        setEditMode(productId);
        const product = cartDetails.find(product => product.product?._id === productId);
        setNewQuantity(product ? product.totalQuantity : 1);
    };

    const handleUpdateClick = async (productId) => {
        if (newQuantity < 1) {
            alert('Quantity must be at least 1');
            return;
        }
        try {
            const decodedPayload = decodeJwtToken(localStorage.getItem('jwt') || '');

            const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
            await axios.put(`${BASE_URL}/api/cart/cart/${decodedPayload.userId}/${productId}`, {
                quantity: newQuantity
            });
            setCartDetails(cartDetails.map(product => {
                if (product.product._id === productId) {
                    product.totalQuantity = newQuantity;
                }
                return product;
            }));
            setEditMode(null);
        } catch (error) {
            console.error('Error updating product quantity:', error);
        }
    };

    return (
        <>
            <section className='py-8 pt-[100px] min-h-screen w-full lg:flex lg:justify-center overflow-x-auto bg-[#060B27] max-w-full'>
                <div className="  ">
                    <div className="flex flex-col  justify-center lg:w-full  p-5 ">
                        <h1 className="text-2xl font-bold mb-4 text-left sticky text-white">Cart</h1>
                        <div>
                            {cartDetails.length > 0 ? (
                                <div className="  text-white">
                                    <div className="overflow-x-auto">
                                        <table className="border border-white rounded-lg lg:w-full min-w-max">
                                            <thead>
                                                <tr>
                                                    <th className="pl-5 py-5 text-left">Image</th>
                                                    <th className="px-2 py-2  text-left">Name</th>
                                                    <th className="px-2 py-2  text-left">Description</th>
                                                    <th className="px-2 py-2  text-left">Price</th>
                                                    <th className="px-2 py-2  text-left">Quantity</th>
                                                    <th className="px-2 py-2  text-left">Total</th>
                                                    <th className="px-2 py-2  text-left">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartDetails.map((product: CardData) => (
                                                    <tr key={product.product?._id} className="border-t border-gray-200">
                                                        <td className="py-2 pl-5 text-left flex justify-start">
                                                            <img
                                                                src={product.product?.url}
                                                                alt={product.product?.name}
                                                                className="h-16 w-18 object-cover rounded"
                                                            />
                                                        </td>
                                                        <td className="px-2  text-left py-2">{product.product?.name}</td>
                                                        <td className="px-2  text-left py-2">{product.product?.description}</td>
                                                        <td className="px-2 text-left py-2">${product.product?.price}</td>
                                                        <td className="px-2  text-left py-2">
                                                            {editMode === product.product?._id ? (
                                                                <input
                                                                    type="number"
                                                                    value={newQuantity}
                                                                    onChange={(e) => setNewQuantity(Math.max(1, Number(e.target.value)))}
                                                                    className="border rounded px-2 py-1 w-16"
                                                                />
                                                            ) : (
                                                                product.totalQuantity
                                                            )}
                                                        </td>
                                                        <td className="px-2  text-left py-2">${product.product?.price * product.totalQuantity}</td>
                                                        <td className="px-2 flex text-left py-2">
                                                            {editMode === product.product?._id ? (
                                                                <button
                                                                    onClick={() => handleUpdateClick(product.product?._id)}
                                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                                                                >
                                                                    Update
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleEditClick(product.product?._id)}
                                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-1 rounded"
                                                                >
                                                                    Edit
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDeleteClick(product.product?._id)}
                                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-1 rounded ml-2"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                                <tr className="border-t border-gray-600">
                                                    <td className="px-2 py-2"></td>
                                                    <td className="px-2 py-2"></td>
                                                    <td className="px-2 py-2 font-bold">Total:</td>
                                                    <td className="px-2 py-2 font-bold">${totPrice}</td>
                                                    <td className="px-2 py-2 gap-11">
                                                        <Link href="/address" passHref>
                                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ml-2">
                                                                Buy now
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            ) : (
                                <p className="mt-4 text-white">No products in the cart.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>



        </>
    );
};

export default Cartpage;









// useEffect(() => {
//     const getProductById = async () => {
//         if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
//             const token = localStorage.getItem('jwt') || '';
//             const decodedPayload = decodeJwtToken(token);

//             if (!decodedPayload) {
//                 console.error('Invalid JWT token');
//                 return;
//             }

//             const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
//             try {
//                 const response = await axios.get(`${BASE_URL}/api/cart/getcart/${decodedPayload.userId}`);
//                 localStorage.setItem('count', response?.data.length);
//                 setCartDetails(response.data);
//             } catch (error) {
//                 console.error('Error fetching product by ID:', error);
//             }
//         }
//     };

//     getProductById();
// }, []);