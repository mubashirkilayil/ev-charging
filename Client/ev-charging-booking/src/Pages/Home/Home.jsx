import AllStations from '../../Components/AllStation/AllStation';
// import NearStations from '../../Components/NearStations/NearStations';
import './Home.css';

const Home = () => {
  return (
    <>
      <div className="home pt-10">
        <div className="main pt-5">
          <img src="image.png" alt="" />
        </div>
        <h1 className="text-5xl font-bold text-center pt-5 ">
          Your Next Charge is Just Around the Corner⚡
        </h1>
        <AllStations />
        <div className="features bg-gradient-to-b from-emerald-800 to-emerald-500 p-10">
          <h1 className="text-5xl font-bold text-center pt-5 text-white">
            Your Next Charge is Just Around the Corner⚡
          </h1>
          <div className="sub mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-10 ">
            <div className=" bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
              <img
                src="battery.png"
                alt="Fast Charging"
                className="mx-auto h-20 mb-4"
              />
              <h2 className="text-xl font-semibold text-emerald-700">
                Fast Charging
              </h2>
              <p className="mt-2 text-gray-600">
                Get back on the road quickly with high-speed charging stations
                across major cities.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
              <img
                src="map.png"
                alt="Find Easily"
                className="mx-auto h-20 mb-4"
              />
              <h2 className="text-xl font-semibold text-emerald-700">
                Find Easily
              </h2>
              <p className="mt-2 text-gray-600">
                Use our interactive map to locate the nearest charging hub and
                plan your route.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
              <img
                src="eco.png"
                alt="Eco Friendly"
                className="mx-auto h-20 mb-4"
              />
              <h2 className="text-xl font-semibold text-emerald-700">
                Eco-Friendly
              </h2>
              <p className="mt-2 text-gray-600">
                Join the movement towards a cleaner, greener future with
                electric driving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
