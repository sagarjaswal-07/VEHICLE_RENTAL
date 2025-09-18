import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ManageCategory() {
  const [categoryData, setCategoryData] = useState([]);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    apiServices
      .getallCategory()
      .then((res) => {
        setCategoryData(res.data.data);
        console.log(res.data)
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
      .deleteCategoryData(data)
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
            Manage Category
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">Manage Catgeory</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5">
          <div
            className="container p-5 mt-n5  pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-n0">
              Manage <span className="text-primary">Category</span>
            </h1>
            <div className="row pt-5">
              <div className="col-lg-12 mx-auto mb-2">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Sr. No</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Image</th>
                      <th scope="col">Description</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData?.map((el, index) => (
                      <>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{el.categoryName}</td>
                          <td>
                            <img
                              src={el.categoryImage}
                              style={{
                                height: "150px",
                                boxShadow: "3px 4px 8px #2b2e4a",
                                borderRadius: "2px",
                              }}
                            />
                          </td>
                          <td>{el.description}</td>
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
                            <Link to={"/admin/updatecategory/" + el._id}>
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
