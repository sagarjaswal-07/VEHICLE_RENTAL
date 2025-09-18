import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../User/Loader";

export default function UpdateOwnerProfile() {
  const [name, setName] = useState("");

  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [ownerImage, setOwnerImage] = useState({});
  const [prevImage, setPrevImage] = useState([]);
  const [imageName, setImageName] = useState("");

  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");
  const params = useParams("");
  const id = params.id;
  const nav = useNavigate();

  useEffect(() => {
    let data = {
      _id: sessionStorage.getItem("ownerId"),
    };
    apiServices.getsingleOwnerData(data).then((res) => {
      setName(res.data.data.name);
      setContact(res.data.data.contact);
      setAddress(res.data.data.address);
      setZipCode(res.data.data.zipCode);
      setPrevImage(res.data.data.ownerImage);
    });
  }, []);

  const imageHandle = (e) => {
    setOwnerImage(e.target.files[0]);
    setImageName(e.target.value);
  };

  const updateData = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("contact", contact);
    data.append("address", address);
    data.append("zipCode", zipCode);
    data.append("ownerImage", ownerImage);
    data.append("_id", id);
    setLoader(true);
    setDisplay("none");
    apiServices
      .updateOwnerData(data)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          nav("/owner/profile");
        }, 200);
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
    setTimeout(() => {
      setDisplay("block");
      setLoader(false);
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
              Update Profile
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  Home
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">Update Profile</h6>
            </div>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5 " style={{ display: display }}>
          <div
            className="container mt-n5 pt-5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-4">
              Update <span className="text-primary">Profile</span>
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
                        <div className="form-floating">
                          <label>Enter Name</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter name"

                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label htmlFor="">Enter Contact</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            placeholder="Enter contact"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}

                            pattern="^\d{10}$"
                            value={contact}
                            minLength={10}
                            maxLength={10}
                            onChange={(e) => setContact(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label>Enter Address</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter address"

                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12  form-group">
                        <div className="form-flaoting">
                          <label htmlFor="">Enter Zip Code</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter zip code"

                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-6 col-sm-12 mb-4">
                        <label for="floatingPassword">Previous Image</label>
                        <img
                          className="ml-4"
                          src={prevImage}
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          height={"170px"}
                        />
                      </div>

                      <div className="col-6 col-sm-12 form-group">
                        <div class="form-floating">
                          <label for="floatingPassword">Upload Image</label>
                          <input
                            type="file"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                              height: "50px",
                            }}
                            class="form-control pt-3"
                            onChange={imageHandle}
                            id="floatingPassword"
                            placeholder="Upload image"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        className="btn btn-primary py-3 px-5 offset-md-5 mt-4"
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
        {/* Contact End */}
      </>
    </>
  );
}
