import { use, useEffect, useState } from "react";
import apiServices from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../User/Loader";

export default function UpdateVehicleAvailability() {
  const [vehicleId, setVehicleId] = useState("");
  const [weekStartDate, setWeekStartDate] = useState("");
  const [weekEndDate, setWeekEndDate] = useState("");
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");
  const [vehicleData, setVehicleData] = useState([]);

  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");
  const nav = useNavigate();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const data = {
      _id: id,
    };
    apiServices.getsingleVehicleAvailabilityData(data).then((res) => {
      setVehicleId(res.data.data.vehicleId);
      setWeekStartDate(res.data.data.weekStartDate);
      setWeekEndDate(res.data.data.weekEndDate);
      setMonday(res.data.data.monday);
      setTuesday(res.data.data.tuesday);
      setWednesday(res.data.data.wednesday);
      setThursday(res.data.data.thursday);
      setFriday(res.data.data.friday);
      setSaturday(res.data.data.saturday);
      setSunday(res.data.data.sunday);
    });
  }, [id]);

  useEffect(() => {
    const data = {
      ownerId: sessionStorage.getItem("ownerId"),
    };
    apiServices
      .getallVehicles(data)
      .then((res) => {
        setVehicleData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateData = (e) => {
    e.preventDefault();

    const data = {
      vehicleId: vehicleId,
      ownerId: sessionStorage.getItem("ownerId"),
      weekStartDate: weekStartDate,
      weekEndDate: weekEndDate,
      monday: monday,
      tuesday: tuesday,
      wednesday: wednesday,
      thursday: thursday,
      friday: friday,
      saturday: saturday,
      sunday: sunday,
      _id: id,
    };

    setLoader(true);
    setDisplay("none");
    apiServices
      .updateVehicleAvailabilityData(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          console.log(res.data.message);
          setTimeout(() => {
            nav("/owner/managevehiclesavailability");
          }, 3000);
        } else {
          console.log(res.data.errors);
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

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setWeekEndDate(newEndDate);

    if (newEndDate && new Date(newEndDate) <= new Date(startDate)) {
      toast.error("End date must be greater than start date!");
    }
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setWeekStartDate(newStartDate);

    // Ensure start date is today or later
    const today = new Date().toISOString().split("T")[0]; // Get today's date in yyyy-mm-dd format
    if (newStartDate < today) {
      toast.error("Start date cannot be in the past!");
      setWeekStartDate(today); // Set the start date to today if invalid
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
              Update Vehicles Availability
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  Dashboard
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">
                Update Vehicles Availability
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
              boxShadow: "3px 4px 8px rgba(0, 0, 0, 0.9)",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-5">
              Update <span className="text-primary">Vehicles Availability</span>
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
                          <label htmlFor="">Enter Start Date</label>
                          <input
                            type="date"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            className="form-control p-4"
                            placeholder="Enter Start date"
                            required="required"
                            value={weekStartDate}
                            onChange={handleStartDateChange}
                            min={new Date().toISOString().split("T")[0]} // Prevent past dates
                          />
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label htmlFor="">Enter End Date</label>
                          <input
                            type="date"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            className="form-control p-4"
                            placeholder="Enter end date"
                            required="required"
                            value={weekEndDate}
                            onChange={handleEndDateChange}
                            readOnly={!weekStartDate} // End date is read-only if start date is not selected
                            min={weekStartDate} // Prevent selecting an end date before the start date
                          />
                        </div>
                      </div>

                      <div className="col-12 form-group">
                        <label>Vehicle Category</label>
                        <input
                          type="text"
                          className="form-control"
                          value={
                            vehicleData?.find((c) => c._id === vehicleId)
                              ?.vehicleName || "No Vehicle"
                          }
                          readOnly
                          style={{
                            height: "50px",
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                        />
                      </div>
                      <div className="col-12 form-group">
                        <select
                          className="form-select w-100 border-0"
                          style={{
                            height: "40px",
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          aria-label="Default select example"
                          value={monday}
                          onChange={(e) => setMonday(e.target.value)}
                        >
                          <option selected="">Enter Monday Availability</option>
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </div>

                      <div className="col-12 form-group">
                        <select
                          className="form-select w-100 border-0"
                          style={{
                            height: "40px",
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          aria-label="Default select example"
                          value={tuesday}
                          onChange={(e) => setTuesday(e.target.value)}
                        >
                          <option selected="">
                            Enter TuesDay Availability
                          </option>
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </div>
                      <div className="col-12 form-group">
                        <select
                          className="form-select w-100 border-0"
                          style={{
                            height: "40px",
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          aria-label="Default select example"
                          value={wednesday}
                          onChange={(e) => setWednesday(e.target.value)}
                        >
                          <option selected="">
                            Enter Wednesday Availability
                          </option>
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </div>
                      <div className="col-12 form-group">
                        <select
                          className="form-select w-100 border-0"
                          style={{
                            height: "40px",
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          aria-label="Default select example"
                          value={thursday}
                          onChange={(e) => setThursday(e.target.value)}
                        >
                          <option selected="">
                            Enter Thursday Availability
                          </option>
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </div>
                      <div className="col-12 form-group">
                        <select
                          className="form-select w-100 border-0"
                          style={{
                            height: "40px",
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          aria-label="Default select example"
                          value={friday}
                          onChange={(e) => setFriday(e.target.value)}
                        >
                          <option selected="">Enter Friday Availability</option>
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </div>
                      <div className="col-12 form-group">
                        <select
                          className="form-select w-100 border-0"
                          style={{
                            height: "40px",
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          aria-label="Default select example"
                          value={saturday}
                          onChange={(e) => setSaturday(e.target.value)}
                        >
                          <option selected="">
                            Enter Saturday Availability
                          </option>
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </div>
                      <div className="col-12 form-group">
                        <select
                          className="form-select w-100 border-0"
                          style={{
                            height: "40px",
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          aria-label="Default select example"
                          value={sunday}
                          onChange={(e) => setSunday(e.target.value)}
                        >
                          <option selected="">Enter Sunday Availability</option>
                          <option value="Available">Available</option>
                          <option value="Unavailable">Unavailable</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <button
                        className="btn btn-primary py-3 px-5 mt-5 offset-md-5"
                        style={{
                          boxShadow: "3px 4px 8px rgba(0, 0, 0, 0.9)",
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
