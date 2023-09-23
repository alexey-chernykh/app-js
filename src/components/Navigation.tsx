import { Outlet, Link } from "react-router-dom";
function Navigation() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <div className="navbar-brand">
            <Link className="nav-obj" to={`/`}>
              MyProject
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <div className="nav-link active" aria-current="page">
                  <Link className="nav-obj" to={`/`}>
                    Home
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <Link className="nav-obj" to={`/about`}>
                    About
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <div className="nav-link">
                  <Link className="nav-obj" to={`/api`}>
                    Cities
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
