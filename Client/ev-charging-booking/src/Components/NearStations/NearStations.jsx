import { useEffect, useState } from 'react';
import MapView from '../../Components/Map/MapView';
import StationCard from '../../Components/StationCard/StationCard';
import { toast } from 'react-toastify';
import axios from '../../Utils/axios';
import useUserLocation from '../../hooks/useUserLocation';

const NearStations = () => {
  const [stations, setStations] = useState([]);
  const { location, loading, error } = useUserLocation();

  const getNearStations = async (lat, lng) => {
    try {
      // ✅ call your /near API with lat, lng, distance (say 10 km default)
      const response = await axios.get(
        `/station/near?lat=${lat}&lng=${lng}&distance=5`
      );
      setStations(response.data.nearStations);
      toast.success(response.data.message);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (location.lat && location.lng) {
      getNearStations(location.lat, location.lng);
    }
  }, [location]);

  if (loading) return <p className="p-6">📍 Detecting your location...</p>;
  if (error) return <p className="p-6 text-red-500">❌ {error}</p>;

  return (
    <div>
      <h1 className="text-5xl font-bold text-center pt-20 text-gray-700 ">
        Near by Stations are Just Around the Corner⚡
      </h1>
      <div className="p-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Map showing stations + user location */}
        <MapView stations={stations} userLocation={location} />

        <div>
          {stations.length > 0 ? (
            stations.map(s => <StationCard key={s._id} station={s} />)
          ) : (
            <p>No nearby stations found 🚫</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NearStations;
