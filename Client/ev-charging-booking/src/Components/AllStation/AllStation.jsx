import { useEffect, useState } from 'react';
import MapView from '../../Components/Map/MapView';
import StationCard from '../../Components/StationCard/StationCard';
import { toast } from 'react-toastify';
import axios from '../../Utils/axios';

const AllStations = () => {
  const [stations, setStations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getStations = async (pageNo = 1) => {
    try {
      const response = await axios.get(`/station?page=${pageNo}&limit=5`);
      //   console.log('API raw response:', response.data);
      //   console.log('API raw response.stattions:', response.data.stations);
      setStations(response.data.stations);
      setTotalPages(response.data.totalPages);
      setPage(response.data.currentPage);
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    getStations(page);
  }, [page]);
  //   console.log('stations', stations);

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
      <MapView stations={stations} />
      <div>
        {stations && stations.length > 0 ? (
          stations.map(s => <StationCard key={s._id} station={s} />)
        ) : (
          <h1 className="text-center text-lg font-semibold mt-5">
            Server rendering error!
          </h1>
        )}
        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllStations;
