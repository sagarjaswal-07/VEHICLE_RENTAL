import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link } from "react-router-dom";
export default function Categories() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    apiServices.getallCategory().then((res) => {
      setCategoryData(res.data.data);
    });
  }, []);

  return (
    <>
      <>
        <>
          {/* Page Header Start */}
          <div className="container-fluid page-header">
            <h1 className="display-3 text-uppercase text-white mb-3">
              Categories
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  Home
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">Categories</h6>
            </div>
          </div>
          {/* Page Header Start */}
          {/* Services Start */}
          {/* <div className="container-fluid py-5">
            <div className="container pt-5 pb-3">
              <h1 className="display-4 text-uppercase text-center mb-5">
                Categories
              </h1>
              <div className="row">
                {categoryData?.map((el, index) => (
                  <>
                    <div
                      className="col-lg-4 col-md-6 mb-2"
                      style={{ height: 400 }}
                    >
                      <div className="service-item d-flex flex-column justify-content-center px-4 mb-4 pt-5 pb-5">
                        <div className="d-flex align-items-center justify-content-between mb-3 mt-5">
                          <div
                            className="d-flex align-items-center justify-content-center ml-n5"
                            style={{ width: 150, height: 120 }}
                          >
                            <img
                              src={BASE_IMAGE_URL + el.categoryImage}
                              className="ms-3"
                              style={{
                                paddingLeft: "-40px",
                                width: "100%",
                                height: "150px",
                              }}
                            />
                          </div>
                          <h1 className="display-1 text-white mt-n2 m-0">
                            {index + 1}
                          </h1>
                        </div>
                        <h4 className="text-uppercase mb-3">
                          {el.categoryName}
                        </h4>
                        <p className="m-0">{el.description}</p>
                        <Link to={"/showvehicle/" + el._id}>
                          <button className="btn btn-info mt-3">
                            Avaialble Vehicles
                          </button>
                        </Link>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div> */}

          {/* Services End */}

          <div className="container-fluid py-5">
            <div className="container pt-0 pb-3">
              <h1 className="display-4 text-uppercase text-center mb-5">
                Our <span className="text-primary">Categories</span>
              </h1>
              <div className="row" style={{columnGap:'140px'}}>
                {categoryData?.map((el, index) => (
                  <>
                  
                    <div className="col-lg-3 col-md-6 mb-2 mt-5" >
                      <div
                        className="service-item d-flex flex-column justify-content-center px-4 mb-3 active"
                        style={{
                          height: "450px",
                          width: "400px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                          borderRadius:'2px',
                          marginLeft:'-70px'
                        }}
                      >
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div
                            className="d-flex align-items-center justify-content-center  ml-n4"
                            style={{ width: 80, height: 80 }}
                          >
                            <img
                              src={el?.categoryImage}
                              height={80}
                              style={{
                                paddingLeft: "0px",
                                height: "150px",
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                              }}
                            />
                          </div>
                          <h1
                            className="text-white mt-n2 m-0 mr-4"
                            style={{ fontSize: "100px",
                              
                             }}
                          >
                            {index + 1}
                          </h1>
                        </div>
                        <br></br>
                        <h4 className="text-uppercase pt-4 mb-3 text-primary"
                        style={{}}>
                          {el?.categoryName}
                        </h4>
                        <p className="m-0 text-white">{el?.description}</p>
                        
                        <div className="button mb-n4 mt-3" style={{display:'flex',justifyContent:'center'}}>
                          
                          <Link to={"/showvehicle/" + el._id}>
                            <button
                              className="btn btn-primary mt-4 py-2 px-3"
                              style={{
                                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                                borderRadius: "2px",
                              }}
                            >
                              Available Vehicles
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                {/* <div className="col-lg-4 col-md-6 mb-2">
                <div className="service-item active d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="fa fa-2x fa-money-check-alt text-secondary" />
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">02</h1>
                  </div>
                  <h4 className="text-uppercase mb-3">Car Financing</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                    rebum stet, justo elitr dolor amet sit sea sed
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-2">
                <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="fa fa-2x fa-car text-secondary" />
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">03</h1>
                  </div>
                  <h4 className="text-uppercase mb-3">Car Inspection</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                    rebum stet, justo elitr dolor amet sit sea sed
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-2">
                <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="fa fa-2x fa-cogs text-secondary" />
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">04</h1>
                  </div>
                  <h4 className="text-uppercase mb-3">Auto Repairing</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                    rebum stet, justo elitr dolor amet sit sea sed
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-2">
                <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="fa fa-2x fa-spray-can text-secondary" />
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">05</h1>
                  </div>
                  <h4 className="text-uppercase mb-3">Auto Painting</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                    rebum stet, justo elitr dolor amet sit sea sed
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 mb-2">
                <div className="service-item d-flex flex-column justify-content-center px-4 mb-4">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div
                      className="d-flex align-items-center justify-content-center bg-primary ml-n4"
                      style={{ width: 80, height: 80 }}
                    >
                      <i className="fa fa-2x fa-pump-soap text-secondary" />
                    </div>
                    <h1 className="display-2 text-white mt-n2 m-0">06</h1>
                  </div>
                  <h4 className="text-uppercase mb-3">Auto Cleaning</h4>
                  <p className="m-0">
                    Kasd dolor no lorem nonumy sit labore tempor at justo rebum
                    rebum stet, justo elitr dolor amet sit sea sed
                  </p>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </>
      </>
    </>
  );
}
