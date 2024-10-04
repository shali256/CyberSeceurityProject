import React from 'react';
import logo from '../../assets/logosamurdhi.jpeg';
import insta_icon from '../../assets/instagram_icon.png';
import pinterst_icon from '../../assets/pintester_icon.png';
import whatsapp_icon from '../../assets/whatsapp_icon.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='flex flex-col items-center gap-12 mt-8'>
      {/* Logo and Title */}
      <div className="flex flex-col items-center gap-3">
        <img src={logo} alt="Footer Logo" className="h-16" />
        <p className="text-gray-800 text-4xl font-bold">Koggala Samurdhi Bank</p>
      </div>

      {/* About Us and Social Media */}
      <div className="flex flex-col md:flex-row justify-between w-full max-w-6xl px-6 gap-12">
        {/* About Us Section */}
        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">About Us</h3>
          <p className="text-lg text-gray-700 text-justify">
            Koggala Samurdhi Bank is a dedicated microfinance institution based in Sri Lanka, committed to empowering low-income communities by providing accessible financial services. Our mission is to improve the financial well-being of underprivileged groups, fostering economic stability and growth. With a focus on integrity and transparency, we provide a range of financial solutions that address the unique needs of individuals and small businesses.
          </p>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col items-center md:w-1/2">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Follow Us</h3>
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
        </div>
      </div>

      {/* Divider and Copyright Section */}
      <div className="flex flex-col items-center gap-6 w-full mb-8 text-gray-900 text-lg">
        <hr className="w-4/5 border-none rounded-full h-1 bg-gray-300" />
        <p>© 2015 Koggala Samurdhi Bank.</p>
      </div>
    </footer>
  );
};

export default Footer;
