import { useState } from "react";
import apiServices from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import Loader from "../User/Loader";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");

  const nav = useNavigate();
  const addData = (e) => {
    e.preventDefault();
    let data = {
      name: name,
      email: email,
      password: password,
      contact: contact,
    };
    setLoader(true);
    setDisplay("none");
    apiServices
      .userRegister(data)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          nav("/login");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
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
        <div
          className="container-fluid page-header d-flex justify-content-center"
          
        >
          

          
          <h1 className="display-3 text-uppercase text-white mb-3">
            Cuatomer Register
          </h1>
          
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Home
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">Customer Register</h6>
          </div>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5" style={{ display: display }}>
          <div className="container pt-0 pb-3">
            <h1 className="display-4 text-uppercase text-center mb-5">
              Customer <span className="text-primary">Register</span>
            </h1>
            <div className="row">
              <div
                className="col-lg-8 mt-3 pt-3 offset-md-2 mb-2"
                style={{
                  boxShadow: "3px 4px 6px #2b2e4a",
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
                          className="form-control p-4"
                          placeholder="Your Name"
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
                          className="form-control p-4"
                          placeholder="Your Email"
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
                          className="form-control p-4"
                          placeholder="Your Password"
                          required="required"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label for="floatingPassword">Enter Contact</label>
                      <input
                        type="text"
                        style={{
                          boxShadow: "2px 2px 8px #2b2e4a",
                          borderRadius: "2px",
                        }}
                        className="form-control p-4"
                        placeholder="Your Contact"
                        required="required"
                        pattern="^\d{10}$"
                        value={contact}
                        minLength={10}
                        maxLength={10}
                        onChange={(e) => setContact(e.target.value)}
                      />
                    </div>

                    <div>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-primary text-uppercase py-3 px-5 mt-5 "
                          type="submit"
                          style={{
                            boxShadow: "3px 4px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                        >
                          register
                        </button>
                      </div>
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
