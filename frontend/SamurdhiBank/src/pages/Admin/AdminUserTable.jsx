import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUsersTable = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isUpdating, setIsUpdating] = useState(false);
    const [formData, setFormData] = useState({
        empid: '',
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: '',
        address: '',
    });

    const { getAllUsers, updateUser, deleteUser, toggleUserBlock } = useAuthStore();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, [getAllUsers]);

    const handleBlockToggle = (user) => {
        const action = user.isBlocked ? 'unblock' : 'block';
        const confirmToggle = () => {
            toggleUserBlock(user._id)
                .then(() => {
                    setUsers((prev) => prev.map((u) => (u._id === user._id ? { ...u, isBlocked: !u.isBlocked } : u)));
                    toast.success(`User successfully ${action}ed.`, {
                        autoClose: 3000,
                    });
                })
                .catch((error) => {
                    console.error(`Error ${action}ing user:`, error);
                    toast.error(`Error ${action}ing user.`, {
                        autoClose: 3000,
                    });
                });
        };

        const toastId = toast(
            <div className="flex justify-between items-center p-4">
                <span>Are you sure you want to {action} this user?</span>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => {
                            confirmToggle();
                            toast.dismiss(toastId);
                        }} 
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Yes
                    </button>
                    <button 
                        onClick={() => toast.dismiss(toastId)} 
                        className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400">
                        No
                    </button>
                </div>
            </div>, 
            {
                autoClose: false,
                closeButton: false,
                position: "top-center",
                style: { width: '400px', fontSize: '16px' },
            }
        );
    };

    

    const validateFormData = () => {
        const empidRegex = /^[A-Z]\/\d{4}\/\d{2}$/; // Format: G/1236/12
        if (!empidRegex.test(formData.empid)) {
            toast.error("EmpID must be in the format G/1236/12.");
            return false;
        }
        if (!formData.email.includes('@')) {
            toast.error("Email must be valid.");
            return false;
        }
        if (formData.mobile.length < 10) {
            toast.error("Mobile number must be at least 10 digits.");
            return false;
        }
        return true;
    };

    const handleUpdateClick = (user) => {
        setSelectedUser(user);
        setFormData(user);
        setIsUpdating(true);
    };

    console.log(toast);
    const handleDeleteClick = (userId) => {
        const confirmDelete = () => {
            deleteUser(userId)
                .then(() => {
                    setUsers((prev) => prev.filter((user) => user._id !== userId));
                    toast.success("User deleted successfully.", {
                        autoClose: 3000, // Auto dismiss after 3 seconds
                    });
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                    toast.error("Error deleting user.", {
                        autoClose: 3000,
                    });
                });
        };
    
        const toastId = toast(
            <div className="flex justify-between items-center p-4">
                <span>Are you sure you want to delete this user?</span>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => {
                            confirmDelete();
                            toast.dismiss(toastId); // Dismiss the toast immediately
                        }} 
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        Yes
                    </button>
                    <button 
                        onClick={() => toast.dismiss(toastId)} 
                        className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400">
                        No
                    </button>
                </div>
            </div>, 
            {
                autoClose: false,
                closeButton: false,
                position: "top-center",
                style: { width: '400px', fontSize: '16px' }, // Increase width and font size
            }
        );
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!validateFormData()) return;

        try {
            const updatedUser = await updateUser(selectedUser._id, formData);
            setUsers((prev) => prev.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
            setIsUpdating(false);
            setSelectedUser(null);
            setFormData({
                empid: '',
                email: '',
                password: '',
                firstname: '',
                lastname: '',
                mobile: '',
                address: '',
            });
            toast.success("User updated successfully.");
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error("Error updating user.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 px-4 py-2">EmpID</th>
                        <th className="border border-gray-400 px-4 py-2">First Name</th>
                        <th className="border border-gray-400 px-4 py-2">Last Name</th>
                        <th className="border border-gray-400 px-4 py-2">Email</th>
                        <th className="border border-gray-400 px-4 py-2">Mobile</th>
                        <th className="border border-gray-400 px-4 py-2">Address</th>
                        <th className="border border-gray-400 px-4 py-2">Status</th>
                        <th className="border border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="bg-white">
                            <td className="border border-gray-400 px-4 py-2">{user.empid}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.firstname}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.lastname}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.mobile}</td>
                            <td className="border border-gray-400 px-4 py-2">{user.address}</td>
                            <td className="border border-gray-400 px-4 py-2">
                                <span className={user.isBlocked ? "text-red-500" : "text-green-500"}>
                                    {user.isBlocked ? "Blocked" : "Safe"}
                                </span>
                            </td>
                            <td className="border border-gray-400 px-4 py-2">
                                <button onClick={() => handleUpdateClick(user)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Update</button>
                                <button onClick={() => handleDeleteClick(user._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                                <button
                                    onClick={() => handleBlockToggle(user)}
                                    className={`ml-2 text-white px-5 py-1 rounded hover:bg-opacity-80 ${user.isBlocked ? 'bg-green-500' : 'bg-red-500'}`}
                                    style={{ width: '100px' }} 
                                >
                                    {user.isBlocked ? 'Unblock' : 'Block'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isUpdating && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-md w-1/3">
                        <h3 className="text-xl font-bold mb-2">Update User</h3>
                        <form onSubmit={handleUpdateSubmit} className="space-y-4">
                            <input type="text" name="empid" value={formData.empid} onChange={handleFormChange} placeholder="EmpID (G/1236/12)" required className="border border-gray-400 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"/>
                            <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" required className="border border-gray-400 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"/>
                            <input type="text" name="firstname" value={formData.firstname} onChange={handleFormChange} placeholder="First Name" required className="border border-gray-400 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"/>
                            <input type="text" name="lastname" value={formData.lastname} onChange={handleFormChange} placeholder="Last Name" required className="border border-gray-400 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"/>
                            <input type="text" name="mobile" value={formData.mobile} onChange={handleFormChange} placeholder="Mobile" required className="border border-gray-400 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"/>
                            <input type="text" name="address" value={formData.address} onChange={handleFormChange} placeholder="Address" required className="border border-gray-400 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"/>
                            <input type="password" name="password" onChange={handleFormChange} placeholder="New Password (optional)" className="border border-gray-400 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-400"/>

                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Update User</button>
                            <button type="button" onClick={() => setIsUpdating(false)} className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminUsersTable;
