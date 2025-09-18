import { useState } from "react";
import apiServices from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import Loader from "./Loader";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");

  const addData = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };
    setLoader(true);
    setDisplay("none");
    apiServices
      .addQuery(data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      setLoader(false);
      setDisplay("block");
      setName("");
      setEmail("");
      setMessage("");
      setSubject("");
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
              Contact Us
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  Home
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">Contact Us</h6>
            </div>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5" style={{ display: display }}>
          <div className="container pt-0 mt-n5 pb-3">
            <h1 className="display-4 text-uppercase text-center mb-5">
              Contact <span className="text-primary">Us</span>
            </h1>
            <div
              className="row pt-5"
              style={{
                boxShadow: "3px 4px 8px #2b2e4a",
                borderRadius: "2px",
              }}
            >
              <div className="col-lg-7 mb-2">
                <div
                  className="contact-form bg-light mb-4"
                  style={{ padding: 30 }}
                >
                  <form onSubmit={addData}>
                    <div className="row">
                      <div className="col-6 form-group">
                        <input
                          type="text"
                          className="form-control p-4"
                          placeholder="Your Name"
                          required="required"
                          style={{
                            boxShadow: "3px 4px 15px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <input
                          type="email"
                          className="form-control p-4"
                          placeholder="Your Email"
                          required="required"
                          style={{
                            boxShadow: "3px 4px 15px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control p-4"
                        placeholder="Subject"
                        required="required"
                        style={{
                          boxShadow: "3px 4px 15px #2b2e4a",
                          borderRadius: "2px",
                        }}
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control py-3 px-4"
                        rows={5}
                        placeholder="Message"
                        style={{
                          boxShadow: "3px 4px 15px #2b2e4a",
                          borderRadius: "2px",
                        }}
                        required="required"
                        defaultValue={""}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                        }}
                      />
                    </div>
                    <div>
                      <button
                        className="btn btn-primary py-3 px-5 offset-md-4 mt-4"
                        type="submit"
                        style={{
                          boxShadow: "3px 4px 8px #2b2e4a",
                          borderRadius: "2px",
                        }}
                      >
                        Send Query
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-5 mb-2 pr-5">
                <div
                  className="bg-secondary d-flex flex-column justify-content-center px-5 mb-4"
                  style={{
                    height: 435,
                    boxShadow: "3px 4px 12px #2b2e4a",
                    borderRadius: "2px",
                  }}
                >
                  <div className="d-flex mb-3">
                    <i className="fa fa-2x fa-map-marker-alt text-primary flex-shrink-0 mr-3" />
                    <div className="mt-n1">
                      <h5 className="text-light">Head Office</h5>
                      <p>123 Street, New York, USA</p>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <i className="fa fa-2x fa-map-marker-alt text-primary flex-shrink-0 mr-3" />
                    <div className="mt-n1">
                      <h5 className="text-light">Branch Office</h5>
                      <p>123 Street, New York, USA</p>
                    </div>
                  </div>
                  <div className="d-flex mb-3">
                    <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3" />
                    <div className="mt-n1">
                      <h5 className="text-light">Customer Service</h5>
                      <p>customer@mail.com</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <i className="fa fa-2x fa-envelope-open text-primary flex-shrink-0 mr-3" />
                    <div className="mt-n1">
                      <h5 className="text-light">Return &amp; Refund</h5>
                      <p className="m-0">rent4u@mail.com</p>
                    </div>
                  </div>
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
