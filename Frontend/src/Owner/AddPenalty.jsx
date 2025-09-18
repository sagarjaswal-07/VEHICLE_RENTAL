import { use, useEffect, useState } from "react";
import apiServices from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../User/Loader";

export default function AddPenalty() {
  const [vehicleId, setVehicleId] = useState("");
  const [customerId, setCustomerId] = useState("");

  const [penaltyAmount, setPenaltyAmount] = useState("");
  const [penaltyType, setPenaltyType] = useState("");

  const [penaltyDescription, setpenaltyDescription] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");

  const [penaltyRulesData, setPenaltyRulesData] = useState([]);
  const params = useParams();
  const id = params.id;

  const nav = useNavigate();

  useEffect(() => {
    apiServices.getallPenaltyRulesData().then((res) => {
      setPenaltyRulesData(res.data.data);
    });
  }, []);

  useEffect(() => {
    const data = {
      _id: id,
    };
    apiServices.getsingleRentedData(data).then((res) => {
      setVehicleId(res.data.data.vehicleId);
      setCustomerId(res.data.data.customerId);
    });
  }, [id]);

  const addData = (e) => {
    e.preventDefault();

    const data = {
      ownerId: sessionStorage.getItem("ownerId"),
      vehicleId: vehicleId,
      customerId: customerId,
      rentalId: id,
      penaltyAmount: penaltyAmount,
      penaltyType: penaltyType,
      penaltyDescription: penaltyDescription,
      issuedDate: issuedDate,
      dueDate: dueDate,
    };

    setLoader(true);
    setDisplay("none");
    apiServices
      .addPenalty(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          console.log(res.data.error);
          setTimeout(() => {
            nav("/owner/managependingpenalties");
          }, 3000);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      });
    setTimeout(() => {
      setLoader(false);
      setDisplay("block");
    }, 3000);
  };

  const handleIssuedDateChange = (e) => {
    const newEndDate = e.target.value;
    setIssuedDate(newEndDate);

    if (newEndDate && new Date(newEndDate) <= new Date(issuedDate)) {
      toast.error("End date must be greater than start date!");
    }
  };

  const handleDueDateChange = (e) => {
    const newStartDate = e.target.value;
    setDueDate(newStartDate);

    // Ensure start date is today or later
    const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format
    if (newStartDate < today) {
      toast.error("Start date cannot be in the past!");
      setIssuedDate(today); // Set the start date to today if invalid
    }
  };


  return (
    <>
      <>
        {loader ? <Loader /> : null}
        {/* Page Header Start */}
        <div style={{ display: display }}>
          <div className="container-fluid page-header">
            <h1 className="display-3 text-uppercase text-white mb-3">
              Add Penalty
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  Dashboard
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">Add Penalty</h6>
            </div>
          </div>
        </div>
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
              Add <span className="text-primary">Penalty</span>
            </h1>
            <div className="row">
              <div className="col-lg-9 mx-auto mb-2">
                <div
                  className="contact-form bg-light mb-4"
                  style={{ padding: 30 }}
                >
                  <form onSubmit={addData}>
                    <div className="row">
                      <div className="col-12 form-group">
                        <label htmlFor="">Select Penalty Type</label>
                        <select
                          className="form-control"
                          style={{
                            height: "50px",
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          onChange={(e) => setPenaltyType(e.target.value)}
                        >
                          <option>Select Penalty Type</option>
                          {penaltyRulesData?.map((element) => (
                            <>
                              <option key={element._id} value={element._id}>
                                {element.penaltyRules}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                      <div className="col-12 form-group">
                        <label htmlFor="">Enter Penalty Amount</label>
                        <input
                          type="text"
                          className="form-control p-4"
                          placeholder="Enter Penalty Amount"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          required="required"
                          value={penaltyAmount}
                          onChange={(e) => setPenaltyAmount(e.target.value)}
                        />
                      </div>
                      <div className="col-12 form-group">
                        <label htmlFor="">Enter Penalty Description</label>
                        <input
                          type="text"
                          className="form-control p-4"
                          placeholder="Enter Penalty Description"
                          required="required"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          value={penaltyDescription}
                          onChange={(e) =>
                            setpenaltyDescription(e.target.value)
                          }
                        />
                      </div>

                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label htmlFor="">Enter Issued Date</label>
                          <input
                            type="date"
                            className="form-control p-4"
                            placeholder="Enter Start date"
                            required="required"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            value={issuedDate}
                            onChange={handleIssuedDateChange}
                            min={new Date().toISOString().split("T")[0]} // Prevent past dates
                          />
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label htmlFor="">Enter Last Date</label>
                          <input
                            type="date"
                            className="form-control p-4"
                            placeholder="Enter Last date"
                            required="required"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            value={dueDate}
                            onChange={handleDueDateChange}
                            readOnly={!issuedDate} // End date is read-only if start date is not selected
                            min={issuedDate} // Prevent selecting an end date before the start date
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        className="btn btn-primary py-3 px-5 mt-5 offset-md-5"
                        style={{
                          boxShadow: "3px 4px 8px #2b2e4a",
                          borderRadius: "2px",
                        }}
                        type="submit"
                      >
                        ADD
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
