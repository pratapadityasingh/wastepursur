import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-cover bg-bottom footer_bg py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between text-center lg:text-left">
                    <div className="mb-4 w-full lg:w-auto">
                        <h3 className="font-bold text-white text-2xl">Contacts</h3>
                        <p className="text-white">wastepursue@gmail.com</p>
                    </div>
                    <div className="mb-4 w-full lg:w-auto">
                        <h3 className="font-bold text-white text-2xl">Indore Office</h3>
                        <p className="text-white">1259 Coffeen Avenue STE 388589, Shridan, Wy, 82801</p>
                    </div>
                    <div className="mb-4 w-full lg:w-auto">
                        <h3 className="font-bold text-white text-2xl">Rau Office</h3>
                        <p className="text-white">Al. Arunwaldzka 56, 80-241, Sssfs, India</p>
                    </div>
                </div>
                <div className="border-t-2 border-white my-4"></div>
                <div className="flex flex-wrap justify-between items-center text-center lg:text-left">
                    <div className="flex justify-center lg:justify-start w-full lg:w-auto mb-4 lg:mb-0">
                        <FaFacebookF className="text-white text-2xl mr-3" />
                        <FaInstagram className="text-white text-2xl mr-3" />
                        <FaTwitter className="text-white text-2xl mr-3" />
                    </div>
                    <div className="flex justify-center lg:justify-start w-full lg:w-auto mb-4 lg:mb-0">
                        <a href="/" className="text-white hover:underline mr-4">Privacy Policy</a>
                        <a href="/" className="text-white hover:underline">Terms and Condition</a>
                    </div>
                    <p className="text-white w-full lg:w-auto">&copy; 2024 All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
