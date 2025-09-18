import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function MyBooking() {
  const [rentedVehicleData, setRentedVehicleData] = useState([]);

  useEffect(() => {
    const data = {
      customerId: sessionStorage.getItem("customerId"),
    };
    console.log(data);
    apiServices
      .getallRentedData(data)
      .then((res) => {
        setRentedVehicleData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },[]);

const updateStatus = (id, status) => {
  const data = {
    _id: id,
    status: status,
  };
  apiServices
    .updateRentingStatus(data)
    .then((res) => {
      toast.success(res.data.message);

      // Update the local state so the table re-renders automatically
      setRentedVehicleData((prevData) =>
        prevData.map((el) =>
          el._id === id ? { ...el, status: status } : el
        )
      );
    })
    .catch((err) => {
      console.log(err);
    });
};


  return (
    <>
      <>
        {/* Page Header Start */}
        <div className="container-fluid page-header">
          <h1 className="display-3 text-uppercase text-white mb-3">
            My Rentings
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">My Rentings</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5">
          <div
            className="container-fluid pt-5 mt-n5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-0">
              My <span className="text-primary">Rentings</span>
            </h1>
            <div className="row pt-4">
              <div className="col-lg-12 mx-auto mb-2 table-responsive p-5 managedata mr-2 w-full ">
                <table className="table table-bordered ">
                  <thead>
                    <tr>
                      <th scope="col">Sr. No</th>
                      <th scope="col"> Customer Name</th>
                      <th scope="col">Owner Name</th>
                      <th scope="col">Vehicle Name</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>
                      <th scope="col">Days</th>
                      <th scope="col">Total Price</th>
                      <th scope="col">Special Request</th>
                      <th scope="col">Pickup Location</th>
                      <th scope="col">Drop Location</th>
                      <th scope="col">Status</th>

                      <th>Action</th>
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
                          <td>{el.status}</td>

                          <td>
                            {el.status == "Completed" ? (
                              <>{/* Completed status content */}</>
                            ) : el.status == "Accepted" ||
                              el.status == "Pending" ? (
                              <>
                                <button
                                  className="btn btn-danger"
                                  style={{
                                    boxShadow: "2px 2px 8px #2b2e4a",
                                    borderRadius: "2px",
                                  }}
                                  onClick={() =>
                                    updateStatus(el._id, "Cancelled")
                                  }
                                >
                                  Cancel
                                </button>
                              </>
                            ) : el.status == "Cancelled" || el.status == "Completed"  ? (
                              <>
                                <h5>
                                  Your Renting has been{" "}
                                  <span className="text-danger">Cancelled</span>
                                </h5>
                              </>
                            ) : <h5>No Actions Can be Perfromed</h5>}
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
