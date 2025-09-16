import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from '../../Utils/axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const onSubmit = async () => {
    try {
      const response = await axios.post('/user/forgot-password', { email });
      toast.success(response.data.message || 'Password reset email sent!');
      setEmail('');
      navigate('/reset-password');
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    }
  };

  return (
    <div className="pt-20 flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-400 mb-6">
          Forgot Password
        </h1>
        <p className="mb-4 text-gray-300">
          Enter your registered email and we’ll send you a reset link/token.
        </p>
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-md bg-gray-700 text-white mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button
          onClick={onSubmit}
          className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-md font-semibold"
        >
          Send Reset Email
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
