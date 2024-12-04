import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaEllipsisH } from "react-icons/fa";

const Header = ({ title, navlinks, configs, className }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentConfigs, setCurrentConfigs] = useState(configs[0]);

  const onTabChanged = (index) => {
    setCurrentTab(index);
    if (configs && configs.length > 1) {
      setCurrentConfigs(configs[index]);
    }
    console.log(currentConfigs)
  };
  

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

  // const configs = [[
  //   {
  //     name: 'Create An Account',
  //     onClick: () => console.log('Create Account')
  //   },
  //   {
  //     name: 'Import Account CSV',
  //     onClick: () => console.log('Import CSV')
  //   },
  //   {
  //     name: 'Delete Account(s)',
  //     onClick: () => console.log('Delete Account')
  //   },
  // ], ...]

  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
          {currentConfigs && (
            <div>
              <button 
                id="configDropdownButton"
                data-dropdown-toggle="configDropdown"
                className='text-lg hover:text-grey-400 p-2'>
                <FaEllipsisH  />
              </button>
              <div
                id="configDropdown"
                className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="configDropdownButton">
                  {currentConfigs.map((config, index) => {
                    return (
                      <li key={index} className='block px-4 py-2 hover:bg-gray-100' onClick={config.onClick}>
                        {config.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
      </div>
      {navlinks && (
        <div className="text-sm font-medium text-center text-grey-600 border-b border-grey-200">
            <ul className="flex flex-wrap -mb-px">
              {navlinks.map((navigation, index) => {
                return (
                  <li key={index} className="me-1 cursor-pointer" onClick={ () => onTabChanged(index) }>
                    <NavLink 
                      to={navigation.link} 
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${currentTab == index ? 'border-primary-600 text-primary-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                    >
                      {navigation.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
        </div>
      )}
    </div>
  );
};

export default Header;