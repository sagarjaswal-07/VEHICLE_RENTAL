import { useEffect, useState } from "react";
import apiServices from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../User/Loader";

export default function UpdatePenaltyRules() {
  const [penaltyRules, setPenaltyRules] = useState("");
  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");

  const params = useParams();
  const id = params.id;

  const nav = useNavigate();

  useEffect(() => {
        const data = {
        _id:id
    }
    apiServices.getsinglePenaltyRules(data).then((res) => {
      setPenaltyRules(res.data.data.penaltyRules);
      
      console.log("penalty rule is ", res.data.data.penaltyRules);
    });
  }, [id]);

  const addData = (e) => {
    e.preventDefault();
    const data = {
      penaltyRules: penaltyRules,
      _id: id,
    };

    setLoader(true);
    setDisplay("none");
    apiServices
      .updatePenaltyRulesData(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          console.log(res.data.message);
          setTimeout(() => {
            nav("/admin/managepenaltyRules");
          }, 3000);
        } else {
          toast.error(res.data.message);
        }
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
          <div className="container-fluid page-header">
            <h1 className="display-3 text-uppercase text-white mb-3">
              Update Penalty Rules
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  Dashboard
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">
                Update Penalty Rules
              </h6>
            </div>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div className="container-fluid py-5 " style={{ display: display }}>
          <div
            className="container pt-5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-5">
              Update <span className="text-primary">Penalty Rules</span>
            </h1>
            <div className="row">
              <div className="col-lg-9 mx-auto mb-2">
                <div
                  className="contact-form bg-light mb-4"
                  style={{ padding: 30 }}
                >
                  <form onSubmit={addData}>
                    <div className="row">
                      <div className=" col-12 form-group">
                        <div className="form-floating">
                          <label>Enter Penalty Rules</label>
                          <textarea
                            className="form-control py-3 px-4"
                            rows={5}
                            placeholder="Enter Penalty Rules"
                            required="required"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            value={penaltyRules}
                            onChange={(e) => setPenaltyRules(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        className="btn btn-primary text-uppercase py-3 px-5 mt-5 offset-md-5"
                        style={{
                          boxShadow: "3px 4px 8px #2b2e4a",
                          borderRadius: "2px",
                        }}
                        type="submit"
                      >
                        Update
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
