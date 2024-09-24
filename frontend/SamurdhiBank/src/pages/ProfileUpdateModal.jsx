import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useAuthStore } from "../store/authStore";
import Resizer from 'react-image-file-resizer';

const ProfileUpdateModal = ({ isOpen, onClose }) => {
    const { user, updateUser } = useAuthStore();
    const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto || '');

    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            Resizer.imageFileResizer(
                file,
                300, // max width
                300, // max height
                'JPEG', // output type
                100, // quality
                0, // rotation
                (uri) => {
                    setProfilePhoto(uri); // Set Base64 string
                },
                'base64' // output type for Base64
            );
        }
    };

    const handleSubmit = async (values) => {
        await updateUser(user._id, { ...values, profilePhoto });
        onClose(); // Close the modal after successful update
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <button 
                    onClick={onClose} 
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Update Profile</h2>
                <Formik
                    initialValues={{
                        firstname: user.firstname || '',
                        lastname: user.lastname || '',
                        mobile: user.mobile || '',
                        email: user.email || '',
                        address: user.address || '',
                    }}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Profile Photo</label>
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    onChange={handleFileChange} 
                                    className="border border-gray-300 rounded-md p-2 w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Firstname</label>
                                <Field name="firstname" type="text" className="border border-gray-300 rounded-md p-2 w-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Lastname</label>
                                <Field name="lastname" type="text" className="border border-gray-300 rounded-md p-2 w-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Mobile</label>
                                <Field name="mobile" type="text" className="border border-gray-300 rounded-md p-2 w-full" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <Field name="email" type="email" disabled className="border border-gray-300 rounded-md p-2 w-full bg-gray-200" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Address</label>
                                <Field name="address" type="text" className="border border-gray-300 rounded-md p-2 w-full" />
                            </div>
                            <div className="flex justify-between">
                            <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className={`w-full py-2 text-white bg-gradient-to-r from-green-400 to-emerald-600 rounded-md shadow hover:from-green-500 hover:to-emerald-700 transition duration-200 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    Update Profile
                                </button>
                                <button 
                                    type="button" 
                                    onClick={onClose} 
                                    className="w-full py-2 text-gray-700 border border-gray-300 rounded-md shadow hover:bg-gray-100 transition duration-200"
                                >
                                    Cancel
                                </button>
                              
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ProfileUpdateModal;
