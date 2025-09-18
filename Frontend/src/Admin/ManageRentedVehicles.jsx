import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

export default function ManageRentedVehciles() {
  const [rentedVehicleData, setRentedVehicleData] = useState([]);

  useEffect(() => {
    apiServices
      .getallRentedData()
      .then((res) => {
        setRentedVehicleData(res.data.data);
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
            View Rented Vehicles
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">
              View Rented Vehicles
            </h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5">
          <div className="container-fluid p-4 mt-n5 pb-3"
                      style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}>
            <h1 className="display-4 text-uppercase text-center pt-4 mb-5">
              View <span className="text-primary">Rented Vehicles</span>
            </h1>
            <div className="row m-3 mb-2">
              <div className="col-lg-12 ">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th scope="col"><h5>Sr. No</h5></th>
                      <th scope="col"><h5>Customer Name</h5> </th>
                      <th scope="col"><h5>Owner Name</h5></th>
                      <th scope="col"><h5>Vehicle Name</h5></th>
                      <th scope="col"><h5>Start Date</h5></th>
                      <th scope="col"><h5>End Date</h5></th>
                      <th scope="col"><h5>Days</h5></th>
                      <th scope="col"><h5>Total Price</h5></th>
                      <th scope="col"><h5>Special Request</h5></th>
                      <th scope="col"><h5>Pickup Location</h5></th>
                      <th scope="col"><h5>Drop Location</h5></th>
                      <th scope="col"><h5>Status</h5></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentedVehicleData?.map((el, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{el.customerId?.name}</td>
                          <td>{el.ownerId?.name}</td>
                          <td>{el.vehicleId?.vehicleName}</td>
                          <td>{el.startDate}</td>
                          <td>{el.endDate}</td>
                          <td>{el.days}</td>
                          <td>{el.totalPrice}</td>
                          <td>{el.specialRequest}</td>
                          <td>{el.pickupLocation}</td>
                          <td>{el.dropLocation}</td>
                          <td><h6>{el.status}</h6></td>
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
