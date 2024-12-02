import { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = ({ title, navlinks }) => {
  const [currentTab, setCurrentTab] = useState(0);

  // const navlinks = [
  //   {
  //     name: 'Dashboard',
  //     link: '/admin/dashboard',
  //   } ,
  //   {
  //     name: 'Accounts',
  //     link: '/admin/accounts',
  //   },
  //   {
  //     name: 'Sections',
  //     link: '/admin/sections',
  //   },
  //   {
  //     name: 'Announcements',
  //     link: '/admin/announcements',
  //   } 
  // ];

  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="text-sm font-medium text-center text-grey-600 border-b border-grey-200">
          <ul className="flex flex-wrap -mb-px">
            {navlinks && navlinks.map((navigation, index) => {
              return (
                <li key={index} className="me-1 cursor-pointer" onClick={ () => setCurrentTab(index) }>
                  <NavLink 
                    to={navigation.link} 
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${currentTab == index ? 'border-blue-600 text-blue-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                  >
                    {navigation.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
      </div>
    </div>
  );
};

export default Header;