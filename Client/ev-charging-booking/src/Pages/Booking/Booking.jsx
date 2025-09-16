import { useEffect, useState } from 'react';
import axios from '../../Utils/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Booking = () => {
  const [station, setStation] = useState('');
  const [slot, setSlot] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const stationById = async () => {
    try {
      const response = await axios.get(`/station/${id}`);
      setStation(response.data.stationById);
      //   console.log(response.data.stationById);
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    stationById();
  }, []);

  const handleBooking = async () => {
    if (!slot || !vehicleNumber) {
      toast.error('Please enter slot & vehicle number.');
      return;
    }
    try {
      const { data } = await axios.post('/booking', {
        userId: JSON.parse(localStorage.getItem('user'))?.id,
        stationId: station._id,
        date: new Date(),
        slot,
        vehicleNumber,
        amount: 200,
      });
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        toast.error('Failed to create Stripe session.');
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="pt-20 px-4 md:px-20 pb-10">
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
        Book Your Slot at <span className="text-green-600">{station.name}</span>
      </h1>

      {/* Station Info */}
      <div className="bg-gray-100 shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <p className="text-lg font-semibold">📍 Address: {station.address}</p>
        <p className="mt-2">
          <span className="font-semibold">Availability:</span>{' '}
          {station.available ? (
            <span className="text-green-600 font-bold">Available ✅</span>
          ) : (
            <span className="text-red-600 font-bold">Not Available ❌</span>
          )}
        </p>
      </div>

      {/* Booking Form */}
      {station.available ? (
        <div className="mt-8 bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Enter Booking Details</h2>
          <div className="flex flex-col gap-4">
            <select
              value={slot}
              onChange={e => setSlot(e.target.value)}
              className="border border-green-200 p-3 bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select Slot</option>
              <option value="10:00-11:00">10:00 - 11:00</option>
              <option value="11:00-12:00">11:00 - 12:00</option>
              <option value="12:00-01:00">12:00 - 01:00</option>
            </select>
            <input
              type="text"
              placeholder="Vehicle Number"
              value={vehicleNumber}
              onChange={e => setVehicleNumber(e.target.value)}
              className="border p-3 border-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleBooking}
              disabled={loading}
              className={`w-full py-3 text-white font-bold rounded-md transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {loading ? 'Processing...' : 'Proceed to Book & Pay'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center">
          <button
            disabled
            className="bg-gray-400 text-white px-6 py-3 rounded-md cursor-not-allowed"
          >
            Booking Unavailable
          </button>
        </div>
      )}
    </div>
  );
};

export default Booking;
