import { useEffect, useState } from "react";
import apiServices, { BASE_IMAGE_URL } from "../Layout/APISERVICES/apiServices";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

export default function SeePenalties() {
  const [penaltyData, setPenaltyData] = useState([]);

  const location = useLocation();

  useEffect(() => {
    fetchPenalties();
  }, [location]); // Refresh data after returning from payment

  const fetchPenalties = () => {
    const data = { customerId: sessionStorage.getItem("customerId") };
    apiServices
      .getallPenaltyData(data)
      .then((res) => {
        setPenaltyData(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handlePayment = async (penalty) => {
    try {
      const token = sessionStorage.getItem("token"); // Get user token

      if (!token) {
        toast.error("Authentication required. Please log in.");
        return;
      }
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );

      const response = await fetch(
        import.meta.env.VITE_API_BASE_URL + "pay-penalty",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //  Attach token in request headers
          },
          body: JSON.stringify({
            penaltyId: penalty._id,
            customerId: penalty.customerId?._id,
            penaltyAmount: penalty.penaltyAmount,
            penaltyType: penalty.penaltyType?.penaltyRules,
            penaltyDescription: penalty.penaltyDescription,
          }),
        }
      );

      const session = await response.json();

      if (session.id) {
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
        if (result.error) {
          console.error("Stripe Checkout Error:", result.error);
          toast.error("Payment failed, please try again.");
        }
      } else {
        toast.error("Failed to initiate Stripe checkout.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment could not be processed. Try again.");
    }
  };

  const updateStatus = (id, status) => {
    const data = {
      _id: id,
      paymentStatus: status,
    };
    apiServices
      .updatePenaltyStatus(data)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFullPayment = (penalty) => {
    handlePayment(penalty);
  };

  return (
    <>
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <h1 className="display-4 text-uppercase text-center mb-5">
            See <span className="text-primary">Penalties</span>
          </h1>
          <div className="row">
            <div
              className="col-lg-12 mx-auto mb-2 table-responsive managedata p-5"
              style={{ border: "3px solid" }}
            >
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Customer Name</th>
                    <th>Vehicle Name</th>
                    <th>Penalty Amount</th>
                    <th>Penalty Type</th>
                    <th>Penalty Description</th>
                    <th>Issued Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Payment Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {penaltyData?.filter(
                    (el) =>
                      (el.status === "Approved" || el.status === "Pending") &&
                      el.paymentStatus === "Unpaid"
                  ).length > 0 ? (
                    penaltyData.map((el, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{el.customerId?.name}</td>
                        <td>{el.vehicleId?.vehicleName}</td>
                        <td>₹{el.penaltyAmount}</td>
                        <td>{el.penaltyType?.penaltyRules}</td>
                        <td>{el.penaltyDescription}</td>
                        <td>{el.issuedDate}</td>
                        <td>{el.dueDate}</td>
                        <td>{el.status}</td>
                        <td>{el.paymentStatus}</td>
                        <td>
                          <button
                            className="btn btn-success btn-lg"
                            onClick={() => handleFullPayment(el)}
                          >
                            Pay
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center">
                        <h1 className="mt-5 mb-5">
                          <i className="bi bi-star-fill text-info"></i>
                          Congratulations! You have no penalties
                          <i className="bi bi-balloon-fill text-info"></i>
                        </h1>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
