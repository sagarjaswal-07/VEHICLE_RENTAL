import { use, useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../User/Loader";

export default function UpdateVehicles() {
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
  const [imageName, setImageName] = useState("");
  const [prevImage, setPrevImage] = useState([]);
  const [loader, setLoader] = useState(false);
  const [display, setDisplay] = useState("block");

  const [categoryData, setCategoryData] = useState([]);
  const nav = useNavigate();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    let data = {
      _id: id,
    };

    apiServices.getsingleVehicleData(data).then((res) => {
      setCategoryId(res.data.data.categoryId);
      setVehicleName(res.data.data.vehicleName);
      setMake(res.data.data.make);
      setModel(res.data.data.model);
      setYear(res.data.data.year);
      setPlateNumber(res.data.data.plateNumber);
      setFuelType(res.data.data.feulType);
      setMileage(res.data.data.mileage);
      setTransmission(res.data.data.transmission);
      setPricePerDay(res.data.data.pricePerDay);
      setPrevImage(res.data.data.vehicleImage);
    });
  }, [id]);

  useEffect(() => {
    apiServices
      .getallCategory()
      .then((res) => {
        setCategoryData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const imageHandle = (e) => {
    setVehicleImage(e.target.files[0]);
    setImageName(e.target.value);
  };

  const updateData = (e) => {
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
    data.append("_id", id);
    setLoader(true);
    setDisplay("none");
    apiServices
      .updateVehicleData(data)
      .then((res) => {
        if (res.data.success == true) {
          toast.success(res.data.message);
          console.log(res.data.error);
          setTimeout(() => {
            nav("/owner/managevehicles");
          }, 1000);
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
    }, 1000);
  };
  return (
    <>
      <>
        {loader ? <Loader /> : null}
        {/* Page Header Start */}
        <div style={{ display: display }}>
          <div className="container-fluid page-header">
            <h1 className="display-3 text-uppercase text-white mb-3">
              Update Vehicles
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="">
                  Dashboard
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">Update Vehicles</h6>
            </div>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Contact Start */}
        <div
          className="container-fluid mt-n2 py-5 "
          style={{ display: display }}
        >
          <div
            className="container mt-n5 p-5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-5">
              Update <span className="text-primary">Vehicles</span>
            </h1>
            <div className="row mt-n2">
              <div className="col-lg-9 mx-auto mb-2">
                <div
                  className="contact-form bg-light mb-4"
                  style={{ padding: 30 }}
                >
                  <form onSubmit={updateData}>
                    <div className="row">
                      <div className="col-12 form-group">
                        <label>Vehicle Category</label>
                        <input
                          type="text"
                          className="form-control"
                          value={
                            categoryData?.find((c) => c._id === categoryId)
                              ?.categoryName || "No category"
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
                        <div className="form-floating">
                          <label>Enter Vehicle Name</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            placeholder="Enter vehicle name"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            value={vehicleName}
                            onChange={(e) => setVehicleName(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label>Enter Manufacturer Of Vehicle</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter manufactrurer of the vehicle"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label>Enter Specific Model</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter specific model"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label>Enter Year of Manufacture</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter year of manufacture"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label htmlFor="">Enter Plate Number</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter plate Number"
                            value={plateNumber}
                            onChange={(e) => setPlateNumber(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label htmlFor="">Enter Feul Type</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter fuel Type"
                            value={fuelType}
                            onChange={(e) => setFuelType(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label htmlFor="">Enter Mileage</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter distance driven by vehicle"
                            value={mileage}
                            onChange={(e) => setMileage(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label htmlFor="">Enter Transmission</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter transmission"
                            value={transmission}
                            onChange={(e) => setTransmission(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 form-group">
                        <div className="form-floating">
                          <label htmlFor="">Enter Price Per Day</label>
                          <input
                            type="text"
                            className="form-control p-4"
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
                              borderRadius: "2px",
                            }}
                            placeholder="Enter price per day"
                            value={pricePerDay}
                            onChange={(e) => setPricePerDay(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-6 form-group mt-2 ">
                        <label for="floatingPassword">Previous Image</label>
                        <img
                          src={prevImage}
                          style={{
                            marginLeft: "25px",
                            boxShadow: "3px 4px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          height={"200px"}
                        />
                      </div>
                      <div className="col-6 form-group mt-5">
                        <div class="form-floating">
                          <label for="floatingPassword">Upload Image</label>
                          <input
                            type="file"
                            class="form-control "
                            style={{
                              boxShadow: "2px 2px 8px #2b2e4a",
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
                        className="btn btn-primary py-3 mt-5 px-5 offset-md-5"
                        type="submit"
                        style={{
                          boxShadow: "3px 4px 8px #2b2e4a",
                          borderRadius: "2px",
                        }}
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
