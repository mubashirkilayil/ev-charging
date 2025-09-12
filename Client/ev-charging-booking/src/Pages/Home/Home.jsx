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
        <h1 className="text-5xl font-bold text-center pt-5">
          Your Next Charge is Just Around the Corner⚡
        </h1>
        <AllStations />
      </div>
    </>
  );
};
export default Home;
