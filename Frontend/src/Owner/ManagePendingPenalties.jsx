import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManagePendingPenalties() {
  const [penaltyData, setPenaltyData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {
    const data = {
      ownerId: sessionStorage.getItem("ownerId"),
    };

    apiServices
      .getallPenaltyData(data)
      .then((res) => {
        setPenaltyData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [isDelete]);

  const updateStatus = (id, status) => {
    const data = {
      _id: id,
      status: status,
    };
    apiServices
      .updatePenaltyStatus(data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteData = (id) => {
    const data = {
      _id: id,
    };
    apiServices
      .deletePenaltyData(data)
      .then((res) => {
        toast.success(res.data.message);
        setIsDelete(true);
      })
      .catch((err) => {
        console.log(err);
        setIsDelete(true);
      });
  };

  return (
    <>
      <>
        {/* Page Header Start */}
        <div className="container-fluid page-header">
          <h1 className="display-3 text-uppercase text-white mb-3">
            Manage Pending Penalties
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">
              Manage Pending Penalties
            </h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5">
          <div
            className="container-fluid mt-n5 p-5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-5">
              Manage <span className="text-primary">Pending Penalties</span>
            </h1>
            <div className="row">
              <div className="col-lg-12 mx-auto mt-4 mb-2 table-responsive managedata">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sr. No</th>
                      <th scope="col"> Customer Name</th>
                      <th scope="col">Vehicle Name</th>
                      <th scope="col">Penalty Amount</th>
                      <th scope="col">Penalty Type</th>
                      <th scope="col">Penalty Description</th>
                      <th scope="col">Issued Date</th>
                      <th scope="col">Due Date</th>

                      <th scope="col">Status</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {penaltyData.filter((el) => el.status === "Pending")
                      .length === 0 ? (
                      <tr>
                      <td colSpan="11" className="text-center">
                        <h1 className="mt-5 mb-5">
                          <i className="bi bi-star-fill text-info"></i>
                          Congratulations! You have no pending penalties
                          <i className="bi bi-balloon-fill text-info"></i>
                        </h1>
                      </td>
                      </tr>
                    ) : (
                      penaltyData
                        .filter((el) => el.status === "Pending")
                        .map((el, index) => (
                          <tr key={el._id}>
                            <td>{index + 1}</td>
                            <td>{el.customerId?.name}</td>
                            <td>{el.vehicleId?.vehicleName}</td>
                            <td>{el.penaltyAmount}</td>
                            <td>{el.penaltyType?.penaltyRules}</td>
                            <td>{el.penaltyDescription}</td>
                            <td>{el.issuedDate}</td>
                            <td>{el.dueDate}</td>
                            <td>{el.status}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteData(el._id)}
                                style={{
                                  boxShadow: "2px 2px 8px #2b2e4a",
                                  borderRadius: "2px",
                                }}
                              >
                                Delete
                              </button>
                            </td>
                            <td>
                              <Link to={`/owner/updatepenalties/${el._id}`}>
                                <button
                                  className="btn btn-info"
                                  style={{
                                    boxShadow: "2px 2px 8px #2b2e4a",
                                    borderRadius: "2px",
                                  }}
                                >
                                  Update
                                </button>
                              </Link>
                            </td>
                          </tr>
                        ))
                    )}
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
