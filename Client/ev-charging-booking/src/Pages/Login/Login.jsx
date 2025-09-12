import './LogIn.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from '../../Utils/axios';
import Button from '../../Components/Button/Button';
import { toast } from 'react-toastify';
import BackGroundImage from '../../Components/BackgroundImg/BackGroundImg';

const LogIn = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const onSignUp = () => {
    navigate('/signup');
  };
  const onLogIn = async () => {
    try {
      const response = await axios.post('user/login', login);
      console.log(response.data);

      localStorage.setItem(
        'user',
        JSON.stringify({
          token: response.data.token,
          user: response.data.user,
          id: response.data.id,
        })
      );
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch (e) {
      toast.error(e.message);
    }
  };
  const onChange = (e, key) => {
    setLogin({ ...login, [key]: e.target.value });
  };
  return (
    <>
      <BackGroundImage />
      <div className="log-in pt-20">
        <div className="log-in-form">
          <p onClick={onSignUp}>
            New user,
            <br />
            Sign Up
          </p>
          <h1>Log In</h1>
          <div className="log-in-inputs">
            <div className="input-container">
              <label htmlFor="">Email</label>
              <input
                type="email"
                value={login.email}
                onChange={e => {
                  onChange(e, 'email');
                }}
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={login.password}
                onChange={e => {
                  onChange(e, 'password');
                }}
              />
            </div>
            {/* <button onClick={onLogIn}>Log In</button> */}
            <Button
              onClick={onLogIn}
              text="Log In"
              className="bg-red-600 text-white hover:bg-red-700"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
