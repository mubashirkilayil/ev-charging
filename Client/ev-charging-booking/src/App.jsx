import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './Components/Navbar/Nav';
import Home from './Pages/Home/Home';
import NewStation from './Pages/NewStation/NewStation';
import Footer from './Components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import LogIn from './Pages/Login/Login';
import NearStations from './Components/NearStations/NearStations';
import SignUp from './Pages/SignUp/SignUp';
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes';
import Booking from './Pages/Booking/Booking';
import BookingSuccess from './Pages/Booking/BookingSuccess';
import BookingCancel from './Pages/Booking/BookingCancel';
import AboutUs from './Pages/AboutUs/AboutUs';
import ContactUs from './Pages/ContactUs/ContactUs';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import ResetPassword from './Pages/ResetPassword.jsx/ResetPassword';

const App = () => {
  const location = useLocation();
  const hideFooterOn = ['/booking-success', '/booking-failed'];

  // match routes like /booking-success/:id
  const shouldHideFooter = hideFooterOn.some(path =>
    location.pathname.startsWith(path)
  );
  return (
    <>
      <Nav />

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/new-station-register" element={<NewStation />} />
          <Route path="/near-stations" element={<NearStations />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/booking-success/:id" element={<BookingSuccess />} />
          <Route path="/booking-failed/:id" element={<BookingCancel />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
      <ToastContainer />
    </>
  );
};

export default App;
