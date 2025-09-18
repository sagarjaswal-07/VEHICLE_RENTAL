import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";

export default function ManagePaidPenalties() {
  const [penaltyData, setPenaltyData] = useState([]);

  useEffect(() => {
    const data = {
      ownerId: sessionStorage.getItem("ownerId"),
    };
    console.log(data);
    apiServices
      .getallPenaltyData(data)
      .then((res) => {
        setPenaltyData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <>
        {/* Page Header Start */}
        <div className="container-fluid page-header">
          <h1 className="display-3 text-uppercase text-white mb-3">
            Manage Paid Penalties
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">
              Manage Paid Penalties
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
              Manage <span className="text-primary">Paid Penalties</span>
            </h1>
            <div className="row">
              <div className="col-lg-12 mx-auto mb-2 table-responsive managedata">
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
                      <th scope="col">Payment Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {penaltyData
                      ?.filter((el) => el.paymentStatus === "Paid")
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
                          <td>{el.paymentStatus}</td>
                        </tr>
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
