import React from 'react'
import { BiBookAlt, BiHome, BiSolidUserDetail, BiLogOut, BiSolidSpreadsheet } from 'react-icons/bi';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
    const { logout } = useAuthStore();

    const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error(error);
      }
    };
  return (
    <div className='flex flex-col w-64 gap-10 h-[94vh]'>
        <div className="text-center p-5 text-[#27374d] flex items-center gap-5">
            <BiBookAlt className='text-xl' />
            <h2 className='font-semibold text-lg'>Samurdhi Bank</h2>
        </div>

        <div className="flex flex-col gap-5">
            <a href='/admin-panel' className='flex items-center gap-5 text-lg font-semibold text-[#27374d] hover:bg-[#27374d] hover:text-[#dde6ed] transition ease-in-out duration-300 p-2 rounded-md'>
            <BiHome className='text-lg' />
                Dashboard
            </a>
        </div>

        <div className="flex flex-col gap-5">
            <a href='/employee' className='flex items-center gap-5 text-lg font-semibold text-[#27374d] hover:bg-[#27374d] hover:text-[#dde6ed] transition ease-in-out duration-300 p-2 rounded-md'>
            <BiSolidUserDetail className='text-lg'/> Employees
            </a>
        </div>

        <div className="flex flex-col gap-5">
            <a href='/questionanswers' className='flex items-center gap-5 text-lg font-semibold text-[#27374d] hover:bg-[#27374d] hover:text-[#dde6ed] transition ease-in-out duration-300 p-2 rounded-md'>
            <BiSolidSpreadsheet className='text-lg'/>
                Quiz & Answers
            </a>
        </div>

        <div className="flex flex-col gap-5">
            <a href='/contactdashboard' className='flex items-center gap-5 text-lg font-semibold text-[#27374d] hover:bg-[#27374d] hover:text-[#dde6ed] transition ease-in-out duration-300 p-2 rounded-md'>
            <BiSolidSpreadsheet className='text-lg'/>
                Support Service
            </a>
        </div>
            <div className="mt-auto flex items-center gap-5 p-5 text-[#27374d] cursor-pointer hover:bg-[#27374d] hover:text-[#dde6ed] transition ease-in-out duration-300 rounded-md" onClick={handleLogout}>
            <BiLogOut className='text-lg' />
            <span className='font-semibold text-lg'>Logout</span>
      </div>
      
    </div>
  )
}

export default Sidebar
