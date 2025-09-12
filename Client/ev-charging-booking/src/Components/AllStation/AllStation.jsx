import { useEffect, useState } from 'react';
import MapView from '../../Components/Map/MapView';
import StationCard from '../../Components/StationCard/StationCard';
import { toast } from 'react-toastify';
import axios from '../../Utils/axios';

const AllStations = () => {
  const [stations, setStations] = useState([]);

  const getStations = async () => {
    try {
      const response = await axios.get(`/station`);
      //   console.log('API raw response:', response.data);
      //   console.log('API raw response.stattions:', response.data.stations);
      setStations(response.data.stations);
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    getStations();
  }, []);
  //   console.log('stations', stations);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <MapView stations={stations} />
      <div>
        {stations.map(s => (
          <StationCard key={s._id} station={s} />
        ))}
      </div>
    </div>
  );
};

export default AllStations;
