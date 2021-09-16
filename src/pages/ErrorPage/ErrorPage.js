import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
      <div className="error-page-cont">
          <h1 className="u-mb-25">Página no encontrada!</h1>
          <Link to="/" className="btn-volver btn-gen btn-gen--red" replace>
              Volver
          </Link>
      </div>
  );
};

export default ErrorPage;