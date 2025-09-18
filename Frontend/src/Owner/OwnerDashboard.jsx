import { useEffect, useState } from "react";
import apiServices from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

export default function OwnerDashboard() {

  const token = sessionStorage.getItem('token');
  const [showRedirect, setShowRedirect] = useState(false);

  useEffect(()=>{
    if(!token){
      toast.error('Please login First')
      const timer = setTimeout(() => {
        setShowRedirect(true)
      }, 500);
      return () => clearTimeout(timer)
    }
  },[token])

  if(!token && showRedirect){
    return <Navigate to={'/login'} />
  }
  if(!token) return null

  const [vehicleData, setVehicleData] = useState([]);
  const [rentingData, setRentingData] = useState([]);
  const [penaltyRules, setPenaltyRules] = useState([]);
  const [penaltyData, setPenaltyData] = useState([]);

  useEffect(() => {
    const data = {
      ownerId: sessionStorage.getItem("ownerId"),
    };
    apiServices.getallVehicles(data).then((res) => {
      setVehicleData(res.data.data.length);
    });
  });

  useEffect(() => {
    apiServices.getallPenaltyRulesData().then((res) => {
      setPenaltyRules(res.data.data.length);
    });
  });

  useEffect(() => {
    const data = {
      ownerId: sessionStorage.getItem("ownerId"),
    };
    apiServices.getallPenaltyData(data).then((res) => {
      setPenaltyData(res.data.data.length);
    });
  });

  useEffect(() => {
    const data = {
      ownerId: sessionStorage.getItem("ownerId"),
    };
    apiServices.getallRentedData(data).then((res) => {
      setRentingData(res.data.data.length);
    });
  });

  return (
    <>
      <>
        {/* Page Header Start */}
        <div className="container-fluid page-header">
          <h1 className="display-3  text-uppercase text-white mb-3">
            Owner Dashboard
          </h1>
          <div className="d-inline-flex text-white">
            <h6 className="text-uppercase m-0">
              <a className="text-white" href="">
                Home
              </a>
            </h6>
            <h6 className="text-body m-0 px-3">/</h6>
            <h6 className="text-uppercase text-body m-0">owner Dashboard</h6>
          </div>
        </div>
        {/* Page Header Start */}
        {/* About Start */}
        <div className="container-fluid py-5">
          <h1 className="display-4 mt-n5 text-uppercase text-center mb-5">
            Owner <span className="text-primary">dashboard</span>
          </h1>
          <div className="container pt-2 pb-3">
            <div className="row mt-3">
              <div className="col-lg-6 mb-2">
                <div
                  className="d-flex align-items-center bg-secondary p-4 mb-4"
                  style={{ height: 150,boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",  }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                    style={{ width: 100, height: 100,boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px", }}
                  >
                    <i class="bi bi-car-front-fill fa-2x text-secondary"></i>
                  </div>
                  <h2 className="text-uppercase m-0 text-light">
                    Vehicles : {vehicleData}
                  </h2>
                </div>
              </div>

              <div className="col-lg-6 mb-2">
                <div
                  className="d-flex align-items-center bg-secondary p-4 mb-4"
                  style={{ height: 150 ,boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",}}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                    style={{ width: 100, height: 100,boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px", }}
                  >
                    <i class="bi bi-cash-coin text-secondary fa-2x"></i>
                  </div>
                  <h2 className="text-uppercase m-0 text-light">
                    Rentings : {rentingData}
                  </h2>
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div
                  className="d-flex align-items-center bg-secondary p-4 mb-4"
                  style={{ height: 150,boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px", }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                    style={{ width: 100, height: 100 ,boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",}}
                  >
                    <i class="bi bi-file-earmark-ruled fa-2x text-secondary"></i>
                  </div>
                  <h2 className="text-uppercase m-0 text-light">
                    Penalty Rules : {penaltyRules}
                  </h2>
                </div>
              </div>
              <div className="col-lg-6 mb-2">
                <div
                  className="d-flex align-items-center bg-secondary p-4 mb-4"
                  style={{ height: 150,boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px", }}
                >
                  <div
                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary ml-n4 mr-4"
                    style={{ width: 100, height: 100 ,boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",}}
                  >
                    <i class="bi bi-exclamation-triangle fa-2x text-secondary"></i>
                  </div>
                  <h2 className="text-uppercase m-0 text-light">
                    Penalties : {penaltyData}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* About End */}
      </>
    </>
  );
}
