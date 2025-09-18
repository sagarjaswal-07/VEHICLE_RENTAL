import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link, useParams } from "react-router-dom";

export default function ShowVehicles() {
  const params = useParams();
  const id = params.id;
  const [vehicleData, setVehicleData] = useState([]);

useEffect(() => {
  if (!id) return; // only run if id is defined

  const data = {
    categoryId: id,
  };

  apiServices.getallVehicles(data).then((res) => {
    setVehicleData(res.data.data);
  }).catch(err => {
    console.log(err);
  });
}, [id]);

  return (
    <>
      <>
        {/* Page Header Start */}
        <div className="container-fluid page-header">
          <h1 className="display-3 text-uppercase text-white mb-3">
            Car Listing
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Home
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">Car Listing</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Rent A Car Start */}
        <div className="container-fluid py-5">
          <div className="container pt-0 mt-n5 pb-3">
            <h1 className="display-4 text-uppercase text-center mb-5">
              Find <span className="text-primary">Your Car</span>
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
                         src={
                                el.vehicleImage.startsWith("http")
                                  ? el.vehicleImage
                                  : BASE_IMAGE_URL + el.vehicleImage
                              }
                        style={{
                          height: "250px",
                          width: "250px",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                          borderRadius: "2px",
                          backgroundSize:'cover'
                        }}
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
                      <button
                        className="btn btn-primary px-3"
                        style={{ borderRadius: "2px" }}
                        href=""
                      >
                        Rs.{el.pricePerDay} Per/day
                      </button>

                      <Link to={"/vehicle-details/" + el._id}>
                        <button
                          className="btn btn-info mt-4 px-3 "
                          style={{
                            marginLeft: "0%",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.9)",
                            borderRadius: "2px",
                          }}
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
      </>
    </>
  );
}
