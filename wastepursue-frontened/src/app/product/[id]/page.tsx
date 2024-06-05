"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

const Product = () => {
    const [product, setProduct] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const { id } = useParams();
    const router = useRouter();

    const decodeJwtToken = (token: string) => {
        try {
            const [headerEncoded, payloadEncoded] = token.split('.');
            if (!headerEncoded || !payloadEncoded) throw new Error('Invalid JWT token format');

            const payloadDecoded = atob(payloadEncoded);
            return JSON.parse(payloadDecoded);
        } catch (error) {
            console.error('Error decoding JWT token:', error.message);
            return null;
        }
    };

    // const decodedPayload = decodeJwtToken(localStorage.getItem('jwt') || '');

    useEffect(() => {

        const fetchProduct = async () => {
            if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
                const token = localStorage.getItem('jwt') || '';
                const decodedPayload = decodeJwtToken(token);

                if (!decodedPayload) {
                    console.error('Invalid JWT token');
                    return;
                }
                try {
                    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
                    const response = await fetch(`${BASE_URL}/api/products/getbyidproduct/${id}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    setProduct(data);
                } catch (error) {
                    console.error('Error fetching product:', error);
                }
            };
            fetchProduct();
        }
    }, [id]);

    const addToCart = async () => {
        const decodedPayload = decodeJwtToken(localStorage.getItem('jwt') || '');
        if (!decodedPayload?.userId) {
            console.error('User ID not found in local storage.');
            return;
        }
        try {
            const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
            await axios.post(`${BASE_URL}/api/cart/addtocart/${decodedPayload.userId}/${product._id}`);
            setIsSuccess(true);
            router.push("/addcart");
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        product && (
            <section className="text-gray-600 body-font overflow-hidden bg-[#060b27]">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <Image
                            alt={product.name}
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src={product.url}
                            width={300}
                            height={200}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 className="text-3xl text-white title-font font-medium mb-1">{product.name}</h1>
                            <p className="leading-relaxed mb-4">{product.description}</p>


                            <div className="flex">
                                <span className="title-font font-medium text-2xl text-white">${product.price}</span>
                                <button
                                    onClick={addToCart}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 ml-3 rounded"
                                >
                                    Add to Cart
                                </button>
                                <Link href="/pay"
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 ml-3 rounded">
                                    Buy Now

                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    );
};

export default Product;
