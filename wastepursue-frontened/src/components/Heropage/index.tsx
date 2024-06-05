"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Contact from '../Contactpage';
import Aboutus from '../Aboutus';

const Heropage = () => {
    const [products, setProducts] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
                const response = await fetch(`${BASE_URL}/api/products/getproduct`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchQuery(e.target.value);
    };

    const filteredProducts = products.filter((product:any) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <section className="text-gray-600 body-font w-full bg-[#060b27] max-h-max bg-hero">
                <div className="container px-4 md:px-[100px] py-12 md:py-24">
                    <div className="flex justify-center w-full md:w-auto lg:mb-6 mb-3 md:mb-0 fixed lg:mt-0 mt-[80px] mobile_header  md:px-0 ">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            placeholder="Search by product name"
                            className="border px-3 py-2 w-[250px] md:w-[400px]  rounded-2xl z-20"
                        />
                    </div>
                    <div className="flex flex-wrap justify-start w-full lg:mt-[100px] mt-[100px] md:mt-[100px] px-5   lg:px-0">
                        {filteredProducts.map((product:any) => (
                            <div key={product._id} className="w-full sm:w-1/2 md:w-[300px] xl:w-[280px] lg:mb-6 mb-8 md:mr-12 cursor-pointer box_shadow  px-2">
                                <div className="bg-transparent p-5 h-full bg-card">
                                    <Link href={`/product/${product._id}`} passHref>
                                        <Image
                                            className="h-40 w-full object-cover object-center rounded-lg text-black font-bold mb-3"
                                            src={product.url}
                                            alt={product.name}
                                            width={600}
                                            height={500}
                                        />
                                        <div className='text-white font-sans'>
                                            <h2 className="title-font font-bold border-b p-1 border-black">Type: {product.name}</h2>
                                            <h3 className="tracking-widest font-bold border-b p-1 border-black title-font">Category: {product.category}</h3>
                                            <p className="leading-relaxed border-b p-1 border-black font-bold">Description: {product.description}</p>
                                            <p className="text-sm border-b p-1 border-black font-bold">Available Quantity: {product.quantity}</p>
                                            <p className="text-lg border-b p-1 border-black mb-2">Price: ${product.price}</p>
                                            <div className='flex justify-between'>
                                                <button className="bg-[#cfff13] text-black font-bold py-2 px-4 rounded">Product Details</button>
                                                <button className="bg-[#cfff13] text-black font-bold py-2 px-2 rounded">Buy</button>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Aboutus />
                <Contact />
            </section>


        </>

    );
};

export default Heropage;
