import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";

export default function VehicleDetails() {
  const [vehicleAvailabilityData, setVehicleAvailabilityData] = useState([]);

  const [vehicleName, setVehicleName] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [vehicleImage, setVehicleImage] = useState([]);
  const [model, setModel] = useState("");
  const [transmission, setTransmission] = useState("");
  const [mileage, setMileage] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [make, setMake] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [year, setYear] = useState("");
  const [vehicleId, setVehcileId] = useState("");
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    apiServices
      .getsingleVehicleData(id)
      .then((res) => {

        if (res.data.success && res.data.data) {
          const v = res.data.data;
          setVehicleName(v.vehicleName);
          setVehicleImage(v.vehicleImage);
          setPricePerDay(v.pricePerDay);
          setModel(v.model);
          setTransmission(v.transmission);
          setMileage(v.mileage);
          setPlateNumber(v.plateNumber);
          setMake(v.make);
          setFuelType(v.feulType);
          setYear(v.year);
          setVehcileId(v._id);
        } else {
          console.error("API error:", res.data.message, res.data.error);
        }
      })
      .catch((err) => {
        console.error("Request failed:", err);
      });
  }, [id]);

  useEffect(() => {
    const data = {
      vehicleId: id,
    };
    apiServices.getallVehicleAvailabilityData(data)
      .then((res) => {
        // Filter data to ensure we only get this vehicle's availability
        const filteredData = res.data.data?.filter(item => 
          item.vehicleId === id || item.vehicleId?._id === id
        );
        setVehicleAvailabilityData(filteredData || []);
      })
      .catch((err) => {
        console.error("Availability request failed:", err);
        setVehicleAvailabilityData([]);
      });
  }, [id]);

  return (
    <>
      <>
        {/* Page Header Start */}
        <div className="container-fluid page-header">
          <h1 className="display-3 text-uppercase text-white mb-3">
            Car Detail
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Home
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">Car Detail</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* Detail Start */}
        <div className="container-fluid pt-5">
          <div
            className="container-fluid p-5 mt-n5"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <div className="row">
              <div className="col-lg-11 mb-5">
                <h1 className="display-4 text-uppercase offset-md-1 mb-5   text-center">
                  {vehicleName}
                </h1>
                <div className="row mx-n2 mb-3">
                  <div className="col-md-12 col-10 offset-md-0 px-2 text-center pb-2">
                    <img
                      className="img-fluid offset-md-1 "
                      style={{
                        height: "600px",
                        width: "600px",
                        boxShadow: "3px 4px 8px #2b2e4a",
                        borderRadius: "2px",
                      }}
                      src={
                        vehicleImage
                      }
                      alt=""
                    />

                    <h1 className="text-center offset-md-1 mb-4 mt-5">
                      <span className="text-primary">Rs:</span> ₹{pricePerDay}{" "}
                      Per/day
                    </h1>
                  </div>
                  <div className="col-md-12 col-7 mx-auto">
                    <div
                      className="row p-3 offset-md-1"
                      style={{
                        boxShadow: "3px 4px 8px #2b2e4a",
                        borderRadius: "2px",
                      }}
                    >
                      <div className="col-md-3 col-6 mb-2">
                        <i className="fa fa-car text-primary mr-2" />
                        <span>Model: {model}</span>
                      </div>
                      <div className="col-md-3 col-6 mb-2">
                        <i className="fa fa-cogs text-primary mr-2" />
                        <span>{transmission}</span>
                      </div>
                      <div className="col-md-3 col-6 mb-2">
                        <i className="fa fa-road text-primary mr-2" />
                        <span>{mileage}/liter</span>
                      </div>
                      <div className="col-md-3 col-6 mb-2">
                        <i className="fa fa-eye text-primary mr-2" />
                        <span>{plateNumber}</span>
                      </div>
                      <div className="col-md-3 col-6 mb-2">
                        <i class="bi bi-building text-primary mr-2"></i>
                        <span>{make}</span>
                      </div>
                      <div className="col-md-3 col-6 mb-2">
                        <i class="bi bi-fuel-pump text-primary mr-2"></i>
                        <span>{fuelType}</span>
                      </div>

                      <div className="col-md-3 col-6 mb-2">
                        <i class="bi bi-calendar-date text-primary mr-2"></i>
                        <span>{year}</span>
                      </div>
                    </div>
                  </div>

                  <div className="offset-md-5  mt-4">
                    <h1 className="text-center ml-n5 mt-4 ">
                      <span className="text-primary">Weekly</span> Availability
                      Details
                    </h1>
                  </div>
                  <div className="col-md-12 col-12 mt-2 ml-5 table-responsive managedata">
                    <table
                      class="table table-bordered mt-4"
                      style={{
                        boxShadow: "3px 4px 8px #2b2e4a",
                        borderRadius: "2px",
                        fontSize: "19px",
                      }}
                    >
                      <thead>
                        <tr>
                          <th scope="col">Vehicle Name</th>
                          <th scope="col">Week Start Date</th>
                          <th scope="col">Week End Date</th>
                          <th scope="col">Monday</th>
                          <th scope="col">Tuesday</th>
                          <th scope="col">Wednesday</th>
                          <th scope="col">Thursday</th>
                          <th scope="col">Friday</th>
                          <th scope="col">Saturday</th>
                          <th scope="col">Sunday</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{vehicleName}</th>
                          {vehicleAvailabilityData?.map((el) => (
                            <>
                              <td>{el.weekStartDate}</td>
                              <td>{el.weekEndDate}</td>
                              <td>{el.monday}</td>
                              <td>{el.tuesday}</td>
                              <td>{el.wednesday}</td>
                              <td>{el.thursday}</td>
                              <td>{el.friday}</td>
                              <td>{el.saturday}</td>
                              <td>{el.sunday}</td>
                            </>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-3 mx-auto">
                <Link to={"/rentvehicle/" + vehicleId}>
                  <button
                    className="btn btn-primary btn-lg offset-md-3"
                    style={{
                      boxShadow: "2px 2px 8px #2b2e4a",
                      borderRadius: "2px",
                    }}
                  >
                    Rent A Vehicle
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Detail End */}
      </>
    </>
  );
}
