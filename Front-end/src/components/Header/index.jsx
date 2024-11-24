import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo using Link */}
        <Link to="/" className="text-xl font-bold hover:text-gray-200">MyApp</Link>

        {/* Navigation using NavLink */}
        <div className="space-x-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => (isActive ? "text-yellow-400 font-bold" : "hover:text-gray-200")}
          >
            Home
          </NavLink>
          <NavLink 
            to="/section" 
            className={({ isActive }) => (isActive ? "text-yellow-400 font-bold" : "hover:text-gray-200")}
          >
            Section
          </NavLink>
          <NavLink 
            to="/course" 
            className={({ isActive }) => (isActive ? "text-yellow-400 font-bold" : "hover:text-gray-200")}
          >
            Course
          </NavLink>
          <NavLink 
            to="/accounts" 
            className={({ isActive }) => (isActive ? "text-yellow-400 font-bold" : "hover:text-gray-200")}
          >
            Accounts
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
