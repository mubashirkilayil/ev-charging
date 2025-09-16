import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../../Utils/axios';

const ResetPassword = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    token: '',
  });
  const navigate = useNavigate();

  const onChange = (e, key) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post('/user/reset-password', form);
      toast.success(response.data.message || 'Password reset successfully');
      navigate('/login');
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    }
  };

  return (
    <div className="pt-20 flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-400 mb-6">
          Reset Password
        </h1>
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 rounded-md bg-gray-700 text-white mb-4"
          value={form.email}
          onChange={e => onChange(e, 'email')}
        />
        <input
          type="text"
          placeholder="Reset Token"
          className="w-full p-3 rounded-md bg-gray-700 text-white mb-4"
          value={form.token}
          onChange={e => onChange(e, 'token')}
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 rounded-md bg-gray-700 text-white mb-4"
          value={form.password}
          onChange={e => onChange(e, 'password')}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 rounded-md bg-gray-700 text-white mb-4"
          value={form.confirmPassword}
          onChange={e => onChange(e, 'confirmPassword')}
        />
        <button
          onClick={onSubmit}
          className="w-full bg-green-500 hover:bg-green-600 py-3 rounded-md font-semibold"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
