import axios from '../../Utils/axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState({
    name: '',
    email: '',
    message: '',
  });
  const onChange = (e, key) => {
    setMessage({ ...message, [key]: e.target.value });
    console.log(message);
  };
  const onsubmitMessage = async () => {
    try {
      const response = await axios.post('/booking/contact-us', message);
      console.log(response);

      toast.success('Message sent successfully');
      setMessage({
        name: '',
        email: '',
        message: '',
      });
      setTimeout(() => {
        navigate('/contact-us');
      }, 1500);
    } catch (e) {
      toast.error(e.message);
    }
  };
  return (
    <div className="pt-20 px-6 md:px-20 bg-gray-900 text-gray-100 min-h-screen">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-green-400">
          Contact Us
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Have questions, feedback, or partnership opportunities? We’d love to
          hear from you!
        </p>
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Form */}
        <div className="bg-gray-800 shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-green-400 mb-6">
            Get in Touch
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={message.name}
              onChange={e => {
                onChange(e, 'name');
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={message.email}
              onChange={e => {
                onChange(e, 'email');
              }}
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={message.message}
              onChange={e => {
                onChange(e, 'message');
              }}
            ></textarea>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md transition"
              onClick={onsubmitMessage}
            >
              Send Message
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-800 shadow-md rounded-2xl p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-green-400 mb-6">
            Contact Information
          </h2>
          <p className="mb-4 text-gray-300">
            Have queries about bookings, charging stations, or partnerships?
            Reach us anytime!
          </p>
          <div className="space-y-4">
            <p>
              📍{' '}
              <span className="text-white">
                EV Charging HQ, Palakkad, Kerala
              </span>
            </p>
            <p>
              📞 <span className="text-white">+91 98765 43210</span>
            </p>
            <p>
              ✉️ <span className="text-white">support@evcharging.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
