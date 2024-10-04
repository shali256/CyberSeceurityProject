import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import Navbar from '../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";
import { useState } from "react";
import ProfileUpdateModal from "./ProfileUpdateModal";

const DashboardPage = () => {
	const { user, logout } = useAuthStore();
	const [isModalOpen, setModalOpen] = useState(false);

	const handleLogout = () => {
		logout();
	};

	const refreshPage = () => {
		window.location.reload();
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col">
			<Navbar />
			<motion.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.5 }}
				className="max-w-lg w-full mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl border border-gray-300 flex-grow"
			>
				<h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
					Profile Dashboard
				</h2>

				<div className='space-y-6'>
					<motion.div
						className='p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-md'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
					>
						<h3 className='text-2xl font-semibold text-green-600 mb-4'>Profile Information</h3>
						<div className="flex items-center space-x-4 mb-4">
							<img src={user.profilePhoto} alt="" className='w-32 h-32 rounded-full border-2 border-green-500 shadow-lg' />
							<div>
								<p className='text-lg font-medium text-gray-800'>Name: {user.firstname} {user.lastname}</p>
								<p className='text-gray-600'>Email: {user.email}</p>
								<p className='text-gray-600'>Mobile: {user.mobile}</p>
								<p className='text-gray-600'>Address: {user.address}</p>
							</div>
						</div>
						<ProfileUpdateModal isOpen={isModalOpen} onClose={() => { setModalOpen(false); refreshPage(); }} />
					</motion.div>

					<motion.div
						className='p-6 bg-gray-50 rounded-lg border border-gray-200 shadow-md'
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
					>
						<h3 className='text-2xl font-semibold text-green-600 mb-4'>Account Activity</h3>
						<p className='text-gray-600'>
							<span className='font-bold'>Joined: </span>
							{new Date(user.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</p>
						<p className='text-gray-600'>
							<span className='font-bold'>Last Login: </span>
							{formatDate(user.lastLogin)}
						</p>
					</motion.div>
				</div>

				<div className="mt-8">
					<motion.button
						onClick={() => setModalOpen(true)}
						className="w-full py-3 mb-4 bg-gradient-to-r from-green-400 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-500 hover:to-emerald-700 transition duration-200"
					>
						Update Profile
					</motion.button>
					<motion.button
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
						onClick={handleLogout}
						className='w-full py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600 transition duration-200'
					>
						Logout
					</motion.button>
				</div>
			</motion.div>
			<Footer />
		</div>
	);
};

export default DashboardPage;
