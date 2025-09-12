import { useState, useEffect } from 'react';

const useUserLocation = () => {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getLocation = () => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          pos => {
            setLocation({
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            });
            setLoading(false);
          },
          err => {
            console.warn('GPS failed:', err.message);
            fetchIPLocation(); // fallback
          }
        );
      } else {
        fetchIPLocation(); // GPS not supported
      }
    };

    const fetchIPLocation = async () => {
      try {
        // 👉 Replace with your token from ipinfo.io (free signup gives 50k req/mo)
        const res = await fetch(`https://ipinfo.io/json?token=YOUR_TOKEN`);
        const data = await res.json();
        const [lat, lng] = data.loc.split(',');
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lng) });
      } catch (err) {
        setError(
          'Unable to fetch location automatically. Please enter manually.'
        );
      }
      setLoading(false);
    };

    getLocation();
  }, []);

  return { location, loading, error, setLocation };
};

export default useUserLocation;
