"use client";
import React, { useState, FormEvent } from 'react';
import Image from 'next/image';
import contactimg from "../../../public/contactusimg.webp";

const Contact = () => {
    const [firstname, setFirstname] = useState<string>('');
    const [lastname, setLastname] = useState<string>('');

    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<String>('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        const formData = {
            firstname,
            lastname,
            email,
            phone,
            message,
        };
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

        try {
            const response = await fetch(`${BASE_URL}/api/form/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSuccessMessage('Your message has been sent successfully!');
                setFirstname('');
                setLastname('');
                setEmail('');
                setPhone('');
                setMessage('');
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setErrorMessage('Network error. Please try again.');
        }
    };

    return (
        <section id='contact' className="lg:py-[50px] py-0 lg:bg-[#060B27] bg-[#cfff13] h-screen">
            <div className="container mx-auto px-5 z-40">
                <div className="contact_bg px-5">
                    <div className="py-5 Us">
                        <h2 className="text-[42px] font-black max-[767px]:text-4xl text-[#060B27] leading-[42px] my-5">
                            Contact with us!
                        </h2>
                        <p className="text-base font-normal text-[#060B27]">
                            Shoot us an email with your smart contract development request, and we will contact you within one business day.
                        </p>
                    </div>
                    <div className="flex flex-col min-[1280px]:flex-row items-center justify-between text-left">
                        <div className="min-[1280px]:w-[60%] w-full relative mt-5">
                            <form onSubmit={handleSubmit}>
                                <div className="min-[1280px]:flex min-[1280px]:items-center min-[1280px]:gap-4">
                                    <div className="lg:mb-4 mb-6">
                                        <input
                                            type="text"
                                            id="firstname"
                                            name="firstname"
                                            placeholder="Firstname"
                                            value={firstname}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            className="mt-1 px-3 block w-full md:w-[328px] h-[55px] text-[#000] border-[1px] border-[#070C26] bg-transparent border-solid outline-none focus:ring-0 placeholder-black"
                                            required
                                        />
                                    </div>

                                    <div className="lg:mb-4 mb-6">
                                        <input
                                            type="text"
                                            id="lastname"
                                            name="lastname"
                                            placeholder="Lastname"
                                            value={lastname}
                                            onChange={(e) => setLastname(e.target.value)}
                                            className="mt-1 px-3 block w-full md:w-[328px] h-[55px] text-[#000] border-[1px] border-[#070C26] bg-transparent border-solid outline-none focus:ring-0 placeholder-black"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="min-[1280px]:flex min-[1280px]:items-center min-[1280px]:gap-4">
                                    <div className="lg:mb-4 mb-6">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="mt-1 px-3 block w-full md:w-[328px] h-[55px] text-[#000] border-[1px] border-[#070C26] bg-transparent border-solid outline-none focus:ring-0 placeholder-black"
                                            required
                                        />
                                    </div>
                                    <div className="lg:mb-4 mb-6">
                                        <input
                                            type="number"
                                            id="phone"
                                            name="phone"
                                            placeholder="Phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="mt-1 px-3 block w-full md:w-[328px] h-[55px] text-[#000] border-[1px] border-[#070C26] bg-transparent border-solid outline-none focus:ring-0 placeholder-black"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="lg:mb-4 mb-6">
                                    <textarea
                                        id="message"
                                        name="message"
                                        placeholder="Message"
                                        className="mt-1 py-3 px-3 w-full md:w-[673px] h-[106px] text-[#000] border-[1px] border-[#070C26] bg-transparent border-solid outline-none focus:ring-0 placeholder-black"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />
                                </div>
                                {errorMessage && (
                                    <div className="text-red-500 mb-4">{errorMessage}</div>
                                )}
                                {successMessage && (
                                    <div className="text-green-500 mb-4">{successMessage}</div>
                                )}
                                <div className="lg:mt-3 mt-5 text-center md:text-left md:my-4">
                                    <button type="submit" className="inline-flex text-base max-[350px]:text-sm font-normal btn-dark bg-[#060B27] text-[#fff] py-[8px] max-[321px]:px-2 px-[20px] rounded-full">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="min-[1280px]:w-[38%] w-full relative mt-2">
                            <div className="min-[1280px]:absolute min-[1280px]:bottom-[-300px] contact_image">
                                <Image className='rounded-full' src={contactimg} alt="Contact Us Image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Contact;
