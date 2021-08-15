import "./Landing.css";
import Image from "../../../assets/large.png";
import ImagesStaircase from "../../components/views/common/ImagesStaircase/ImagesStaircase";

const Landing = function Landing() {
  return (
    <div className="landing-page">
      <p className="site-motto">Don't waste your time editing images.</p>
      <div className="landing-page-content-container">
        <div className="landing-page-content">
          <div className="landing-page-normal-image-container">
            <img
              className="landing-page-normal-image"
              src={Image}
              alt="normal image"
            />
          </div>
          <div className="landing-page-image-staircase-container">
            <ImagesStaircase />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
