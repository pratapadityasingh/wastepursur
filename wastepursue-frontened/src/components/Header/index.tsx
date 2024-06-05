"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '../../../public/logo.png'
import { useUserContext } from '../context';


 
const Header = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [cartCount, setCartCount] = useState<number>(0);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const { user, updateUser } = useUserContext();

    useEffect(() => {
        const storedCartCount = localStorage.getItem('cartCount');
        if (storedCartCount) {
            setCartCount(parseInt(storedCartCount));
        }
    }, []);
    const handlechangemenu=()=>{
        setIsMenuOpen(false);
    }

    const handleAuthLogout = () => {
        localStorage.removeItem('loggedIn');
        updateUser(null);
        localStorage.removeItem('jwt');
        router.push('/login');
    };

    return (
        <header className="text-white body-font fixed font-bold bg-transparent backdrop-blur z-10 w-full">
        <div className="container flex flex-wrap py-[20px] px-[20px] md:px-[100px] flex-col md:flex-row items-center justify-between">
            <div className="flex items-center justify-between w-full md:w-auto">
                <Link href="/" className="title-font font-medium text-gray-900 mb-4 md:mb-0">
                    <Image className='rounded-full' src={Logo} width="50" alt="Logo" />
                    {/* <span className="ml-3 text-xl text-white ">WASTE PURSUE</span> */}
                </Link>
                <button 
                    className="inline-flex items-center md:hidden text-white focus:outline-none" 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                        <path d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            <nav className={`md:ml-auto flex flex-col md:flex-row items-center text-base justify-center ${isMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-auto`}>
                <Link onClick={handlechangemenu} href="/" className="mr-5 hover:text-gray-500 py-2">HOME</Link>
                <Link onClick={handlechangemenu} href="#contact" className="mr-5 hover:text-gray-500 py-2">CONTACT</Link>
                <Link  onClick={handlechangemenu}href="/createproduct" className="mr-5 hover:text-gray-500 py-2">SELL</Link>
                {user ? (
                    <button
                        onClick= {() => {
                            handleAuthLogout();
                            handlechangemenu()
                        }}
                        className="inline-flex items-center text-black bg-[#cfff13] border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
                    >
                        LOGOUT
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                ) : (
                    <button
                        onClick={() => router.push('/login')}
                        className="inline-flex items-center bg-[#cfff13] text-black border-0 py-1 px-3 focus:outline-none rounded text-base mt-4 md:mt-0"
                    >
                        LOGIN
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                )}
            </nav>
        </div>
    </header>
    );
};

export default Header;
