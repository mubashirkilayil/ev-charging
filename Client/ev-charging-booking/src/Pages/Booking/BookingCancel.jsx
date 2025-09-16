import { useParams } from 'react-router-dom';
import './BookingCancel.css';

const BookingCancel = () => {
  const { id } = useParams();

  return (
    <div className="pt-20 text-center">
      <div className="card">
        <h1 className="text-3xl font-bold text-red-600">❌ Payment Failed</h1>
        <p className="mt-4">Booking ID: {id}</p>
        <p>Please try again.</p>
      </div>
    </div>
  );
};

export default BookingCancel;
