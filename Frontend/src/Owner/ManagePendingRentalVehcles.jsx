import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../User/Loader";

export default function ManagePendingRentalVehicle() {
  const [rentedVehicleData, setRentedVehicleData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");

  const nav = useNavigate();
  useEffect(() => {
    const data = {
      ownerId: sessionStorage.getItem("ownerId"),
    };
    apiServices
      .getallRentedData(data)
      .then((res) => {
        setRentedVehicleData(res.data.data);

      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const updateStatus = (id, status) => {
    const data = {
      _id: id,
      status: status,
    };
    apiServices
      .updateRentingStatus(data)
      .then((res) => {
        setLoader(true);
        setDisplay("none");
        toast.success(res.data.message);
        if (status == "Accepted") {
          setTimeout(() => {
            nav("/owner/manageacceptedrenting");
          }, 3000);
        }
        if (status == "Rejected") {
          setTimeout(() => {
            setLoader(false);
            setDisplay("block");
            nav("/owner/managerejectedrenting");
          }, 3000);
        }
      })
      .catch((err) => {
        setTimeout(() => {
          setLoader(false);
          setDisplay("block");
        }, 1000);
        console.log(err);
      });
  };

  return (
    <>
      <>
        {loader ? <Loader /> : null}
        {/* Page Header Start */}
        <div style={{ display: display }}>
          <div className="container-fluid page-header">
            <h1 className="display-3 text-uppercase text-white mb-3">
              Manage Pending Rented Vehicles
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  Dashboard
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">
                Manage Pending Rented Vehicles
              </h6>
            </div>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5" style={{ display: display }}>
          <div
            className="container-fluid p-4 mt-n5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-5">
              Manage Pending{" "}
              <span className="text-primary">Rented Vehicles</span>
            </h1>
            <div className="row">
              <div className="col-lg-12 mx-auto mb-2 table-responsive managedata">
                <table className="table table-bordered">
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
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rentedVehicleData?.map((el, index) => (
                      <>
                        {el?.status == "Pending" ? (
                          <>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{el?.customerId?.name}</td>
                              <td>{el?.ownerId?.name}</td>
                              <td>{el?.vehicleId?.vehicleName}</td>
                              <td>{el?.startDate}</td>
                              <td>{el?.endDate}</td>
                              <td>{el?.days}</td>
                              <td>{el?.totalPrice}</td>
                              <td>{el?.specialRequest}</td>
                              <td>{el?.pickupLocation}</td>
                              <td>{el?.dropLocation}</td>
                              <td>{el?.status}</td>
                            <td style={{ width: "20vw" }}>
                              {el.status == ("Pending" || "Unpaid") ? (
                                <>
                                  <button
                                    className="btn btn-danger px-4 "
                                    style={{
                                      boxShadow: "3px 4px 8px #2b2e4a",
                                      borderRadius: "2px",
                                    }}
                                    onClick={() =>
                                      updateStatus(el._id, "Rejected")
                                    }
                                  >
                                    Reject
                                  </button>
                                  <button
                                    className="btn btn-success ml-2 px-3 "
                                    style={{
                                      boxShadow: "3px 4px 8px #2b2e4a",
                                      borderRadius: "2px",
                                    }}
                                    onClick={() =>
                                      updateStatus(el._id, "Accepted")
                                    }
                                  >
                                    Accept
                                  </button>
                                </>
                              ) : el.status == ("Approved" || "Rejected") ? (
                                <>
                                  <h6>No action Can Performed</h6>
                                </>
                              ) : null}
                            </td>

                            </tr>
                          </>
                        ) : null}
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
