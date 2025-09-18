import { useEffect, useState } from "react"
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function ManageUnpaidPenalties() {

    const [penaltyData, setPenaltyData] = useState([])

    useEffect(() => {
        const data = {
            ownerId: sessionStorage.getItem("ownerId")
        }
        console.log(data)
        apiServices.getallPenaltyData(data)
            .then((res) => {
                setPenaltyData(res.data.data)
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
            apiServices.updatePenaltyStatus(data)
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
                    <h1 className="display-3 text-uppercase text-white mb-3">Manage Unpaid Penalties</h1>
                    <div className="d-inline-flex text-white">
                        <h6 className="text-uppercase m-0">
                            <a className="text-white" href="">
                                Dashboard
                            </a>
                        </h6>
                        <h6 className="text-body m-0 px-3">/</h6>
                        <h6 className="text-uppercase text-body m-0">Manage Unpaid Penalties</h6>
                    </div>
                </div>
                {/* Page Header Start */}
                {/* Contact Start */}
                <div className="container-fluid py-5">
                    <div className="container pt-5 pb-3">
                        <h1 className="display-4 text-uppercase text-center mb-5">Manage Unpaid Penalties</h1>
                        <div className="row">
                            <div className="col-lg-12 mx-auto mb-2 table-responsive managedata">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sr. No</th>
                                            <th scope="col"> Customer Name</th>
                                            <th scope="col">Vehicle Name</th>
                                            <th scope="col">Penalty Amount</th>
                                            <th scope="col">Penalty Type</th>
                                            <th scope="col">Penalty Description</th>
                                            <th scope="col">Issued Date</th>
                                            <th scope="col">Due Date</th>
                                            <th scope="col">Status</th>
                                            
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            penaltyData?.map((el, index) => (
                                                <>
                                                   
                                                        {
                                                            el.paymentStatus == "Unpaid"?(
                                                                <>
                                                            <tr>
                                                                <td>{index + 1}</td>
                                                                <td>{el.customerId}</td>
                                                                
                                                                <td>{el.vehicleId}</td>
                                                                <td>{el.penaltyAmount}</td>
                                                                <td>{el.penaltyType?.penaltyRules}</td>
                                                                <td>{el.penaltyDescription}</td>
                                                                <td>{el.issuedDate}</td>
                                                                <td>{el.dueDate}</td>
                                                                

                                                                <td >
                                                                   {el.status}
                                                                </td>
                                                                
                                                            </tr>
                                                        </>
                                                            ):null
                                                        }
                                                   
                                                </>
                                            ))
                                        }

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