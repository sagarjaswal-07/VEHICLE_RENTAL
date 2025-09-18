import { useState } from "react";
import apiServices from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../User/Loader";

export default function OwnerRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [ownerImage, setOwnerImage] = useState({});

  const [imageName, setImageName] = useState("");

  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");

  const nav = useNavigate();

  const imageHandle = (e) => {
    setOwnerImage(e.target.files[0]);
    setImageName(e.target.value);
  };

  const addData = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("password", password);
    data.append("contact", contact);
    data.append("address", address);
    data.append("zipCode", zipCode);
    data.append("ownerImage", ownerImage);
    setLoader(true);
    setDisplay("none");
    apiServices
      .ownerRegister(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          setTimeout(() => {
            setName("");
            setEmail("");
            setPassword("");
            setContact("");
            setAddress("");
            setZipCode("");
            setImageName(null);
            setOwnerImage(null);
            nav("/login");
          }, 500);
        } else {
          toast.error(res.data.message);
          console.log(res.data.message);
          console.log(res.data.errors);
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setTimeout(() => {
      setDisplay("block");
      setLoader(false);
    }, 400);
  };
  return (
    <>
      <>
        {loader ? <Loader /> : null}
        {/* Page Header Start */}
        <div style={{ display: display }}>
        <div
          className="container-fluid page-header text-center d-flex justify-content-center"
          
        >
          <h1 className="display-3 text-uppercase text-white mb-3" style={{}}>
            Owner Register
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                home
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">owner</h6>
          </div>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5 " style={{ display: display }}>
          <div className="container pt-0 pb-3">
            <h1 className="display-4 text-uppercase text-center mb-5">
              Owner <span className="text-primary">Register</span>
            </h1>
            <div className="row">
              <div
                className="col-lg-9 pt- mt-3 mx-auto mb-2"
                style={{
                  boxShadow: "3px 4px 8px #2b2e4a",
                  borderRadius: "2px",
                }}
              >
                <div
                  className="contact-form bg-light mb-4"
                  style={{ padding: 30 }}
                >
                  <form onSubmit={addData}>
                    <div className="row">
                      <div className="col-12 form-group">
                        <label for="floatingPassword">Enter Name</label>
                        <input
                          type="text"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-3"
                          placeholder="Enter name"
                          required="required"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-12 form-group">
                        <label for="floatingPassword">Enter Email</label>
                        <input
                          type="email"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-3"
                          placeholder="Enter email"
                          required="required"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-12 form-group">
                        <label for="floatingPassword">Enter Password</label>
                        <input
                          type="password"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-3"
                          placeholder="Enter password"
                          required="required"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="col-12 form-group">
                        <label for="floatingPassword">Enter Contact</label>
                        <input
                          type="text"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-3"
                          placeholder="Enter contact"
                          required="required"
                          value={contact}
                          pattern="^\d{10}$"
                          minLength={10}
                          maxLength={10}
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>
                      <div className="col-12 form-group">
                        <label for="floatingPassword">Enter Address</label>
                        <input
                          type="text"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-3"
                          placeholder="Enter address"
                          required="required"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                      <div className="col-12 form-group">
                        <label for="floatingPassword">Enter ZipCode</label>
                        <input
                          type="text"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-3"
                          placeholder="Enter zip code"
                          required="required"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
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
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-primary text-uppercase py-3 px-5 mt-4 "
                        type="submit"
                        style={{
                          boxShadow: "3px 4px 8px #2b2e4a",
                          borderRadius: "2px",
                        }}
                      >
                        register
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
