

"use client"
import { useRouter } from 'next/navigation'; // Import useRouter
import React, { useState } from 'react';

// interface ProductFormProps {
//   onSubmit: () => void;
// }
interface FormData {
  name: string;
  category: string;
  price: string;
  image: File | null;
  description: string;
  quantity: string;
}

const ProductForm = () => {
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
        router.push('/home'); 
        alert("added successfully")
      } else {
        console.error('Failed to upload product');
      }
    } catch (error) {
      console.error('Error uploading product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto pt-[100px]">
      <div className="mb-4">
        <label className="block mb-2" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="category">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="image">
          Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          className="border px-3 py-2 w-full"
          accept="image/*"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="quantity">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border px-3 py-2 w-full"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
