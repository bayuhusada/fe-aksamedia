import { useEffect, useRef, useState } from 'react';
import { getCurrentUser, logout } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const dropdownRef = useRef();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');

useEffect(() => {
  const applyTheme = () => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.removeItem('theme');
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  applyTheme();

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const listener = () => {
    if (localStorage.getItem('theme') === null) {
      applyTheme();
    }
  };

  media.addEventListener('change', listener);

  return () => {
    media.removeEventListener('change', listener);
  };
}, [theme]);


  useEffect(() => {
  const handleStorageChange = () => {
    setUser(getCurrentUser());
  };
  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-gray-900 px-4 py-3 shadow-md">
  <div className="flex justify-between items-center">
    <button
      onClick={() => navigate('/dashboard')}
      className="bg-yellow-400 text-white px-6 py-3 shadow-[-7px_7px_0px_gray] dark:bg-gray-900 dark:shadow-[-7px_7px_0px_yellow]"
    >
      My Aksa App
    </button>

    <button
      className="md:hidden block text-gray-700 dark:text-white"
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>

    <div className="hidden md:flex items-center gap-5">
      <button
        onClick={() => navigate('/dashboard')}
        className="dark:text-white bg-gray-400 dark:bg-yellow-400 rounded-md p-2 hover:text-white dark:hover:text-gray-900 transition"
      >
        Dashboard
      </button>
      <button
        onClick={() => navigate('/data')}
        className="dark:text-white bg-gray-400 dark:bg-yellow-400 rounded-md p-2 hover:text-white dark:hover:text-gray-900 transition"
      >
        Data
      </button>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 bg-yellow-400 text-white px-6 py-3 shadow-[-7px_7px_0px_gray] hover:shadow-[-7px_10px_2px_gray]"
        >
          <span className="text-sm text-gray-800 dark:text-white">
            {user?.fullName || 'User'}
          </span>
          <svg className="w-4 h-4 text-gray-800 dark:text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
            <button
              onClick={() => navigate('/edit-profile')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white"
            >
              Edit Profil
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-red-100 dark:hover:bg-red-600 text-red-600 dark:text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 px-4">
        <label className="text-sm text-gray-700 dark:text-white">Tema:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="text-sm p-1 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {dropdownOpen && (
    <div className="md:hidden mt-3 space-y-2">
      <button
        onClick={() => navigate('/dashboard')}
        className="block w-full text-left bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
      >
        Dashboard
      </button>
      <button
        onClick={() => navigate('/data')}
        className="block w-full text-left bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
      >
        Data
      </button>
      <button
        onClick={() => navigate('/edit-profile')}
        className="block w-full text-left bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
      >
        Edit Profil
      </button>
      <div className="flex items-center gap-2 px-4">
        <label className="text-sm text-gray-700 dark:text-white">Tema:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="text-sm p-1 rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
        >
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <button
        onClick={handleLogout}
        className="block w-full text-left text-red-600 dark:text-white px-4 py-2 rounded hover:bg-red-100 dark:hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  )}
</nav>

  );
};

export default Navbar;
