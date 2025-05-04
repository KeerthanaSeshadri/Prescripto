import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext)

  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6FFF] rounded-l-lg' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6FFF] rounded-l-lg' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" />
            <p className='hidden md:block'>Appointments</p>
          </NavLink>

          <NavLink
            to="/all-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6FFF] rounded-l-lg' : ''
              }`
            }
          >
            <img src={assets.add_icon} alt="Add Doctor" />
            <p className='hidden md:block'>Add Doctors</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6FFF] rounded-l-lg' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt="Doctors List" />
            <p className='hidden md:block'>Doctors List</p>
          </NavLink>
        </ul>
      )}

{dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6FFF] rounded-l-lg' : ''
              }`
            }
          >
            <img src={assets.home_icon} alt="Dashboard" />
            <p className='hidden md:block'>Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6FFF] rounded-l-lg' : ''
              }`
            }
          >
            <img src={assets.appointment_icon} alt="Appointments" />
            <p className='hidden md:block'  >Appointments</p>
          </NavLink>

  
          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${
                isActive ? 'bg-[#f2f3ff] border-r-4 border-[#5f6FFF] rounded-l-lg' : ''
              }`
            }
          >
            <img src={assets.people_icon} alt="Doctors List" />
            <p className='hidden md:block'>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
