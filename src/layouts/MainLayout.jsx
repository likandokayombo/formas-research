import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaMicrophone, FaCamera } from 'react-icons/fa';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Bar with Icons */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-around py-3">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <FaBook className="text-xl" />
            <span className="text-xs mt-1">Book</span>
          </NavLink>
          
          <NavLink 
            to="/mic" 
            className={({isActive}) => 
              `flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <FaMicrophone className="text-xl" />
            <span className="text-xs mt-1">Mic</span>
          </NavLink>
          
          <NavLink 
            to="/photo" 
            className={({isActive}) => 
              `flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <FaCamera className="text-xl" />
            <span className="text-xs mt-1">Photo</span>
          </NavLink>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;