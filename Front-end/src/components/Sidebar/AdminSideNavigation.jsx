import { useState } from "react";
import { FaBars, FaArrowLeft } from "react-icons/fa";
import { NavLink } from 'react-router-dom'

const AdminSidebar = ({ navlinks }) => {
  const [isOpen, setIsOpen] = useState(true);

  console.log(navlinks)

return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-900 h-screen duration-300 flex flex-col relative`}
    >
      {/* Logo */}
      <div className={`flex items-center gap-4 p-4 ${isOpen? 'justify-between' : 'justify-center'}`}>
        {isOpen && (
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 h-8 w-8 rounded-full"></div>
            <h1 className="text-xl font-medium text-grey-100">Noodle</h1>
          </div>
        )}

      {/* Toggle Button */}
        <button
          className="bg-gray-800 text-white rounded-full p-2 shadow-md hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaArrowLeft /> : <FaBars />}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="flex-grow mt-4 space-y-4">
        {navlinks.map((category, index) => {
          return (
            <li key={index}>
              <NavLink
                to={category.link}
                className={({ isActive }) => `flex items-center gap-4 px-4 hover:bg-gray-700 hover:cursor-pointer rounded h-10 ${!isOpen && 'justify-center'} ${isActive ? 'text-primary-500' : 'text-grey-100'}`}>
                <category.icon className="text-lg" />
                {isOpen && <span className="text-regular font-sans">{category.name}</span>}
              </NavLink>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className={`p-4 flex items-center gap-4 ${!isOpen && 'justify-center'}`}>
        <img
          src="https://via.placeholder.com/40"
          alt="User Profile"
          className="h-10 w-10 rounded-full"
        />
        {isOpen && <span className="text-grey-100">Hi, John</span>}
      </div>
    </div>
  );
};

export default AdminSidebar;
