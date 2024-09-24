import React from 'react';
import footer_logo from '../../assets/firelogo_big.png';
import insta_icon from '../../assets/instagram_icon.png';
import pinterst_icon from '../../assets/pintester_icon.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='flex flex-col items-center gap-12 mt-8'>
      <div className="flex items-center gap-5">
        <img src={footer_logo} alt="Footer Logo" className="h-16" />
        <p className="text-gray-800 text-4xl font-bold">Koggala Samurdi Bank</p>
      </div>
      <ul className="flex gap-12 text-gray-900 text-lg">
        <li><Link to="#" className="hover:text-gray-700">Services</Link></li>
        <li><Link to="#" className="hover:text-gray-700">About Us</Link></li>
        <li><Link to="#" className="hover:text-gray-700">Complain</Link></li>
      </ul>
      <div className="flex gap-5">
        <div className="p-3 bg-gray-100 border border-gray-200 rounded-full">
          <a href="https://www.instagram.com">
            <img src={insta_icon} alt="Instagram" className="h-10 w-10" />
          </a>
        </div>
        <div className="p-3 bg-gray-100 border border-gray-200 rounded-full">
          <a href="https://www.pinterest.com">
            <img src={pinterst_icon} alt="Pinterest" className="h-10 w-10" />
          </a>
        </div>
        <div className="p-3 bg-gray-100 border border-gray-200 rounded-full">
          <a href="#">
            <img src={whatsapp_icon} alt="WhatsApp" className="h-10 w-10" />
          </a>
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 w-full mb-8 text-gray-900 text-lg">
        <hr className="w-4/5 border-none rounded-full h-1 bg-gray-300" />
        <p>© 2015 Rajarata Fire Service (PVT) Ltd. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
