import { useEffect, useState } from "react";
import apiServices from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../User/Loader";

export default function AddVehicles() {
  const [vehicleName, setVehicleName] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [mileage, setMileage] = useState("");
  const [transmission, setTransmission] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");

  const [VehicleImage, setVehicleImage] = useState({});
  // const [imageName, setImageName] = useState("");

  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");

  const [categoryData, setCategoryData] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    apiServices
      .getallCategory()
      .then((res) => {
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const imageHandle = (e) => {
    setVehicleImage(e.target.files[0]);
    // setImageName(e.target.value);
  };

  const addData = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("vehicleName", vehicleName);
    data.append("ownerId", sessionStorage.getItem("ownerId"));
    data.append("make", make);
    data.append("model", model);
    data.append("year", year);
    data.append("categoryId", categoryId);
    data.append("plateNumber", plateNumber);
    data.append("feulType", fuelType);
    data.append("mileage", mileage);
    data.append("transmission", transmission);
    data.append("vehicleImage", VehicleImage);
    data.append("pricePerDay", pricePerDay);

    setLoader(true);
    setDisplay("none");
    apiServices
      .addVehicle(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          setTimeout(() => {
            nav("/owner/managevehicles");
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
  return (
    <>
      <>
        {loader ? <Loader /> : null}
        {/* Page Header Start */}
        <div style={{ display: display }}>
          <div className="container-fluid page-header">
            <h1 className="display-3 text-uppercase text-white mb-3">
              Add Vehicles
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  Dashboard
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">Add Vehicles</h6>
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
              Add <span className="text-primary">Vehicles</span>
            </h1>
            <div className="row">
              <div className="col-lg-9  mx-auto mb-2">
                <div
                  className="contact-form bg-light mb-4"
                  style={{ padding: 30 }}
                >
                  <form onSubmit={addData}>
                    <div className="row">
                      <div className="col-12  form-group">
                        <label for="floatingPassword">
                          Select Vehicle Type
                        </label>
                        <select
                          className="form-control p-3 "
                          style={{
                            height: "50px",
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          onChange={(e) => setCategoryId(e.target.value)}
                        >
                          <option>SELECT VEHICLE TYPE</option>
                          {categoryData?.map((element) => (
                            <>
                              <option key={element._id} value={element._id}>
                                {element.categoryName}
                              </option>
                            </>
                          ))}
                        </select>
                      </div>
                      <div className="col-6 form-group">
                        <label for="floatingPassword">Enter vehicle name</label>
                        <input
                          type="text"
                          className="form-control p-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          placeholder="Enter vehicle name"
                          required="required"
                          value={vehicleName}
                          onChange={(e) => setVehicleName(e.target.value)}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <label for="floatingPassword">
                          Enter manufactrurer of the vehicle
                        </label>
                        <input
                          type="text"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-4"
                          placeholder="Enter manufactrurer of the vehicle"
                          required="required"
                          value={make}
                          onChange={(e) => setMake(e.target.value)}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <label for="floatingPassword">
                          Enter specific model
                        </label>
                        <input
                          type="text"
                          className="form-control p-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          placeholder="Enter specific model"
                          required="required"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <label for="floatingPassword">
                          Enter year of manufacture
                        </label>
                        <input
                          type="text"
                          className="form-control p-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          placeholder="Enter year of manufacture"
                          required="required"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <label for="floatingPassword">Enter plate Number</label>
                        <input
                          type="text"
                          className="form-control p-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          placeholder="Enter plate Number"
                          required="required"
                          value={plateNumber}
                          onChange={(e) => setPlateNumber(e.target.value)}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <label for="floatingPassword">Enter fuel Type</label>
                        <input
                          type="text"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-4"
                          placeholder="Enter fuel Type"
                          required="required"
                          value={fuelType}
                          onChange={(e) => setFuelType(e.target.value)}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <label for="floatingPassword">
                          Enter mileage of vehicle
                        </label>
                        <input
                          type="text"
                          className="form-control p-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          placeholder="Enter mileage of vehicle"
                          required="required"
                          value={mileage}
                          onChange={(e) => setMileage(e.target.value)}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <label for="floatingPassword">Enter transmission</label>
                        <input
                          type="text"
                          className="form-control p-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          placeholder="Enter transmission"
                          required="required"
                          value={transmission}
                          onChange={(e) => setTransmission(e.target.value)}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <label for="floatingPassword">
                          Enter price per day
                        </label>
                        <input
                          type="text"
                          className="form-control p-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          placeholder="Enter price per day"
                          required="required"
                          value={pricePerDay}
                          onChange={(e) => setPricePerDay(e.target.value)}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <div className="form-floating">
                          <label for="floatingPassword">Upload Image</label>
                          <input
                            type="file"
                            className="form-control"
                            style={{
                              height: "50px",
                              paddingTop: "10px",
                              boxShadow: "3px 4px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            onChange={imageHandle}
                            id="floatingPassword"
                            placeholder="Upload image"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <button
                        className="btn btn-primary py-3 px-5 offset-md-5 mt-5"
                        style={{
                          borderRadius: "2px",
                          boxShadow: "3px 4px 8px #2b2e4a",
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
