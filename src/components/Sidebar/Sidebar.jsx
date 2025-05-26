import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';

export default function Sidebar() {
  const { userLogin } = useContext(UserContext); // Access login state from context

  if (!userLogin) {
    return null; // Hide sidebar if user is not logged in
  }

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', iconClass: 'fas fa-home' },
    // { name: 'Add Doctor', path: '/adddoctor', iconClass: 'fas fa-user-doctor' },
    { name: 'Doctor Lists', path: '/viewdoctor', iconClass: 'fas fa-list-ul' },
    { name: 'Patient Lists', path: '/viewpatient', iconClass: 'fas fa-users' }
  ];

  return (
    <div className="fixed top-17 left-0 h-[calc(100vh-4rem)] w-64 bg-white text-[#5CAFE1] flex flex-col py-8 px-4 shadow-lg z-10">
      <h2 className="text-2xl font-bold mb-10 text-center">Let's Manage</h2>
      <nav className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                isActive 
                  ? 'bg-[#5CAFE1] text-white shadow-md' 
                  : 'hover:bg-[#5CAFE1] hover:text-white'
              }`
            }
          >
            <i className={`${item.iconClass} text-lg`}></i>
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
