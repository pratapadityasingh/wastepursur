"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

import StarRatings from 'react-star-ratings';

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



    // useEffect(() => {

    //     const fetchProduct = async () => {
    //         if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {

    //             const token = localStorage.getItem('jwt') || '';
    //             const decodedPayload = decodeJwtToken(token);

    //             if (!decodedPayload) {
    //                 console.error('Invalid JWT token');
    //                 return;
    //             }
    //             try {
    //                 const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    //                 const response = await fetch(`${BASE_URL}/api/products/getbyidproduct/${id}`);
    //                 if (!response.ok) throw new Error('Network response was not ok');
    //                 const data = await response.json();
    //                 setProduct(data);
    //             } catch (error) {
    //                 console.error('Error fetching product:', error);
    //             }
    //         };
    //         fetchProduct();
    //     }
    // }, [id]);
    useEffect(() => {
        const fetchPost = async () => {
            const decodedPayload = decodeJwtToken(localStorage.getItem('jwt') || '');
            try {
                const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
                const response = await fetch(`${BASE_URL}/api/products/getbyidproduct/${id}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data, 'data');

                setProduct(data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };


        fetchPost();

    }, []);

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
            <>
                <section>
                    <div className='lg:w-full flex justify-center h-screen bg-[#060B27] items-center pt-[100px]'>

                        <div className=" lg:w-[400px] border box_shadow flex justify-center p-5 rounded-3xl  ">
                            <div className=' rounded-lg'>
                                <Image
                                    alt={product.name}
                                    className="lg:w-[400px] w-full lg:h-auto h-64 object-cover object-center rounded"
                                    src={product.url}
                                    width={300}
                                    height={200}
                                />
                                <div className='gap-4 flex pt-2 items-center'>
                                    <p className='text-white text-base p-1  font-bold '>Rating : </p>
                                    <StarRatings

                                        starRatedColor="blue"
                                        starDimension="15px"
                                        starSpacing="5px"
                                        numberOfStars={5}
                                        name='rating'
                                    />
                                
                                </div>
                                <div className=" w-full     ">
                                    <h1 className=" text-white text-base p-1  font-bold ">Name :{product.name}</h1>
                                    <p className="leading-relaxed text-white text-base p-1  font-bold ">About :{product.description}</p>
                                    <span className="text-base p-1  font-bold  text-white">Price : ${product.price}</span>

                                    <div className="flex justify-between p-1">

                                        <button
                                            onClick={addToCart}
                                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4  rounded"
                                        >
                                            Add to Cart
                                        </button>
                                        <Link href="/pay"
                                            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4  rounded">
                                            Buy Now

                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>






                </section>
            </>
        )
    );
};

export default Product;
