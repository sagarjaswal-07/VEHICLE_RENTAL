import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManageOwners() {
  const [ownersData, setOwnersData] = useState([]);
  const [isBlock, setIsBlock] = useState(false);
  
  useEffect(() => {
    apiServices
      .getallOwnersData()
      .then((res) => {
        setOwnersData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [isBlock]);

  const updateStatus = (id, userId, status) => {
    let data = {
      _id: id,
      status: status,
    };

    apiServices
      .updateOwnerStatus(data)
      .then((res) => {
        console.log(res.data.message);
        setIsBlock(false)
      })
      .catch((err) => {
        console.log(err);
        
      });

    let data1 = {
      _id: userId,
      status: status,
    };
    apiServices
      .updateUserStatus(data1)
      .then((res) => {
        toast.success(res.data.message);
        console.log(res.data.error);
        setIsBlock(true)
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
            Manage Owners
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">Manage Owners</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5">
          <div
            className="container p-5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-5">
              Manage <span className="text-primary">Owners</span>
            </h1>
            <div className="row pt-5">
              <div className="col-lg-12 mx-auto mb-2">
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">Sr. No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Address</th>
                      <th scope="col">Zip Code</th>
                      <th scope="col">Image</th>
                      <th scope="col">Status</th>

                      <th scope="col">Block / Unblock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ownersData?.map((el, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{el.name}</td>
                          <td>{el.email}</td>
                          <td>{el.contact}</td>
                          <td>{el.address}</td>
                          <td>{el.zipCode}</td>

                          <td>
                            <img
                              src={el.ownerImage}
                              style={{
                                height: "150px",
                                boxShadow: "3px 4px 8px #2b2e4a",
                                borderRadius: "2px",
                              }}
                            />
                          </td>
                          <td>{el.status}</td>
                          <td>
                            { el.status?.toLowerCase() === "unblock" ? (
                              <button
                                className="btn btn-danger px-4"
                                style={{
                                  boxShadow: "2px 2px 8px #2b2e4a",
                                  borderRadius: "2px",
                                }}
                                onClick={() =>
                                  updateStatus(el._id, el.userId, "Blocked")
                                }
                              >
                                Block
                              </button>
                            ) : (
                              <button
                                className="btn btn-success px-3"
                                style={{
                                  boxShadow: "2px 2px 8px #2b2e4a",
                                  borderRadius: "2px",
                                }}
                                onClick={() =>
                                  updateStatus(el._id, el.userId, "Unblock")
                                }
                              >
                                Unblock
                              </button>
                            )}
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
