import axios from '../../Utils/axios';
import './SignUp.css';
import { useState } from 'react';
import BackGroundImage from '../../Components/BackgroundImg/BackGroundImg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';

const SignUp = () => {
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const navigate = useNavigate();
  // const onSignUp = async () => {
  //   try {
  //     const response = await axios.post('/user/sign-up', signup);
  //     console.log(response);

  //     navigate('/login');
  //   } catch (e) {
  //     toast.error(e.message);

  //     console.log('Sign up error occured', e);
  //   }
  // };
  const onSignUp = async () => {
    try {
      console.log('📤 Sending signup data:', signup); // <-- add this
      const response = await axios.post('/user/sign-up', signup);
      console.log('✅ Response:', response.data);
      navigate('/login');
    } catch (e) {
      console.log('❌ Sign up error occured', e.response?.data || e.message);
    }
  };
  const onChaneValue = (e, key) => {
    setSignup({ ...signup, [key]: e.target.value });
    // console.log(signup);
  };
  return (
    <>
      <BackGroundImage />
      <div className="sign-up pt-20">
        <div className="sign-up-form">
          <h1>Sign Up</h1>
          <div className="sign-up-inputs">
            <div className="input-container">
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={signup.name}
                onChange={e => onChaneValue(e, 'name')}
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Email</label>
              <input
                type="email"
                value={signup.email}
                onChange={e => onChaneValue(e, 'email')}
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={signup.password}
                onChange={e => onChaneValue(e, 'password')}
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Confirm password</label>
              <input
                type="password"
                value={signup.confirmPassword}
                onChange={e => onChaneValue(e, 'confirmPassword')}
              />
            </div>
            <div className="input-container">
              <label htmlFor="">Role</label>
              <select onChange={e => onChaneValue(e, 'role')}>
                <option value="" disabled>
                  Select Role
                </option>
                <option value="customer">CUSTOMER</option>
                <option value="seller">SELLER</option>
                <option value="admin">ADMIN</option>
              </select>
            </div>
            {/* <button onClick={onSignUp}>Sign Up</button> */}
            <Button text="Sign Up" onClick={onSignUp} className="mt-5" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
