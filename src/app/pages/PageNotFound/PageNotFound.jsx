import "./PageNotFound.css";
import { ReactComponent as PageNotFoundIcon } from "../../../assets/page_not_found.svg";

const PageNotFound = function PageNotFound() {
  return (
    <div className="page-not-found">
      <div className="page-not-found-content-container">
        <div className="page-not-found-content">
          <div className="page-not-found-image-container">
            <PageNotFoundIcon />
          </div>
          <div className="page-not-found-disclaimer-container">
            Page not found.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
