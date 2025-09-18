import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ViewPenaltyRules() {
  const [penaltyRulesData, setPenaltyRulesData] = useState([]);

  useEffect(() => {
    apiServices
      .getallPenaltyRulesData()
      .then((res) => {
        setPenaltyRulesData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },[]);

  const deleteData = (id) => {
    const data = {
      _id: id,
    };
    apiServices
      .deletePenaltyRulesData(data)
      .then((res) => {
        toast.success(res.data.message);
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
            View Penalty Rules
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">View Penalty Rules</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5">
          <div className="container pt-5 mt-n5 pb-3" style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}>
            <h1 className="display-4 text-uppercase text-center mb-2">
              View <span className="text-primary">Penalty Rules</span>
            </h1>
            <div className="row">
              <div
                className="col-lg-12  p-5 mx-auto mb-2"
              >
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sr. No</th>
                      <th scope="col">Rules</th>
                    </tr>
                  </thead>
                  <tbody>
                    {penaltyRulesData?.map((el, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{el.penaltyRules}</td>
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
