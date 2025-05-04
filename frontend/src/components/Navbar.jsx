import React, { useState, useRef, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets' // Make sure this file has logo, profile_pic, dropdown_icon, menu_icon, cross_icon
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const {token,setToken,userData}=useContext(AppContext)
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [showMenu,setShowMenu]= useState(false)
  const logout =()=>{
    setToken(false)
    localStorage.removeItem('token')
  }

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="w-full px-4 md:px-10 flex items-center justify-between text-sm py-4 mb-5 border-b border-b-grey-400 bg-white z-50">
      <img
        onClick={() => navigate('/')}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Nav */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-primary" : ""}><li>HOME</li></NavLink>
        <NavLink to="/doctors" className={({ isActive }) => isActive ? "text-primary" : ""}><li>ALL DOCTORS</li></NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "text-primary" : ""}><li>ABOUT</li></NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary" : ""}><li>CONTACT</li></NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {/* Authenticated User */}
        {token && userData
         ? (
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img className="w-8 rounded-full" src={userData.image} alt="" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown icon" />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 pt-3 mt-1 w-48 bg-stone-100 rounded shadow z-20 text-base font-medium text-gray-700">
                <div className="flex flex-col gap-2 p-4">
                  <p onClick={() => { navigate('/my-profile'); setDropdownOpen(false); }} className="cursor-pointer hover:text-black">My Profile</p>
                  <p onClick={() => { navigate('/my-appointments'); setDropdownOpen(false); }} className="cursor-pointer hover:text-black">My Appointments</p>
                  <p onClick={logout} className="cursor-pointer text-red-600 hover:text-red-800">Logout</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer"
          >
            Create account
          </button>
        )}

        {/* Mobile menu icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* Mobile Slide-in Menu */}
        <div
          className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ease-in-out overflow-y-auto ${
            showMenu ? 'w-full' : 'w-0'
          }`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="Logo" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="Close"
            />
          </div>
          <ul className="flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/"><p>Home</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors"><p>All Doctors</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about"><p>About</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact"><p>Contact</p></NavLink>
            {!token && (
              <button onClick={() => { setShowMenu(false); navigate('/login'); }} className="bg-primary text-white px-6 py-2 rounded-full">
                Create Account
              </button>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
