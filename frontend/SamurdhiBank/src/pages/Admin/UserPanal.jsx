// AdminPanel.jsx
import React, { useState } from "react";
import AdminUsersTable from "./AdminUserTable";
import AddEmployeeModal from "./AddEmployeeModal";
import Sidebar from "./Sidebar";

const UserPanal = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    
	const refreshPage = () => {
		window.location.reload();
	};

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />
            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-100">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
                    <button
                        className="bg-green-500 text-white px-4 py-2 mb-4 rounded-md"
                        onClick={openModal}
                    >
                        Add New Employee
                    </button>
                    <AdminUsersTable />
                    <AddEmployeeModal isOpen={isModalOpen} onClose={closeModal} />
                </div>
            </div>
            </div>
    );
};

export default UserPanal;
