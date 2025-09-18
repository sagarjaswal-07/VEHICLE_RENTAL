import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState,useEffect } from "react";
export default function Header() {

  const nav=useNavigate();

  const [token, setToken] = useState(sessionStorage.getItem("token"));
   useEffect(() => {
     const interval = setInterval(() => {
       setToken(sessionStorage.getItem("token")); // Update token whenever it changes
     }, 1000); 
 
     return () => clearInterval(interval); 
   }, [token]);
 
  const logout=()=>{
     sessionStorage.removeItem("token");
     sessionStorage.removeItem("name");
     sessionStorage.removeItem("userId");
     sessionStorage.removeItem("userType");
     toast.success("Logout successfully")
     setTimeout(() => {
       nav('/');
     }, 1000);
   }
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
                <h1 className="text-uppercase text-primary mb-1">RENT4U</h1>
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
                  <Link to={'/'} className="nav-item nav-link active">
                    Home
                  </Link>
                  <Link to={'/about'} className="nav-item nav-link">
                    About
                  </Link>
                  <Link to={'/categories'} className="nav-item nav-link">
                  Categories
                </Link>
                  <div className="nav-item dropdown">
                    <Link
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      See
                    </Link>
                    <div className="dropdown-menu rounded-0 m-0">
                      <Link to={'/vehicles'} className="dropdown-item">
                        Vehicles
                      </Link>
                      <Link to={'/owners'} className="dropdown-item">
                        Owners
                      </Link>

                    </div>
                  </div>
                  <Link to={'/contact'} className="nav-item nav-link">
                    Contact
                  </Link>
                  
                 
                  {
                    token ? (
                      <>
                        <div className="nav-item dropdown">
                    <Link
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      User
                    </Link>

                    <div className="dropdown-menu rounded-0 m-0">
                      <Link to={"/mybooking"} className="dropdown-item">
                        My Rentings
                      </Link>
                      <Link to={"/seepenalties"} className="dropdown-item">
                        View Penalties
                      </Link>
                      
                    </div>
                  </div>
                      </>
                    ):null}
                  
                  {
                    token ? (
                      <>
                        <Link onClick={logout} className="nav-item nav-link">
                          Log out
                        </Link>
                      </>
                    ) : (
                      <>
                        <div className="nav-item dropdown">
                          <Link
                            href="#"
                            className="nav-link dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            Register
                          </Link>
                          <div className="dropdown-menu rounded-0 m-0">
                            <Link to={'/owner-register'} className="dropdown-item">
                              Owner Register
                            </Link>
                            <Link to={'/user-register'} className="dropdown-item">
                              Customer Register
                            </Link>
                          </div>
                        </div>
                        <Link to={'/login'} className="nav-item nav-link">
                          Login
                        </Link>
                      </>
                    )
                  }
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