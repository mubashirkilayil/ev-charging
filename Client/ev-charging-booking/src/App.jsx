import './App.css';
import { Route, Routes } from 'react-router-dom';
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

const App = () => {
  return (
    <>
      <Nav />

      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/new-station-register" element={<NewStation />} />
          <Route path="/near-stations" element={<NearStations />} />
          <Route path="/booking/:id" element={<Booking />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default App;
