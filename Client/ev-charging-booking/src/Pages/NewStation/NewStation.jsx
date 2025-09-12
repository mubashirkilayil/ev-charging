import Button from '../../Components/Button/Button';
import './NewStation.css';
import axios from '../../Utils/axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewStation = () => {
  const navigate = useNavigate();
  const [station, setStation] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    available: false,
  });
  const { id } = useParams();
  const onChange = (e, key) => {
    setStation({ ...station, [key]: e.target.value });
  };
  const onAddStation = async () => {
    try {
      const response = await axios.post('/station', station);
      toast.success('Station added successfully');
      navigate('/');
      // console.log(response);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const getProductById = async id => {
    const response = await axios.get(`/station/${id}`);
    setStation(response.data.data);
  };
  const onEdit = async () => {
    const response = await axios.patch(`/station/${id}`);
    navigate('/');
  };
  const onToggleAvailable = () => {
    setStation({ ...station, available: !station.available });
  };
  useEffect(() => {
    if (id) getProductById(id);
  }, [id]);
  return (
    <>
      <div className="new-station-register pt-10">
        <div className="new-station-description">
          <div className="img-desc">
            <img src="new-station-img.png" alt="" />
          </div>
          <div className="para-desc">
            <h1>
              Start Your Own EV Charging Franchise with{' '}
              <span className="text-green-400">ev-charging</span>
            </h1>
            <p>
              Franchise model enables businesses to expand EV charging networks
              under a unified brand, where multiple station owners can operate
              independently while sharing the same infrastructure, technology,
              and customer platform. This ensures scalability, consistent
              service quality, and wider accessibility for EV users
            </p>
          </div>
        </div>
        <div className="new-station-description">
          <div className="para-desc">
            <h1>
              Your <span className="text-red-500">investment</span> on your
              terms
            </h1>
            <p>
              Partnering with us as a franchisee offers access to a rapidly
              growing EV market, a proven technology platform, and strong brand
              support. Enjoy low entry barriers, scalable business
              opportunities, and continuous technical assistance, while
              contributing to sustainable mobility and future-ready
              infrastructure.
            </p>
          </div>
          <div className="img-desc">
            <img src="new-station-img2.png" alt="" />
          </div>
        </div>
        <div className="station-form">
          <h1>REGISTER NEW STATION</h1>
          <div className="form-inputs">
            <div className="form-input-container">
              <label htmlFor="">Station Name</label>
              <input
                type="text"
                value={station.name}
                onChange={e => {
                  onChange(e, 'name');
                }}
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="">Address</label>
              <textarea
                type="text"
                value={station.address}
                onChange={e => {
                  onChange(e, 'address');
                }}
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="">Latitude</label>
              <input
                type="text"
                value={station.latitude}
                onChange={e => {
                  onChange(e, 'latitude');
                }}
              />
            </div>
            <div className="form-input-container">
              <label htmlFor="">Longitude</label>
              <input
                type="text"
                value={station.longitude}
                onChange={e => {
                  onChange(e, 'longitude');
                }}
              />
            </div>
            <div className="form-input-container">
              <span className="mr-3">Available</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={station.available}
                  onChange={onToggleAvailable}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <Button text={'submit'} className="w-32" onClick={onAddStation} />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewStation;
