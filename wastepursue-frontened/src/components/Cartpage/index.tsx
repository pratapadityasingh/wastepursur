"use client"
import axios from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Cart from '../../app/cart/page';

type ParamsType = {
    productId: string,
    // userId: string,

}
const Cartpage = (params: ParamsType) => {
    const [cartProducts, setCartProducts] = useState<string[]>([]);
    const [cartDetails, setCartDetails] = useState<string[]>([]);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const { pId }: any = useParams();
    // const { uId }: any = useParams();
    console.log(pId, "dfjddknvkfv");

    const decodeJwtToken = (token) => {
        try {
            // Split the token into its three parts: header, payload, signature
            const [headerEncoded, payloadEncoded] = token.split('.');

            // Check if the token has the required number of parts
            if (!headerEncoded || !payloadEncoded) {
                throw new Error('Invalid JWT token format: missing header or payload');
            }

            // Decode the payload part using base64 decoding
            const payloadDecoded = atob(payloadEncoded);

            // Parse the decoded payload string into a JavaScript object
            const payload = JSON.parse(payloadDecoded);

            return payload;
        } catch (error) {
            // Handle decoding errors
            console.error('Error decoding JWT token:', error.message);
            return null;
        }
    };









    const getProductById = async (pid: any) => {
        const decodedPayload = decodeJwtToken(localStorage.getItem('jwt') || '');

       
        try {
            // console.log(`${decodedPayload.userId}`,"jjknkjnjnkjnkk");yarn build

            const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

            const response = await axios.get(`${BASE_URL}/api/cart/getcart/${decodedPayload.userId}`);


            setCartDetails(response.data?.items);



        } catch (error) {
            console.error('Error fetching product by ID:', error);
            return null;
        }
    };





    useEffect(() => {
        const fetchCartProducts = async () => {
            if (pId && pId.length > 0) {
                const productDetails = await Promise.all(pId.map(pid => getProductById(pid)));
                setCartProducts(productDetails.filter(product => product !== null));
            } else {
                setCartProducts([]);
            }
        };
        fetchCartProducts();
    }, [pId]);

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
        if (window?.location.href.includes('success')) {
            setIsSuccess(true);
        }
    }, []);

    useEffect(() => {
        const decodedPayload = decodeJwtToken(localStorage.getItem('jwt') || '');
        if (pId && decodedPayload?.userId) {
            console.log("jgyftdrsreaeawe");
            // getProductById(pId)
            // addToCart();
        }
    }, [pId])

    return (
        <div className="container mx-auto py-8 pt-[100px]">

        </div>
    );
};

export default Cartpage;
