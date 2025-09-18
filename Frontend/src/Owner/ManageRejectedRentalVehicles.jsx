import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function ManageRejectedRentalVehicle() {

    const [rentedVehicleData, setRentedVehicleData] = useState([])

    useEffect(() => {
        const data = {
            ownerId: sessionStorage.getItem("ownerId")
        }
        apiServices.getallRentedData(data)
            .then((res) => {
                setRentedVehicleData(res.data.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    },[])

    const updateStatus = (id, status) => {
        const data = {
            _id: id,
            status: status
        }
        apiServices.updateRentingStatus(data)
            .then((res) => {
                toast.success(res.data.message)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <>
                {/* Page Header Start */}
                <div className="container-fluid page-header">
                    <h1 className="display-3 text-uppercase text-white mb-3">View Rejected Rented Vehicles</h1>
                    <div className="d-inline-flex text-white">
                        <h6 className="text-uppercase m-0">
                            <a className="text-white" href="">
                                Dashboard
                            </a>
                        </h6>
                        <h6 className="text-body m-0 px-3">/</h6>
                        <h6 className="text-uppercase text-body m-0">View Rejected Rented Vehicles</h6>
                    </div>
                </div>
                {/* Page Header Start */}
                {/* Contact Start */}
                <div className="container-fluid py-5">
                    <div className="container-fluid mt-n5 pt-5 pb-3"             style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}>
                        <h1 className="display-4 text-uppercase text-center mb-5">View <span className="text-primary">Rejected Rented Vehicles</span></h1>
                        <div className="row">
                            <div className="col-lg-12 mx-auto mb-2 table-responsive managedata">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr. No</th>
                                            <th scope="col"> Customer Name</th>
                                            <th scope="col">Owner Name</th>
                                            <th scope="col">Vehicle Name</th>
                                            <th scope="col">Start Date</th>
                                            <th scope="col">End Date</th>
                                            <th scope="col">Days</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Special Request</th>
                                            <th scope="col">Pickup Location</th>
                                            <th scope="col">Drop Location</th>
                                            

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            rentedVehicleData?.map((el, index) => (
                                                <>
                                                    {el.status == "Rejected" ? (
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{el.customerId?.name}</td>
                                                            <td>{el.ownerId?.name}</td>
                                                            <td>{el.vehicleId?.vehicleName}</td>
                                                            <td>{el.startDate}</td>
                                                            <td>{el.endDate}</td>
                                                            <td>{el.days}</td>
                                                            <td>{el.totalPrice}</td>
                                                            <td>{el.specialRequest}</td>
                                                            <td>{el.pickupLocation}</td>
                                                            <td>{el.dropLocation}</td>

                                                           

                                                        </tr>
                                                    ) :null}
                                                </>
                                            ))}

                                    </tbody>
                                </table>

                            </div>

                        </div>
                    </div>
                </div>
                {/* Contact End */}
            </>


        </>
    )
}