import './Footer.css';

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-grid">
          <div className="cols">
            <h1>COMPANY</h1>
            <h1 className="text-2xl font-bold tracking-wide cursor-pointer">
              <span className="text-green-400">ev</span>-charging
            </h1>
            <br />
            <div className="foot-elements">
              <i class="fa-brands fa-instagram"></i>
              <i class="fa-brands fa-x-twitter"></i>
              <i class="fa-brands fa-threads"></i>
              <i class="fa-brands fa-square-facebook"></i>
              <i class="fa-brands fa-youtube"></i>
            </div>
          </div>
          <div className="cols">
            <h1>CUSTOMER SERVICES</h1>
            <div className="foot-elements">
              <p>Home</p>
              <p>About</p>
              <p>Contact US</p>
              <p>Subscription</p>
            </div>
          </div>
          <div className="cols">
            <h1>MORE TO EXPLORE</h1>
            <div className="foot-elements">
              <p>Offers</p>
              <p>Consultation</p>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>
            <i class="fa-regular fa-copyright"></i>
            2025 | ev-charging.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
