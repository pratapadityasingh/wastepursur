"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Createproduct {
    onSubmit: () => void;
}
interface FormData {
    name: string;
    category: string;
    price: string;
    image: File | null;
    description: string;
    quantity: string;
}

const Createproduct = ({ }) => {
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        name: '',
        category: '',
        price: '',
        image: null,
        description: '',
        quantity: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setFormData(prevState => ({
            ...prevState,
            image: file,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
            const response = await fetch(`${BASE_URL}/api/products/create`, {
                method: 'POST',
                body: formDataToSend,
            });
            if (response.ok) {

                setFormData({
                    name: '',
                    category: '',
                    price: '',
                    image: null,
                    description: '',
                    quantity: '',
                });
                router.push('/');
                alert("added successfully")
            } else {
                console.error('Failed to upload product');
            }
        } catch (error) {
            console.error('Error uploading product:', error);
        }
    };

    return (



        <div id='create' className='pt-[50px] bg-[#060b27] bg-hero'>
            <div className=' w-full  h-screen text-white'>
                <form onSubmit={handleSubmit} className=" lg:mx-auto pt-[50px] lg:pt-[50px]  lg:w-[800px] w-full lg:p-0 p-3">
                    <h1 className=' text-3xl  shadow-2xl lg:w-[500px] w-full lg:h-[50px] h-[100px]  uppercase font-bold mb-1  text-center rounded-2xl text-white  '>Create The Product Here </h1>
                    <div className='border border-white rounded-lg  lg:p-10 px-5 py-6'>
                        <div className='flex lg:flex-row flex-col  w-full gap-4   lg:justify-around justify-center  lg:items-center '>

                            <div className="lg:mb-4  mb-2 lg:w-[400px] w-full">
                                <label className="block mb-2 text-white font-bold" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border px-3 py-2 w-full text-black rounded-2xl"
                                    required
                                />
                            </div>
                            <div className="lg:mb-4  mb-2 lg:w-[400px] w-full">
                                <label className="block mb-2 text-white  font-bold" htmlFor="category">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="border px-3 py-2 w-full border-black text-black rounded-2xl"
                                    required
                                />
                            </div>
                        </div>
                        <div className='flex lg:flex-row flex-col w-full gap-4    lg:justify-around justify-center  lg:items-center '>
                            <div className="lg:mb-4  mb-2 lg:w-[400px] w-full">
                                <label className="block mb-2 text-white  font-bold" htmlFor="price">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="border px-3 py-2 w-full border-black  text-black rounded-2xl"
                                    required
                                />
                            </div>
                            <div className="mb-4 lg:w-[400px] w-full">
                                <label className="block mb-2 text-white  font-bold" htmlFor="image">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    onChange={handleImageChange}
                                    className="border px-3 py-2  border-white w-full rounded-2xl"
                                    accept="image/*"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-white  font-bold" htmlFor="description">
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="border px-3 py-2 border-black w-full text-black rounded-2xl"
                                required
                            />
                        </div>
                        <div className="lg:mb-4  mb-2">
                            <label className="block mb-2 text-white  font-bold" htmlFor="quantity">
                                Quantity
                            </label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="border border-black px-3 py-2 w-full text-black rounded-2xl"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Createproduct;