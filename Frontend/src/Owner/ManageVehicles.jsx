import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManageVehicles() {
  const [vehicleData, setVehicleData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  useEffect(() => {
    const data = {
      ownerId: sessionStorage.getItem("ownerId"),
    };
    apiServices
      .getallVehicles(data)
      .then((res) => {
        setVehicleData(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [isDelete]);

  const deleteData = (id) => {
    setIsDelete(true);
    let data = {
      _id: id,
    };

    apiServices
      .deleteVehicleData(data)
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
            Manage Vehicles
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">Manage Vehicles</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5 mt-n3">
          <div
            className="container-fluid mt-n5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 p-5 text-uppercase text-center mb-3">
              Manage <span className="text-primary">Vehicles</span>
            </h1>
            <div className="row ml-1 " style={{ width: "100%" }}>
              <div className="col-lg-12 mt-0 table-responsive mx-auto mb-2 managedata ">
                <table className=" table table-bordered ">
                  <thead>
                    <tr>
                      <th scope="col">Sr. No</th>
                      <th scope="col">Vehicle Name</th>
                      <th scope="col">Manufacturer</th>
                      <th scope="col">Model</th>
                      <th scope="col">Year</th>
                      <th scope="col">Vehicle Type</th>
                      <th scope="col">Plate Number</th>
                      <th scope="col">Fuel Type</th>
                      <th scope="col">Distance Driven</th>
                      <th scope="col">Transmission</th>
                      <th scope="col">Price Per Day</th>
                      <th scope="col">Image</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicleData?.map((el, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{el.vehicleName}</td>
                          <td>{el.make}</td>
                          <td>{el.model}</td>
                          <td>{el.year}</td>
                          <td>{el.categoryId?.categoryName}</td>
                          <td>{el.plateNumber}</td>
                          <td>{el.feulType}</td>
                          <td>{el.mileage}</td>
                          <td>{el.transmission}</td>
                          <td>{el.pricePerDay}</td>
                          <td>
                            <img
                              src={el.vehicleImage
                              }
                              style={{
                                boxShadow: "3px 4px 8px #2b2e4a",
                                borderRadius: "2px",
                              }}
                              height={"100px"}
                              width={"100px"}
                            />
                          </td>
                          <td>
                            <button
                              className=" btn btn-danger"
                              onClick={() => deleteData(el._id)}
                              style={{
                                boxShadow: "3px 4px 8px #2b2e4a",
                                borderRadius: "2px",
                              }}
                            >
                              Delete
                            </button>
                          </td>
                          <td>
                            <Link to={"/owner/updatevehicles/" + el._id}>
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
