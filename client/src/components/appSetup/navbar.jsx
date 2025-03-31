import React, { useEffect, useRef, useState } from 'react';
import { Link} from 'react-router-dom';
import useAuth from '../contexts/AuthContext';

const Navbar = () => {
  const {user , logout} = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null)

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img className='max-w-[30px] rounded-full' 
          src="
          data:image/png;base64,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
          "
          alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">RkvBros</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-600 hover:scale-105 transform transition-transform"
            onClick={toggleDropdown}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="
            https://m.media-amazon.com/images/S/amzn-author-media-prod/9kk5f3idcpdt322i3oflk4oqb5._SY450_CR8%2C0%2C450%2C450_.jpg
            " alt="User" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-4 top-14 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-lg transition-all duration-200 dark:bg-gray-700 dark:divide-gray-600">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">{user.name}</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email}</span>
              </div>
              <ul className="py-2">
                <li><Link to="/dashboards" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600" onClick={toggleDropdown} >Dashboard</Link></li>
                <li><Link to="/content" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600" onClick={toggleDropdown} >Content</Link></li>
                <li><Link to="/analytics" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600" onClick={toggleDropdown} >Analytics</Link></li>
                <li><Link to="/new" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600" onClick={toggleDropdown} >New</Link></li>
                <li><Link to="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600" onClick={logout} >Logout</Link></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
