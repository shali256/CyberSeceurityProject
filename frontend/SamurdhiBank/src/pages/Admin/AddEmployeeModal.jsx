// AddEmployeeModal.jsx
import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";

const AddEmployeeModal = ({ isOpen, onClose, onEmployeeAdded }) => {
    const [formData, setFormData] = useState({
        empid: "",
        email: "",
        password: "",
        name: "",
        firstname: "",
        lastname: "",
        mobile: "",
        address: "",
    });
    const { adminadd } = useAuthStore();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await adminadd(formData.empid, formData.email, formData.password, formData.name, formData.firstname, formData.lastname, formData.mobile, formData.address);
            onEmployeeAdded(); 
            onClose();
        } catch (error) {
            console.error("Error adding employee:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md w-96">
                <h2 className="text-xl font-bold mb-4">Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="w-full border mb-2 p-2"
                        name="empid"
                        placeholder="Employee ID"
                        value={formData.empid}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full border mb-2 p-2"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full border mb-2 p-2"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <input
                        className="w-full border mb-2 p-2"
                        name="name"
                        placeholder="Username"
                        value={formData.name}
                        onChange={handleChange}
                    />
                     <input
                        className="w-full border mb-2 p-2"
                        name="firstname"
                        placeholder="First Name"
                        value={formData.firstname}
                        onChange={handleChange}
                    />
                     <input
                        className="w-full border mb-2 p-2"
                        name="lastname"
                        placeholder="Last Name"
                        value={formData.lastname}
                        onChange={handleChange}
                    />
                     <input
                        className="w-full border mb-2 p-2"
                        name="mobile"
                        placeholder="Mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                    />
                     <input
                        className="w-full border mb-2 p-2"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Add Employee
                    </button>
                    <button type="button" onClick={onClose} className="ml-2 text-gray-500">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
