import { Link } from 'react-router-dom';

const StationCard = ({ station }) => {
  return (
    <div className="border rounded p-4 shadow-md flex justify-between items-center">
      <div>
        <h2 className="text-lg font-bold">{station.name}</h2>
        <p className="text-gray-600">{station.address}</p>
      </div>
      <Link
        to={`/booking/${station._id}`}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Book
      </Link>
    </div>
  );
};

export default StationCard;
