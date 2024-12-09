import { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

const Tab = ({ children, title, tabs, configs, className }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentConfigs, setCurrentConfigs] = useState(configs ? configs[0] : []);

  const onTabChanged = (index) => {
    setCurrentTab(index);
    if (configs && configs.length > 1) {
      setCurrentConfigs(configs[index]);
    }
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{title}</h1>
          {currentConfigs.length > 0 && (
            <Menu>
              <MenuButton className='hover:text-gray-400'>
                <FaEllipsisH className="text-lg" />
              </MenuButton>
              <MenuItems 
                anchor='bottom'
                className={'w-52 z-10 bg-white px-2 py-3 mt-3 rounded-xl shadow-md'}
              >
                {currentConfigs.map((config, index) => {
                  return (
                    <MenuItem key={index}
                      className='p-2 w-full hover:bg-gray-300/30 rounded-xl '
                    >
                      <button 
                        onClick={config.onClick}
                        className="text-grey-800 text-left"
                      >
                        {config.name}
                      </button>
                    </MenuItem>
                  )
                })}
              </MenuItems>
            </Menu>
          )}
      </div>
      {tabs && (
        <div className="text-sm font-medium text-center text-grey-600 border-b border-grey-200">
            <ul className="flex flex-wrap -mb-px" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
              {tabs.map((tab, index) => {
                return (
                  <li key={index} role="presentation" className="me-1 cursor-pointer" onClick={ () => onTabChanged(index) }>
                    <button 
                      id={tab.id} 
                      data-tabs-target={`#${tab.tabId}`}
                      role="tab"
                      type="button"
                      aria-controls={tab.tabId}
                      aria-selected={false}
                      className={`inline-block p-4 border-b-2 rounded-t-lg ${currentTab == index ? 'border-primary-600 text-primary-600' : 'border-transparent hover:text-gray-600 hover:border-gray-300'}`}
                    >
                      {tab.name}
                    </button>
                  </li>
                );
              })}
            </ul>
        </div>
      )}
      <div id="default-tab-content">
        {children}
      </div>
    </div>
  );
};

export default Tab;