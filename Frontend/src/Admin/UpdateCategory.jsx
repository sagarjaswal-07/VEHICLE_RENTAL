import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../User/Loader";

export default function UpdateCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState({});
  const [description, setDescription] = useState("");
  const [prevImage, setPrevImage] = useState([]);
  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");

  const params = useParams();
  const id = params.id;
  const nav = useNavigate();

  useEffect(() => {
        const data = {
      _id: id,
    };
    apiServices.getsingleCategory(data).then((res) => {
      setCategoryName(res.data.data.categoryName);
      setDescription(res.data.data.description);
      setPrevImage(res.data.data.categoryImage);
    });
  }, [id]);
  const imageHandle = (e) => {
    setImage(e.target.files[0]);
  };

  const updateData = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("categoryName", categoryName);
    data.append("categoryImage", image);
    data.append("description", description);
    data.append("_id", id);
    setLoader(true);
    setDisplay("none");
    apiServices
      .updateCategoryData(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          setTimeout(() => {
            nav("/admin/managecategory");
          }, 1000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setTimeout(() => {
      setLoader(false);
      setDisplay("block");
    }, 3000);
  };
  return (
    <>
      <>
        {loader ? <Loader /> : null}
        {/* Page Header Start */}
        <div style={{ display: display }}>
          <div className="container-fluid page-header">
            <h1 className="display-3 text-uppercase text-white mb-3">
              Update Category
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  Dashboard
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">Update Catgeory</h6>
            </div>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5 " style={{ display: display }}>
          <div
            className="container p-5 mt-n5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-5">
              Update <span className="text-primary">Category</span>
            </h1>
            <div className="row">
              <div className="col-lg-9 mx-auto mb-2">
                <div
                  className="contact-form bg-light mb-4"
                  style={{ padding: 30 }}
                >
                  <form onSubmit={updateData}>
                    <div className="row">
                      <div className="col-12 form-group">
                        <div className="from-floating">
                          <label>Enter Category Name</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter category name"
                            required="required"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-6 form-group mt-4">
                        <label for="floatingPassword" className="mt-n5">
                          Previous Image{" "}
                        </label>
                        <img
                          src={prevImage}
                          style={{
                            height: "150px",
                            marginLeft: "25px",
                            boxShadow: "3px 4px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <div class="form-floating pt-5">
                          <label for="floatingPassword">Upload Image</label>
                          <input
                            type="file"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            class="form-control "
                            onChange={imageHandle}
                            id="floatingPassword"
                            placeholder="Upload image"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="form-floating mt-4">
                        <label>Enter Description</label>
                        <textarea
                          className="form-control py-3 px-4"
                          rows={5}
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          placeholder="Enter description"
                          required="required"
                          defaultValue={""}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn btn-primary mt-5 py-3 px-5 offset-md-5"
                        style={{
                          boxShadow: "3px 4px 8px #2b2e4a",
                          borderRadius: "2px",
                        }}
                        type="submit"
                      >
                        SAVE
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact End */}
      </>
    </>
  );
}
