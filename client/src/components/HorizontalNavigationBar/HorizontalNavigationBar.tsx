import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SearchBar from './components/searchbar';
import logo from '../../assets/planpulse-logo.png';
import HorizontalNavigationItem from './components/HorizontalNavigationItem';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import GoogleUserProvider, { GoogleUserContext } from '../../contexts/GoogleUserContext';
import NavDropdown from './components/NavDropdown';

const HorizontalNavigationBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const { googleUser } = useContext(GoogleUserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false); // Add state for dropdown visibility
  useEffect(() => {
    if (isDarkMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode);
  }, [isDarkMode]);

  function changeIconTest() {
    setIsDarkMode(isDarkMode === 'dark' ? 'light' : 'dark');
  }

  const token = Cookies.get('token');

  return (
    <nav className="bg-secondary text-secondary_foreground dark:bg-dark_secondary dark:text-dark_foreground">
      <div className=" flex flex-wrap items-center justify-between mx-auto  h-20 ml-5">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse object-cover"
        >
          <img src={logo} alt="" className="h-10" />
          <span className="font-semibold">PlanPulse</span>
        </Link>
        <SearchBar></SearchBar>
        <div className="flex flex-row items-end item-container">
          <HorizontalNavigationItem
            Icon={isDarkMode === 'dark' ? MdLightMode : MdDarkMode}
            onClick={changeIconTest}
          ></HorizontalNavigationItem>
          <HorizontalNavigationItem
            Icon={IoIosNotificationsOutline}
            title=""
          ></HorizontalNavigationItem>
          {token ? ( // Check if token exists
            <>
              <HorizontalNavigationItem
                Icon={FaUserCircle}
                title=""
                toURL="#"
                onClick={() => setDropdownVisible(!dropdownVisible)}
              />
              {dropdownVisible && <NavDropdown />}
            </>
          ) : (
            <HorizontalNavigationItem
              Icon={FaUserCircle}
              title=""
              toURL="/login"
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default HorizontalNavigationBar;
