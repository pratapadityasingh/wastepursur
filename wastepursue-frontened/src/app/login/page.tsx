"use client"

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showOtpInput, setShowOtpInput] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
            const apiUrl = `${BASE_URL}/api/user/login`;
            const response = await axios.post(apiUrl, { email, password }, { withCredentials: true });

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            
            const otpApiUrl = `${BASE_URL}/api/otp/send-otp`;
            const otpResponse = await axios.post(otpApiUrl, { email }, { withCredentials: true });

            if (!otpResponse?.data?.success) {
                throw new Error(otpResponse?.data?.message);
            }

            setShowOtpInput(true);

            const token = response.data.token;
            localStorage.setItem('jwt', token);
            console.log('Login successful, token stored in localStorage');
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.message);
        }
    };

    const handleOtpSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
            const apiUrl = `${BASE_URL}/api/otp/verify-otp`;
            const response = await axios.post(apiUrl, { email, otp }, { withCredentials: true });

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            router.push('/home');
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError(error.message);
        }
    };

    return (
        <>
            <div className='container mx-auto'>
                <div className='flex lg:flex-row flex-col bg-[#060b27] lg:px-[100px]  lg:py-[200px] pt-[100px] pb-[50px] px-[30px] backgr justify-evenly '>
                    <div className="lg:w-[60%]  w-full" >
                        <div className="row root  boybg">
                            <div className="w-full text-white font-black text-5xl ">
                                <h2>Sell your recyclables
                                    online with <span> WASTE PURSUE!</span></h2>
                                <p className=' text-lg font-medium py-2 '>Paper - Plastics - Metals - Appliances</p>
                            </div>
                            <div className="dustbin lg:w-[90%] w-full">
                                <p className=' text-lg  py-2 text-white '>Be a recycler, be a saver
                                    Today, recycle for a better tomorrow.
                                    Reduce wasting natural resources
                                    Reuse, recycle, and reduce the waste for a better future
                                    Increase greenery by recycling waste
                                    Save earth by reusing, recycling waste
                                    Waste isn’t waste until we waste
                                    Recycle your trash or trash your earth
                                    Think before your trash</p>
                                <Image src="" width="200" alt="" />
                            </div>

                        </div>
                    </div>
                    <div className="lg:w-[40%] w-full  flex justify-end lg:pt-0 pt-5">
                        <div className="max-w-md  bg-transparent  rounded-lg shadow-md w-[400px] box_shadow p-8">
                            <h1 className="text-4xl  text-center font-black mb-6 text-white">Login</h1>
                            <form
                                onSubmit={showOtpInput ? handleOtpSubmit : handleSubmit}
                                className="space-y-4 "
                            >
                                <div className="flex flex-col mb-4">
                                    <label className="mb-1 text-white text-lg" htmlFor="email">
                                        Email:
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="px-3 py-2 rounded border focus:outline-none text-black focus:border-blue-400"
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="mb-1 text-white text-lg" htmlFor="password">
                                        Password:
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="px-3 py-2 rounded border focus:outline-none text-black focus:border-blue-400"
                                    />
                                </div>

                                {showOtpInput && (
                                    <div className="flex flex-col mb-4">
                                        <label className="mb-1 text-white text-lg" htmlFor="otp">
                                            OTP:
                                        </label>
                                        <input
                                            id="otp"
                                            type="number"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            required
                                            className="px-3 py-2 rounded border focus:outline-none text-black focus:border-blue-400"
                                        />
                                    </div>
                                )}

                                {error && <div className="text-red-500 mb-4">{error}</div>}
                                <button
                                    type="submit"
                                    className="w-full bg-[#cfff13] text-black py-2 rounded "
                                >
                                    {showOtpInput ? "Verify OTP" : "Login"}
                                </button>

                                <div className="text-center mt-4 text-white text-lg  ">
                                    Already have an account?
                                    <Link href="/register" className="text-[#cfff13] hover:underline ml-2">
                                        Register Now
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </>







    );
};

export default Login;