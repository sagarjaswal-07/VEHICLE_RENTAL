import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
// import { Link } from "react-router-dom"
// import { toast } from "react-toastify"

export default function ManageQueries() {
  const [queryData, setQueryData] = useState([]);

  useEffect(() => {
    apiServices
      .getallQueries()
      .then((res) => {
        setQueryData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleReply = (email, subject, message) => {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    window.open(gmailURL, "_blank");
  };

  return (
    <>
      <>
        {/* Page Header Start */}
        <div className="container-fluid page-header">
          <h1 className="display-3 text-uppercase text-white mb-3">
            Manage Queries
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">Manage Queries</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5">
          <div
            className="container p-5 mt-n5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-5">
              Manage <span className="text-primary">Queries</span>
            </h1>
            <div className="row">
              <div className="col-lg-12  mb-2 ">
                <table className="table table-bordered mx-auto">
                  <thead>
                    <tr>
                      <th scope="col">Sr. No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Subject</th>
                      <th scope="col">Message</th>
                      <th scope="col">Reply</th>
                    </tr>
                  </thead>
                  <tbody>
                    {queryData?.map((el, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{el.name}</td>
                          <td>{el.email}</td>
                          <td>{el.subject}</td>
                          <td>{el.message}</td>
                          <td>
                            {" "}
                            <button
                              className="btn btn-success btn-lg"
                              onClick={() =>
                                handleReply(el?.email, el?.subject, el?.message)
                              }
                              style={{
                                boxShadow: "3px 4px 8px #2b2e4a",
                                borderRadius: "2px",
                              }}
                            >
                              Reply on G-Mail
                            </button>
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
