import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../Utils/axios';
import { toast } from 'react-toastify';
import './BookingSuccess.css';

const BookingSuccess = () => {
  const { id } = useParams();

  useEffect(() => {
    // Call backend to confirm payment success
    const confirmPayment = async () => {
      try {
        const { data } = await axios.post(`/booking/verify/${id}`);
        if (data.success) {
          toast.success('Payment successful! Booking confirmed ✅');
        } else {
          toast.error('Payment could not be verified ❌');
        }
      } catch (e) {
        toast.error(e.message);
      }
    };

    // confirmPayment();
  }, [id]);

  return (
    <div className="text-center">
      <div className="card">
        <h1 className="text-3xl font-bold text-green-600">
          🎉 Booking Successful!
        </h1>
        <i class="fa-solid fa-check tick"></i>
        <p className="mt-4">Your booking ID: {id}</p>
      </div>
    </div>
  );
};

export default BookingSuccess;
