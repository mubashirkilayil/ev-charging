// import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// useEffect(() => {
//   const locateUser = localStorage.getItem('user');
// }, []);
const PrivateRoutes = () => {
  return (
    <>
      {localStorage.getItem('user') ? <Outlet /> : <Navigate to="/login" />}
      {/* {console.log(
        'full token:' + JSON.parse(localStorage.getItem('user'))?.token
      )} */}
      {/* {console.log(
        'name: ' + JSON.parse(localStorage.getItem('user'))?.user?.name
      )} */}
    </>
  );
};

export default PrivateRoutes;
