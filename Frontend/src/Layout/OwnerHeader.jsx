import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";

export default function OwnerHeader(){
  const nav=useNavigate();

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

 
  const logout=()=>{
     sessionStorage.removeItem("token");
     sessionStorage.removeItem("name");
     sessionStorage.removeItem("userId");
     toast.success("Logout successfully")
     setTimeout(() => {
       nav('/');
     }, 1000);
   }
    return(
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
            <Link to={'/owner'} className="nav-item nav-link active">
              Dashboard
            </Link>
           
            <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                Vehicle
              </Link>
              <div className="dropdown-menu rounded-0 m-0">
                <Link to={'/owner/addvehicles'} className="dropdown-item">
                 Add Vehicle
                </Link>
                <Link to={'/owner/managevehicles'} className="dropdown-item">
                  Manage Vehicles
                </Link>
                <Link to={'/owner/addvehiclesavailability'} className="dropdown-item">
                  Add Vehicle Availability
                </Link>
                <Link to={'/owner/managevehiclesavailability'} className="dropdown-item">
                  Manage Vehicle Availability
                </Link>
               
              </div>
            </div>
            <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                View
              </Link>
              <div className="dropdown-menu rounded-0 m-0">
                <Link to={'/owner/viewpenaltyrules'} className="dropdown-item">
                 Penalty Rules
                </Link>
                
               
              </div>
            </div>
           
            
            
            <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                Rented Vehciles
              </Link>
              <div className="dropdown-menu rounded-0 m-0">
              <Link to={'/owner/managependingrenting'} className="dropdown-item">
                  Pending Rented Vehicles
                </Link>
                <Link to={'/owner/manageacceptedrenting'} className="dropdown-item">
                 Accepted Rental Vehicles
                </Link>
                
                 
                <Link to={'/owner/managecompletedrenting'} className="dropdown-item">
                  Completed Rented Vehicles
                </Link>
                <Link to={'/owner/managerejectedrenting'} className="dropdown-item">
                  Rejected Rented Vehicles
                </Link> 
                <Link to={'/owner/managecancelledrenting'} className="dropdown-item">
                  Manage Cancelled Vehicles
                </Link> 
                
                
              </div>
            </div>
            <div className="nav-item dropdown">
              <Link
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
              >
                Penalties
              </Link>
              <div className="dropdown-menu rounded-0 m-0">
              <Link to={'/owner/managependingpenalties'} className="dropdown-item">
                  Pending Penalties
                </Link>
                <Link to={'/owner/managepaidpenalties'} className="dropdown-item">
                 Paid Penalties
                </Link>
                <Link to={'/owner/manageapprovedpenalties'} className="dropdown-item">
                  Approved Penalties
                </Link>
                <Link to={'/owner/managerejectedpenalties'} className="dropdown-item">
                  Rejected Penalties
                </Link>
               
                
                
              </div>
            </div>
            
            <Link to={'/owner/profile'} className="nav-item nav-link">
              Profile
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
    )
}