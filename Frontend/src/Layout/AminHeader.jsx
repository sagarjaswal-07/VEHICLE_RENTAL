import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminHeader() {
  const nav = useNavigate();

  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(() => {
    if (!token) {
      const timer = setTimeout(() => {
        setShowRedirect(true);
        setToken(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [token]);

  if (!token && showRedirect) {
    return <Navigate to={"/login"} />;
  }
  if (!token) return null;

  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");
    sessionStorage.removeItem("userId");
    toast.success("Logout successfully");
    setTimeout(() => {
      nav("/");
    }, 1000);
  };
  return (
    <>
      <>
        {/* Topbar Start */}
        <div className="container-fluid bg-dark py-3 px-lg-5 d-none d-lg-block">
          <div className="row">
            <div className="col-md-6 text-center text-lg-left mb-2 mb-lg-0">
              <div className="d-inline-flex align-items-center">
                <Link className="text-body pr-3" href="">
                  <i className="fa fa-phone-alt mr-2" />
                  +91 81467 82467
                </Link>
                <span className="text-body">|</span>
                <Link className="text-body px-3" href="">
                  <i className="fa fa-envelope mr-2" />
                  rent4u@help.com
                </Link>
              </div>
            </div>
            <div className="col-md-6 text-center text-lg-right">
              <div className="d-inline-flex align-items-center">
                <a className="text-body px-3" href="">
                  <i className="fab fa-facebook-f" />
                </a>
                <a className="text-body px-3" href="">
                  <i className="fab fa-twitter" />
                </a>
                <a className="text-body px-3" href="">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a className="text-body px-3" href="">
                  <i className="fab fa-instagram" />
                </a>
                <a className="text-body pl-3" href="">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Topbar End */}
        {/* Navbar Start */}
        <div className="container-fluid position-relative nav-bar p-0">
          <div className="position-relative px-lg-5" style={{ zIndex: 9 }}>
            <nav className="navbar navbar-expand-lg bg-secondary navbar-dark py-3 py-lg-0 pl-3 pl-lg-5">
              <a href="" className="navbar-brand">
                <h1 className="text-uppercase text-primary mb-1">Rent4u</h1>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between px-3"
                id="navbarCollapse"
              >
                <div className="navbar-nav ml-auto py-0">
                  <Link to={"/admin"} className="nav-item nav-link active">
                    Dashboard
                  </Link>

                  <div className="nav-item dropdown">
                    <Link
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Category
                    </Link>
                    <div className="dropdown-menu rounded-0 m-0">
                      <Link to={"/admin/addcategory"} className="dropdown-item">
                        Add Category
                      </Link>
                      <Link
                        to={"/admin/managecategory"}
                        className="dropdown-item"
                      >
                        Manage Category
                      </Link>
                    </div>
                  </div>
                  <div className="nav-item dropdown">
                    <Link
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Penalty
                    </Link>
                    <div className="dropdown-menu rounded-0 m-0">
                      <Link
                        to={"/admin/addpenaltyRules"}
                        className="dropdown-item"
                      >
                        Add PenaltyRules
                      </Link>
                      <Link
                        to={"/admin/managepenaltyRules"}
                        className="dropdown-item"
                      >
                        Manage Penalty Rules
                      </Link>
                    </div>
                  </div>
                  <div className="nav-item dropdown">
                    <Link
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Manage
                    </Link>
                    <div className="dropdown-menu rounded-0 m-0">
                      <Link
                        to={"/admin/manageowners"}
                        className="dropdown-item"
                      >
                        Manage Owners
                      </Link>
                      <Link
                        to={"/admin/managequeries"}
                        className="dropdown-item"
                      >
                        Manage Queries
                      </Link>
                      <Link
                        to={"/admin/managerentedvehicle"}
                        className="dropdown-item"
                      >
                        Manage Rented Vehicles
                      </Link>
                      <Link
                        to={"/admin/managepenalties"}
                        className="dropdown-item"
                      >
                        Manage Penalties
                      </Link>
                    </div>
                  </div>

                  <Link
                    to={"/admin/viewvehicles"}
                    className="nav-item nav-link"
                  >
                    View Vehicles
                  </Link>
                  <Link onClick={logout} className="nav-item nav-link">
                    Log out
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/* Navbar End */}
      </>
    </>
  );
}
