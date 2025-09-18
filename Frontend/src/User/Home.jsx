import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link } from "react-router-dom";
export default function Home() {
  const [categoryData, setCategoryData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [ownerData, setOwnerData] = useState([]);
  useEffect(() => {
    apiServices.getallCategory().then((res) => {
      setCategoryData(res.data.data);
    });
  },[]);

  useEffect(() => {
    apiServices.getallVehicles().then((res) => {
      setVehicleData(res.data.data);
    });
  },[]);

  useEffect(() => {
    apiServices
      .getallOwnersData()
      .then((res) => {
        setOwnerData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  return (
    <>
      <>
        {/* Carousel Start */}
        <div className="container-fluid p-0" style={{ marginBottom: 90 }}>
          <div
            id="header-carousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="w-100" src="img/carousel-1.jpg" alt="Image" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: 900 }}>
                    <h4 className="text-white text-uppercase mb-md-3">
                      Rent A Car
                    </h4>
                    <h1 className="display-1 text-white mb-md-4">
                      Best Rental Cars In Your Location
                    </h1>
                    <a href="" className="btn btn-primary py-md-3 px-md-5 mt-2"                        style={{
                                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.9)",
                                borderRadius: "2px",
                              }}>
                      Reserve Now
                    </a>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: 900 }}>
                    <h4 className="text-white text-uppercase mb-md-3">
                      Rent A Car
                    </h4>
                    <h1 className="display-1 text-white mb-md-4">
                      Quality Cars with Unlimited Miles
                    </h1>
                    <a href="" className="btn btn-primary py-md-3 px-md-5 mt-2"                             style={{
                                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.9)",
                                borderRadius: "2px",
                              }}>
                      Reserve Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#header-carousel"
              data-slide="prev"
            >
              <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                <span className="carousel-control-prev-icon mb-n2" />
              </div>
            </a>
            <a
              className="carousel-control-next"
              href="#header-carousel"
              data-slide="next"
            >
              <div className="btn btn-dark" style={{ width: 45, height: 45 }}>
                <span className="carousel-control-next-icon mb-n2" />
              </div>
            </a>
          </div>
        </div>
        {/* Carousel End */}
        {/* About Start */}
        <div className="container-fluid py-5">
          <div className="container pt-5 pb-3">
            <h1 className="display-1 text-primary text-center">01</h1>
            <h1 className="display-4 text-uppercase text-center mb-5">
              Welcome To <span className="text-primary">Rent4U</span>
            </h1>
            <div className="row justify-content-center">
              <div className="col-lg-10 text-center">
                <img className="w-75 mb-4" src="img/about.png" alt="" />
                <p>
                  "Looking for the perfect ride for your next adventure or
                  business trip? , we offer a wide range of vehicles to suit
                  every need and budget. Whether you're looking for a sleek
                  sedan, a spacious SUV, or something for a road trip with
                  friends, we have the ideal vehicle for you. Our easy booking
                  process, competitive prices, and top-notch customer service
                  ensure that your experience is smooth and hassle-free from
                  start to finish. Get ready to hit the road with confidence –
                  book your vehicle today and start your journey with us!"
                </p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-lg-4 mb-2 ">
                <div
                  className="d-flex align-items-center bg-secondary  p-4 mb-4"
                  style={{ height: 150, boxShadow: "3px 4px 8px #2b2e4a",
                            borderRadius: "2px", }}
                >
                  <div
                    className="d-flex align-items-center   justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                    style={{ width: 100, height: 100, boxShadow: "3px 4px 8px #2b2e4a",
                            borderRadius: "2px", }}
                  >
                    <i className="fa fa-2x fa-headset  text-secondary" />
                  </div>
                  <h4 className="text-uppercase text-light m-0">
                    24/7 Car Rental Support
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 mb-2">
                <div
                  className="d-flex align-items-center bg-secondary p-4 mb-4"
                  style={{ height: 150, boxShadow: "3px 4px 8px #2b2e4a",
                            borderRadius: "2px",}}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                    style={{ width: 100, height: 100 , boxShadow: "3px 4px 8px #2b2e4a",
                            borderRadius: "2px",}}
                  >
                    <i className="fa fa-2x fa-car text-secondary" />
                  </div>
                  <h4 className="text-light text-uppercase m-0">
                    Car Reservation Anytime
                  </h4>
                </div>
              </div>
              <div className="col-lg-4 mb-2">
                <div
                  className="d-flex align-items-center bg-secondary p-4 mb-4"
                  style={{ height: 150,                            boxShadow: "3px 4px 8px #2b2e4a",
                            borderRadius: "2px", }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                    style={{ width: 100, height: 100, boxShadow: "3px 4px 8px #2b2e4a",
                            borderRadius: "2px", }}
                  >
                    <i className="fa fa-2x fa-map-marker-alt text-secondary" />
                  </div>
                  <h4 className="text-uppercase text-light m-0">
                    Lots Of Pickup Locations
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* About End */}
        {/* Services Start */}
          <div className="container-fluid py-5">
            <div className="container pt-5 pb-3">
                          <h1 className="display-1 text-primary text-center">02</h1>
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
                                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.9)",
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
        {/* Services End */}
        {/* Banner Start */}
        <div className="container-fluid py-5">
          <div className="container py-5">
            <div className="bg-banner py-5 px-4 text-center"                               style={{
                                boxShadow: "3px 4px 8px rgba(0, 0, 0, 0.9)",
                                borderRadius: "2px",
                              }}>
              <div className="py-5">
                <h1 className="display-1 text-uppercase text-primary mb-4">
                  50% OFF
                </h1>
                <h1 className="text-uppercase text-light mb-4">
                  Special Offer For New Members
                </h1>
                <p className="mb-4">
                  Only for Sunday from 1st Jan to 30th Jan 2045
                </p>
                <a className="btn btn-primary mt-2 py-3 px-5"                               style={{
                                boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.9)",
                                borderRadius: "2px",
                              }} href="">
                  Register Now
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Banner End */}
        {/* Rent A Car Start */}
        <div className="container-fluid py-5">
          <div className="container pt-5 pb-3"                       >
            <h1 className="display-1 text-primary text-center">03</h1>
            <h1 className="display-4 text-uppercase text-center mb-5">
              find <span className="text-primary">your car</span>
            </h1>
            <div className="row">
              {vehicleData?.map((el) => (
                <>
                  <div className="col-lg-4 col-md-6 mb-2 mt-1">
                    <div
                      className="rent-item mb-4 bg-secondary mt-4"
                      style={{
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                        borderRadius: "2px",
                      }}
                    >
                      <img
                        className="img-fluid mb-4 mt-3"
                        src={el.vehicleImage}
                        style={{ height: "250px", width: "250px",boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",borderRadius: "2px",}}
                        alt=""
                      />
                      <h4 className="text-uppercase mb-4 text-white">
                        {el.vehicleName}
                      </h4>
                      <div className="d-flex justify-content-center mb-4">
                        <div className="px-2">
                          <i className="fa fa-car text-primary mr-1" />
                          <span>{el.model}</span>
                        </div>
                        <div className="px-2 border-left border-right">
                          <i className="fa fa-cogs text-primary mr-1" />
                          <span>{el.transmission}</span>
                        </div>
                        <div className="px-2">
                          <i className="fa fa-road text-primary mr-1" />
                          <span>{el.mileage}</span>
                        </div>
                      </div>
                      <button className="btn btn-primary px-3" style={{borderRadius: "2px",}} href="">
                        Rs.{el.pricePerDay} Per/day
                      </button>

                      <Link to={"/vehicle-details/" + el._id}>
                        <button
                          className="btn btn-info mt-4 px-3 "
                          style={{ marginLeft: "0%" ,boxShadow: "0 4px 8px rgba(0, 0, 0, 0.9)",borderRadius: "2px",}}
                        >
                          Check Availability
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </div>
        {/* Rent A Car End */}
        {/* Team Start */}
        <div className="container-fluid py-5">
          <div className="container-fluid py-5">
            <h1 className="display-1 text-primary text-center">04</h1>
            <h1 className="display-4 text-uppercase text-center mb-5">
              meet<span className="text-primary"> our team</span>
            </h1>
          <div className="row p-4 " style={{               display: "flex",
                flexWrap: "nowrap",
                overflowX: "auto",}}>
                        {ownerData?.map((el) => (
              <>
            <div
              className=" mb-2   text-white bg-secondary "
              style={{
                padding: "0 30px",
                marginLeft:'50px',
                width:'400px',
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                borderRadius: "2px",
              }}
            >
              <div className="team-item bg-secondary mt-3">
                <img
                  className="img-fluid mb-4 rounded-circle"
                  src={el.ownerImage}
                  style={{
                    height: "250px",
                    width: "250px",
                    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.9)",
                    borderRadius: "2px",
                    objectFit:'cover'
                  }}
                  alt=""
                />
                <div className="position-relative py-4 ">
                  <h5 className="text-uppercase mb-2 text-white">
                    <span className="text-uppercase text-primary">Name : </span>{" "}
                    {el.name}
                  </h5>
                  <h5 className="text-uppercase text-white text-center">
                    <span className="text-primary">Email : </span>
                    {el.email}
                  </h5>
                  <h5 className="text-uppercase text-white">
                    <span className="text-primary">Contact : </span>
                    {el.contact}
                  </h5>
                  <h5 className="text-uppercase text-white">
                    <span className="text-primary">Address : </span>
                    {el.address}
                  </h5>
                  <h5 className="text-uppercase text-white">
                    <span className="text-primary">Zip Code : </span>
                    {el.zipCode}
                  </h5>
                  <div className="team-social position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      style={{
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                        borderRadius: "2px",
                      }}
                      href="#"
                    >
                      <i className="fab fa-twitter" />
                    </a>
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      style={{
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                        borderRadius: "2px",
                      }}
                      href="#"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                    <a
                      className="btn btn-lg btn-primary btn-lg-square mx-1"
                      style={{
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                        borderRadius: "2px",
                      }}
                      href="#"
                    >
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
                {/* <Link to={"/owner/updateprofile/" + ownerId}>
                  <button
                    className="btn btn-primary px-3 mt-3 mb-5"
                    style={{
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                      borderRadius: "2px",
                    }}
                  >
                    Update Profile
                  </button>
                </Link> */}
              </div>
            </div>
                          </>
            ))}
          </div>
          </div>
        </div>
        {/* Team End */}
        {/* Banner Start */}
        {/* <div className="container-fluid py-5">
    <div className="container py-5">
      <div className="row mx-0">
        <div className="col-lg-6 px-0">
          <div
            className="px-5 bg-secondary d-flex align-items-center justify-content-between"
            style={{ height: 350 }}
          >
            <img
              className="img-fluid flex-shrink-0 ml-n5 w-50 mr-4"
              src="img/banner-left.png"
              alt=""
            />
            <div className="text-right">
              <h3 className="text-uppercase text-light mb-3">
                Want to be driver?
              </h3>
              <p className="mb-4">
                Lorem justo sit sit ipsum eos lorem kasd, kasd labore
              </p>
              <a className="btn btn-primary py-2 px-4" href="">
                Start Now
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-6 px-0">
          <div
            className="px-5 bg-dark d-flex align-items-center justify-content-between"
            style={{ height: 350 }}
          >
            <div className="text-left">
              <h3 className="text-uppercase text-light mb-3">
                Looking for a car?
              </h3>
              <p className="mb-4">
                Lorem justo sit sit ipsum eos lorem kasd, kasd labore
              </p>
              <a className="btn btn-primary py-2 px-4" href="">
                Start Now
              </a>
            </div>
            <img
              className="img-fluid flex-shrink-0 mr-n5 w-50 ml-4"
              src="img/banner-right.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  </div> */}
        {/* Banner End */}
        {/* Testimonial Start */}

        {/* Testimonial End */}
        {/* Contact Start */}

        {/* Contact End */}
        {/* Vendor Start */}
        <div className="container-fluid py-5 ">
          <h1 className="display-1 text-primary text-center">05</h1>
          <h1 className="display-4 text-uppercase text-center mb-5">
            Our Partners
          </h1>
          <div className="container py-5">
            <div
              className="vendor-carousel logies69 managedata"
              style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}
            >
              <div className="bg-light p-4">
                <img src="img/vendor-1.png" alt="" />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-2.png" alt="" />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-3.png" alt="" />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-4.png" alt="" />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-5.png" alt="" />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-6.png" alt="" />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-7.png" alt="" />
              </div>
              <div className="bg-light p-4">
                <img src="img/vendor-8.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        {/* Vendor End */}
      </>
    </>
  );
}
