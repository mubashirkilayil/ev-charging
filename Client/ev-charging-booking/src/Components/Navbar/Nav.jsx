import './Nav.css';
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Button from '../Button/Button';

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const updateUser = () => {
      const locatUser = localStorage.getItem('user');
      if (locatUser) {
        setUser(JSON.parse(locatUser).user);
      } else {
        setUser(null);
      }
    };
    updateUser();

    window.addEventListener('storage', updateUser);
    return () => {
      window.removeEventListener('storage', updateUser);
    };
    // setUser('hai');
  }, []);
  const onLogin = () => {
    navigate('/login');
  };
  const onLogOut = () => {
    setUser(null);
    localStorage.removeItem('user').token;
  };
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0b0c1a] text-white px-10 py-4 flex justify-between items-center z-50 shadow-md">
      {' '}
      {/* Logo */}
      <h1 className="text-2xl font-bold tracking-wide cursor-pointer">
        <span className="text-green-400">ev</span>-charging
      </h1>
      {/* Desktop Links */}
      <ul className="hidden md:flex space-x-8 text-sm">
        <li className="cursor-pointer hover:text-gray-300">
          <NavLink to="/" className="link">
            HOME
          </NavLink>
        </li>
        <li className="cursor-pointer hover:text-gray-300">
          <NavLink to="/about-us" className="link">
            ABOUT US
          </NavLink>
        </li>
        <li className="cursor-pointer hover:text-gray-300">
          <NavLink to="/new-station-register" className="link">
            PARTNER WITH US
          </NavLink>
        </li>
        <li className="cursor-pointer hover:text-gray-300">
          <NavLink to="/contact-us" className="link">
            CONTACT US
          </NavLink>
        </li>
        <li className="cursor-pointer  hover:text-gray-300">
          <NavLink to="/near-stations" className="link">
            LOCATE CHARGER
          </NavLink>
        </li>
        {/* <button
          className="bg-gradient-to-r from-red-500 to-yellow-600 
                   hover:from-red-400 hover:to-pink-500 
                   text-white font-bold py-1 px-3 rounded 
                   focus:outline-none focus:shadow-outline 
                   transition-all duration-300 "
        >
          Login
        </button> */}
        {/* {console.log(user)} */}
        {/* {setUser('hai')} */}
        {/* {console.log(user)} */}

        {user ? (
          <>
            <span className="text-green-400">Hello,{user.name}</span>
            <Button text="Logout" onClick={onLogOut} />
          </>
        ) : (
          <Button text="Login" onClick={onLogin} />
        )}
      </ul>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          className="text-white focus:outline-none text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <i className="fa-solid fa-xmark"></i> : '☰'}
        </button>
      </div>
      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-[#0b0c1a] text-white flex flex-col items-center space-y-4 py-6 md:hidden">
          <NavLink
            to="/"
            className="hover:text-gray-300"
            onClick={() => setOpen(!open)}
          >
            HOME
          </NavLink>
          <NavLink
            to="/about-us"
            className="hover:text-gray-300"
            onClick={() => setOpen(!open)}
          >
            ABOUT US
          </NavLink>
          <NavLink
            to="/new-station-register"
            className="hover:text-gray-300"
            onClick={() => setOpen(!open)}
          >
            PARTNER WITH US
          </NavLink>
          <NavLink
            to="/contact-us"
            className="hover:text-gray-300"
            onClick={() => setOpen(!open)}
          >
            CONTACT US
          </NavLink>
          <NavLink
            to="/near-stations"
            className="hover:text-gray-300"
            onClick={() => setOpen(!open)}
          >
            LOCATE CHARGER
          </NavLink>
          {/* <button
            className="bg-gradient-to-r from-red-500 to-yellow-600 
                   hover:from-red-400 hover:to-pink-500 
                   text-white font-bold py-1 px-3 rounded 
                   focus:outline-none focus:shadow-outline 
                   transition-all duration-300 "
          >
            Login
          </button> */}
          <Button text="Login" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
