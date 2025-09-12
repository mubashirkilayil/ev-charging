import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = ({ stations }) => {
  return (
    <MapContainer
      className="z-10"
      center={[10.85, 76.27]}
      zoom={12}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* {stations.map(s => (
        <Marker key={s.id} position={[s.lat, s.lng]}>
          <Popup>
            {s.name} <br /> {s.address}
          </Popup>
        </Marker>
      ))} */}
      {stations.map(station => {
        if (!station.latitude || !station.longitude) return null; // ✅ guard against missing coords
        return (
          <Marker
            key={station._id}
            position={[station.latitude, station.longitude]}
          >
            <Popup>
              <strong>{station.name}</strong>
              <br />
              {station.address}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapView;
