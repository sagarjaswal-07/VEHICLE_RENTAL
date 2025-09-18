import { use, useState } from "react";
import apiServices from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../User/Loader";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");

  const nav = useNavigate();

  const imageHandle = (e) => {
    setImage(e.target.files[0]);
    setImageName(e.target.value);
  };

  const addData = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("categoryName", categoryName);
    data.append("categoryImage", image);
    data.append("description", description);
    setLoader(true);
    setDisplay("none");
    apiServices
      .addCategory(data)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          nav("/admin/managecategory");
        }, 3000);
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
            <h1 className="display-3 text-uppercase text-center text-white mb-3">
              Add Category
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  Dashboard
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">Add Catgeory</h6>
            </div>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5 " style={{ display: display }}>
          <div
            className="container pt-5 mt-n5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-5">
              add <span className="text-primary">categories</span>
            </h1>
            <div className="row pt-0">
              <div className="col-lg-9 mx-auto mb-2">
                <div
                  className="contact-form bg-light mb-4"
                  style={{ padding: 30 }}
                >
                  <form onSubmit={addData}>
                    <div className="row">
                      <div className="col-12 form-group">
                        <label for="floatingPassword">
                          Enter Category Name
                        </label>
                        <input
                          type="text"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-3"
                          placeholder="Enter Category Name"
                          required="required"
                          value={categoryName}
                          onChange={(e) => setCategoryName(e.target.value)}
                        />
                      </div>
                      <div className="col-12 form-group">
                        <div class="form-floating">
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
                      <label for="floatingPassword">
                        Enter Description Here
                      </label>
                      <textarea
                        className="form-control py-3 px-4"
                        rows={5}
                        placeholder="Enter Description"
                        style={{
                          boxShadow: "2px 2px 8px #2b2e4a",
                          borderRadius: "2px",
                        }}
                        required="required"
                        defaultValue={""}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-primary mt-5 py-3 px-5 offset-md-5"
                        type="submit"
                        style={{
                          boxShadow: "3px 4px 8px #2b2e4a",
                          borderRadius: "2px",
                        }}
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
