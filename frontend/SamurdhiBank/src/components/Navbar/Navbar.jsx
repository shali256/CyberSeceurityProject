import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore'; // Import the useAuthStore
import logo from '../../assets/logosamurdhi.jpeg';


const Navbar = () => {
    const { user } = useAuthStore();
    const [menu, setMenu] = useState("home");
    const location = useLocation();
    const { logout, isLoading } = useAuthStore(); // Get the logout function from useAuthStore

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setMenu('home');
                break;
            case '/policies':
                setMenu('policies');
                break;
            case '/support':
                setMenu('support');
                break;
            case '/quiz':
                setMenu('quiz');
                break;
            default:
                setMenu('home');
        }
    }, [location.pathname]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <div className="flex justify-between items-center p-6 shadow-md bg-white">
            <div className="flex items-center gap-4">
                <img src={logo} alt="Logo" className="h-12" />
                <p className="text-3xl font-bold text-gray-800">Koggala Samurdi Bank</p>
            </div>
            <ul className="flex items-center space-x-12 text-gray-600 text-lg font-medium">
                <li onClick={() => setMenu("home")}>
                    <Link 
                        to='/' 
                        className={`no-underline ${menu === "home" ? 'text-black border-b-4 border-red-500' : 'text-gray-500'}`}
                    >
                        Home
                    </Link>
                </li>
                <li onClick={() => setMenu("policies")}>
                    <Link 
                        to='/policies' 
                        className={`no-underline ${menu === "policies" ? 'text-black border-b-4 border-red-500' : 'text-gray-500'}`}
                    >
                        Policies
                    </Link>
                </li>
                <li onClick={() => setMenu("quiz")}>
                    <Link 
                        to='/quiz' 
                        className={`no-underline ${menu === "quiz" ? 'text-black border-b-4 border-red-500' : 'text-gray-500'}`}
                    >
                        Quiz
                    </Link>
                </li>
                <li onClick={() => setMenu("support")}>
                    <Link 
                        to='/support' 
                        className={`no-underline ${menu === "support" ? 'text-black border-b-4 border-red-500' : 'text-gray-500'}`}
                    >
                        Support
                    </Link>
                </li>

            </ul>
            <div className="flex items-center space-x-6">
                <button 
                    onClick={handleLogout} 
                    disabled={isLoading}
                    className={`w-40 h-14 border border-gray-400 rounded-full text-gray-600 text-lg font-medium bg-white hover:bg-gray-100 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    {isLoading ? 'Logging out...' : 'Logout'}
                </button>
                <Link to='/profile'>
                    <img src={user.profilePhoto} alt="" className="w-14 h-14 rounded-full border-2 border-green-500 shadow-lg" />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
