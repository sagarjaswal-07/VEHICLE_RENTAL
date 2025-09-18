import { use, useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../User/Loader";

export default function OwnerProfile() {
  const [ownerName, setOwnerName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [image, setImage] = useState([]);
  const [ownerId, setOwnerId] = useState("");
  useEffect(() => {
    const data = {
      _id: sessionStorage.getItem("ownerId"),
    };

    apiServices
      .getsingleOwnerData(data)
      .then((res) => {

        setOwnerName(res.data.data.name);
        setEmail(res.data.data.email);
        setContact(res.data.data.contact);
        setAddress(res.data.data.address);
        setZipCode(res.data.data.zipCode);
        setImage(res.data.data.ownerImage);
        setOwnerId(res.data.data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  return (
    <>
      <>
        {/* Page Header Start */}
        <div className="container-fluid page-header">
          <h1 className="display-3 text-uppercase text-white mb-3">
            Welcome to Profile
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Dashboard
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">Welcome to Profile</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5">
          <div className="container py-5 mt-n5">
            <h1 className="display-4 text-uppercase text-center mb-5 mt-n5">
              Welcome <span className="text-primary">to Profile</span>
            </h1>
            <div
              className="row"
              style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto" }}
            >
              <div
                className=" team-carousel position-relative bg-secondary mt-4 offset-md-4 "
                style={{
                  padding: "0 30px",
                  width: "400px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                  borderRadius: "2px",
                }}
              >
                <div className="team-item bg-secondary mt-3">
                  <img
                    className="img-fluid mb-4 rounded-circle"
                    src={image}
                    style={{
                      height: "250px",
                      width: "250px",
                      boxShadow: "0 6px 8px rgba(0, 0, 0, 0.9)",
                      borderRadius: "2px",
                    }}
                    alt=""
                  />
                  <div className="position-relative py-4 ">
                    <h5 className="text-uppercase mb-2 text-white">
                      <span className="text-uppercase text-primary">
                        Name :{" "}
                      </span>{" "}
                      {ownerName}
                    </h5>
                    <h5 className="text-uppercase text-white text-center">
                      <span className="text-primary">Email : </span>
                      {email}
                    </h5>
                    <h5 className="text-uppercase text-white">
                      <span className="text-primary">Contact : </span>
                      {contact}
                    </h5>
                    <h5 className="text-uppercase text-white">
                      <span className="text-primary">Address : </span>
                      {address}
                    </h5>
                    <h5 className="text-uppercase text-white">
                      <span className="text-primary">Zip Code : </span>
                      {zipCode}
                    </h5>
                    <div className="team-social position-absolute w-100 h-100 d-flex align-items-center justify-content-center">
                      <a
                        className="btn btn-lg btn-primary btn-lg-square mx-1"
                        style={{
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                          borderRadius: "2px",
                        }}
                        href="#"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        className="btn btn-lg btn-primary btn-lg-square mx-1"
                        style={{
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                          borderRadius: "2px",
                        }}
                        href="#"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        className="btn btn-lg btn-primary btn-lg-square mx-1"
                        style={{
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                          borderRadius: "2px",
                        }}
                        href="#"
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </div>
                  </div>
                  <Link to={"/owner/updateprofile/" + ownerId}>
                    <button
                      className="btn btn-primary px-3 mt-3 mb-5"
                      style={{
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.9)",
                        borderRadius: "2px",
                      }}
                    >
                      Update Profile
                    </button>
                  </Link>
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
