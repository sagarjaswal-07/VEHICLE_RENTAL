import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";


export default function ViewVehicles() {
  const [vehicleData, setVehicleData] = useState([]);

  useEffect(() => {
    apiServices
      .getallVehicles()
      .then((res) => {
        setVehicleData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },[]);

  return (
    <>
      <>
        {/* Page Header Start */}
        <div className="container-fluid page-header">
          <h1 className="display-3 text-uppercase text-white mb-3">
            View Vehicles
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">View Vehicles</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid  py-5">
          <div
            className="container-fluid p-5 mt-n5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase  text-center mb-5">
              View <span className="text-primary">Vehicles</span>
            </h1>
            <div className="row">
              <div className="col-lg-12 table-responsive mx-auto mb-2">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sr. No</th>
                      <th scope="col">Vehicle Name</th>
                      <th scope="col">Manufacturer</th>
                      <th scope="col">Model</th>
                      <th scope="col">Year</th>
                      <th scope="col">Vehicle Type</th>
                      <th scope="col">Plate Number</th>
                      <th scope="col">Feul Type</th>
                      <th scope="col">Distance Driven</th>
                      <th scope="col">Transmission</th>
                      <th scope="col">Price Per Day</th>
                      <th scope="col">Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleData?.map((el, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{el.vehicleName}</td>
                          <td>{el.make}</td>
                          <td>{el.model}</td>
                          <td>{el.year}</td>
                          <td>{el.categoryId?.categoryName}</td>
                          <td>{el.plateNumber}</td>
                          <td>{el.feulType}</td>
                          <td>{el.mileage}</td>
                          <td>{el.transmission}</td>
                          <td>{el.pricePerDay}</td>
                          <td>
                            <img
                              src={el.vehicleImage}
                              style={{
                                boxShadow: "3px 4px 8px #2b2e4a",
                                borderRadius: "2px",
                              }}
                              height={"100px"}
                            />
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* Contact End */}
      </>
    </>
  );
}
