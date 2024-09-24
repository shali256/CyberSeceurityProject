import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className='min-h-screen bg-transparent flex items-center justify-center relative overflow-hidden'>
			{/* Spinner with Colors Matching the Image Theme */}
			<motion.div
				className='w-16 h-16 border-4 border-t-4 border-t-red-600 border-yellow-500 rounded-full'
				animate={{ rotate: 360 }}
				transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

export default LoadingSpinner;
