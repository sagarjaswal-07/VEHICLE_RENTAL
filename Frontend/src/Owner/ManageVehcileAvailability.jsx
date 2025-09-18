import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManageVehiclesAvailability() {
  const [vehicleAvailabilityData, setVehicleAvailabilityData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    let data = {
      ownerId: sessionStorage.getItem("ownerId"),
    };

    apiServices
      .getallVehicleAvailabilityData(data)
      .then((res) => {
        setVehicleAvailabilityData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [isDelete]);

  const deleteData = (id) => {
    setIsDelete(true);
    const data = {
      _id: id,
    };
    apiServices
      .deleteVehicleAvailabilityData(data)
      .then((res) => {
        toast.success(res.data.message);
        setIsDelete(false);
      })
      .catch((err) => {
        console.log(err);
        setIsDelete(false);
      });
  };

  return (
    <>
      <>
        {/* Page Header Start */}
        <div className="container-fluid page-header">
          <h1 className="display-3 text-uppercase text-white mb-3">
            View Vehicles Availability
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">View Vehicles Availability</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5" >
          <div className="container-fluid mt-n5 pt-2 pb-3" style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }} >
            <h1 className="display-4 text-uppercase mt-5 text-center mb-5">
              View <span className="text-primary">Vehicles Availability</span>
            </h1>
            <div className="row  ">
              <div
                className="col-lg-12 mt-4  table-responsive mx-auto mb-2 managedata"
                
              >
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sr. No</th>
                      <th scope="col">Vehicle Name</th>
                      <th scope="col">Week Start Date</th>
                      <th scope="col">Week End Date</th>
                      <th scope="col">Monday</th>
                      <th scope="col">Tuesday</th>
                      <th scope="col">Wednesday</th>
                      <th scope="col">Thursday</th>
                      <th scope="col">Friday</th>
                      <th scope="col">Saturday</th>
                      <th scope="col">Sunady</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleAvailabilityData?.map((el, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{el.vehicleId?.vehicleName}</td>
                          <td>{el.weekStartDate}</td>
                          <td>{el.weekEndDate}</td>
                          <td>{el.monday}</td>
                          <td>{el.tuesday}</td>
                          <td>{el.wednesday}</td>
                          <td>{el.thursday}</td>
                          <td>{el.friday}</td>
                          <td>{el.saturday}</td>
                          <td>{el.sunday}</td>
                          <td>
                            <button
                              className=" btn btn-danger"
                              style={{
                                boxShadow: "3px 4px 8px #2b2e4a",
                                borderRadius: "2px",
                              }}
                              onClick={() => deleteData(el._id)}
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <Link
                              to={"/owner/updatevehiclesavailability/" + el._id}
                            >
                              <button
                                className=" btn btn-info"
                                style={{
                                  boxShadow: "3px 4px 8px #2b2e4a",
                                  borderRadius: "2px",
                                }}
                              >
                                Update
                              </button>
                            </Link>
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
