import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import apiServices from "../Layout/APISERVICES/apiServices";
import Loader from "../User/Loader";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");
  const nav = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    let data = {
      email: email,
      password: password,
    };
    setLoader(true);
    setDisplay("none");
    apiServices
      .login(data)
      .then((res) => {
        if (res.data.success) {
          sessionStorage.setItem("token", res.data.tokenData);
          sessionStorage.setItem("name", res.data.data.name);
          sessionStorage.setItem("userId", res.data.data._id);

          sessionStorage.setItem("userType", res.data.data.userType);

          if (res.data.data.userType === 1) {
            toast.success(res.data.message, { position: "top-center" });
            setTimeout(() => {
              nav("/admin");
            }, 2000);
          } else if (res.data.data.userType === 2) {
            if (res.data.data.status === "Unblock") {
              sessionStorage.setItem("ownerId", res.data.data.ownerId);

              toast.success(res.data.message, { position: "top-center" });
              setTimeout(() => {
                nav("/owner");
              }, 2000);
            } else {
              toast.error("You need admin approval! Please wait for approval", {
                position: "top-center",
              });
              setTimeout(() => {}, 2000);
            }
          } else if (res.data.data.userType === 3) {
            sessionStorage.setItem("customerId", res.data.data.customerId);

            toast.success(res.data.message, { position: "top-center" });
            setTimeout(() => {
              nav("/");
            }, 2000);
          }
        } else {
          toast.error(res.data.message, { position: "top-center" });
        }
      })
      .catch((err) => {
        toast.error(err.message, { position: "top-center" });
      });
    setTimeout(() => {
      setLoader(false);
      setDisplay("block");
    }, 2000);
  };

  return (
    <>
      <>
        {loader ? <Loader /> : null}
        {/* Page Header Start */}
        <div style={{ display: display }}>
          <div
            className="container-fluid page-header d-flex justify-content-center"
            style={{ display: display }}
          >
            <h1 className="display-3 text-uppercase text-white mb-3">
              Login here
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  home
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">login</h6>
            </div>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5" style={{ display: display }}>
          <div className="container pt-0 pb-3">
            <h1 className="display-4 text-uppercase text-center mb-5">
              Login <span className="text-primary">here</span>
            </h1>
            <div className="row ">
              <div
                className="col-lg-8 offset-md-2 mb-2 pt-5"
                style={{
                  boxShadow: "3px 4px 8px #2b2e4a",
                  borderRadius: "2px",
                }}
              >
                <div
                  className="contact-form bg-light mb-4"
                  style={{ padding: 30 }}
                >
                  <form onSubmit={handleLogin}>
                    <div className="row">
                      <div className="col-12 form-group">
                        <label for="floatingPassword">Enter Email</label>
                        <input
                          type="email"
                          className="form-control p-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
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

                    <div>
                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-primary text-uppercase py-3 px-5 mt-4 "
                          style={{
                            boxShadow: "3px 4px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          type="submit"
                        >
                          login
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
