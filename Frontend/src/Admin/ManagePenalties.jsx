import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManagePenalties() {
  const [penaltyData, setPenaltyData] = useState([]);

  useEffect(() => {
    apiServices
      .getallPenaltyData()
      .then((res) => {
        setPenaltyData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

const updateStatus = (id, status) => {
  const data = { _id: id, status: status };
  apiServices
    .updatePenaltyStatus(data)
    .then((res) => {
      toast.success(res.data.message);

      // Update the local state so table re-renders automatically
      setPenaltyData((prevData) =>
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
            Manage Penalties
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">Manage Penalties</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5">
          <div
            className="container-fluid p-4 mt-n5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 pt-3 text-uppercase text-center mb-5">
              Manage <span className="text-primary">Penalties</span>
            </h1>
            <div className="row">
              <div className="col-lg-12 mx-auto mb-2 table-responsive">
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

                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {penaltyData?.map((el, index) => (
                      <>
                        <>
                          <tr>
                            <td>{index + 1}</td>
                            <td>{el.customerId?.name}</td>

                            <td>{el.vehicleId?.vehicleName}</td>
                            <td>{el.penaltyAmount}</td>
                            <td>{el.penaltyType?.penaltyRules}</td>
                            <td>{el.penaltyDescription}</td>
                            <td>{el.issuedDate}</td>
                            <td>{el.dueDate}</td>
                            <td>{el.status}</td>

                            <td style={{ width: "20vw" }}>
                              {["Pending", "Unpaid"].includes(el.status) ? (
                                <>
                                  <button
                                    className="btn btn-danger ml-3 px-4"
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
                                    className="btn btn-success ml-3 px-3"
                                    style={{
                                      boxShadow: "3px 4px 8px #2b2e4a",
                                      borderRadius: "2px",
                                    }}
                                    onClick={() =>
                                      updateStatus(el._id, "Approved")
                                    }
                                  >
                                    Approve
                                  </button>
                                </>
                              ) : ["Approved", "Rejected"].includes(
                                  el.status
                                ) ? (
                                <>
                                  <h6>No action Can Performed</h6>
                                </>
                              ) : null}
                            </td>
                          </tr>
                        </>
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
