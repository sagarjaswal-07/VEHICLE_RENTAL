  import { useEffect, useState } from "react";
  import apiServices from "../Layout/APISERVICES/apiServices";
  import { toast } from "react-toastify";
  import { useParams } from "react-router-dom";
  import Loader from "../User/Loader";
  import { loadStripe } from "@stripe/stripe-js";

  export default function RentVehicle() {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [days, setDays] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [specialRequest, setSpecialRequest] = useState("");
    const [pickup, setPickupLocation] = useState("");
    const [drop, setDropLocation] = useState("");
    const [loader, setLoader] = useState(false);
    const [display, setDisplay] = useState("block");
    const [ownerId, setOwnerId] = useState("");
    const [perDayPrice, setPerDayPrice] = useState(0);
    const params = useParams();
    const id = params.id;

      useEffect(() => {
      apiServices
        .getsingleVehicleData(id)
        .then((res) => {
          setOwnerId(res.data.data.ownerId);
          setPerDayPrice(res.data.data.pricePerDay);
        })
        .catch((err) => console.error("Error fetching vehicle data:", err));
    }, [id]);

    // Calculate the total price when both dates are selected
    useEffect(() => {
      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDifference = end - start;
        const daysDifference = Math.max(
          1,
          timeDifference / (1000 * 3600 * 24) + 1
        );
        setDays(daysDifference);
        setTotalPrice(daysDifference * Number(perDayPrice));
      }
    }, [startDate, endDate, perDayPrice]);

    const addData = (e) => {
      e.preventDefault();
      const customerId = sessionStorage.getItem("customerId");

      if (!customerId) {
        toast.error("User not logged in. Please log in first.");
        return;
      }

      const data = {
        customerId,
        vehicleId: id,
        ownerId,
        startDate,
        endDate,
        totalPrice,
        days,
        specialRequest,
        pickupLocation: pickup,
        dropLocation: drop,
      };

      setLoader(true);
      setDisplay("none");

      apiServices
        .addRentingData(data)
        .then((res) => {
          if (res.data.success) {
            toast.success("Booking successful! Redirecting to payment...");

            sessionStorage.setItem("bookingDetails", JSON.stringify(data));
            makePayment(data);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.error("Error in booking:", err);
          toast.error("Failed to process booking.");
        })
        .finally(() => {
          setLoader(false);
          setDisplay("block");
        });
    };

    const handleEndDateChange = (e) => {
      const newEndDate = e.target.value;
      setEndDate(newEndDate);

      if (new Date(newEndDate) <= new Date(startDate)) {
        toast.error("End date must be after start date!");
      }
    };

    const handleStartDateChange = (e) => {
      const newStartDate = e.target.value;
      setStartDate(newStartDate);

      const today = new Date().toISOString().split("T")[0];
      if (newStartDate < today) {
        toast.error("Start date cannot be in the past!");
        setStartDate(today);
      }
    };

    const makePayment = async (bookingDetails) => {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );

      try {
        const token = sessionStorage.getItem("token"); // Get user token

        if (!token) {
          toast.error("Authentication required. Please log in.");
          return;
        }


        const response = await fetch(
          "http://localhost:3009/api/"+"create-checkout-session",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
                 Authorization: `Bearer ${token}`, //  Attach token in request headers
            },
            body: JSON.stringify(bookingDetails),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to initiate payment.");
        }

        const session = await response.json();



        if (session.id) {
          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });
          if (result.error) {
            console.error("Stripe Checkout Error:", result.error);
            toast.error("Stripe Checkout Error: " + result.error.message);
          }
        } else {
          toast.error("Failed to retrieve Stripe session ID.");
        }
      } catch (error) {
        console.error(" Payment error:", error);
        toast.error("Payment failed: " + error.message);
      }
    };


    return (
      <>
        {loader && <Loader />}
        <div style={{ display: display }}>
          <div className="container-fluid page-header">
            <h1 className="display-3 text-uppercase text-white mb-3">
              Rent A Vehicle
            </h1>
            <div className="d-inline-flex text-white">
              <h6 className="text-uppercase m-0">
                <a className="text-white" href="#">
                  Dashboard
                </a>
              </h6>
              <h6 className="text-body m-0 px-3">/</h6>
              <h6 className="text-uppercase text-body m-0">Rent A Vehicle</h6>
            </div>
          </div>
        </div>

        <div className="container-fluid py-5 " style={{ display: display }}>
          <div
            className="container pt-5 mt-n5 pb-3"
            style={{
              boxShadow: "3px 4px 8px #2b2e4a",
              borderRadius: "2px",
            }}
          >
            <h1 className="display-4 text-uppercase text-center mb-4">
              Rent <span className="text-primary">A Vehicle</span>
            </h1>
            <div className="row">
              <div className="col-lg-9 mx-auto mb-2">
                <div
                  className="contact-form bg-light mb-4"
                  style={{ padding: 30 }}
                >
                  <form onSubmit={addData}>
                    <div className="row">
                      <div className="col-6 form-group">
                        <label>Enter Start Date</label>
                        <input
                          type="date"
                          className="form-control p-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          required
                          value={startDate}
                          onChange={handleStartDateChange}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <label>Enter End Date</label>
                        <input
                          type="date"
                          className="form-control p-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          required
                          value={endDate}
                          onChange={handleEndDateChange}
                          readOnly={!startDate}
                          min={startDate}
                        />
                      </div>
                      <div className="col-6 form-group">
                        <label>Total Days</label>
                        <input
                          type="text"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-4"
                          readOnly
                          value={days}
                          placeholder="Number of days"
                        />
                      </div>
                      <div className="col-6 form-group">
                        <label>Total Price</label>
                        <input
                          type="text"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-4"
                          readOnly
                          value={totalPrice}
                          placeholder="Total Price"
                        />
                      </div>
                      <div className="col-12 form-group">
                        <label>Enter Special Request</label>
                        <input
                          type="text"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          className="form-control p-4"
                          required
                          value={specialRequest}
                          onChange={(e) => setSpecialRequest(e.target.value)}
                          placeholder="Enter special request"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-6">
                        <label>Enter Pickup Location</label>
                        <textarea
                          className="form-control py-3 px-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          rows={3}
                          required
                          value={pickup}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          placeholder="Enter Pickup location"
                        />
                      </div>
                      <div className="form-group col-6">
                        <label>Enter Drop Location</label>
                        <textarea
                          className="form-control py-3 px-4"
                          style={{
                            boxShadow: "2px 2px 8px #2b2e4a",
                            borderRadius: "2px",
                          }}
                          rows={3}
                          required
                          value={drop}
                          onChange={(e) => setDropLocation(e.target.value)}
                          placeholder="Enter Drop location"
                        />
                      </div>
                    </div>
                    <button
                      className="btn btn-primary mt-5 offset-md-5 py-3 px-5"
                      style={{
                        boxShadow: "3px 4px 8px #2b2e4a",
                        borderRadius: "2px",
                      }}
                      type="submit"
                    >
                      SEND
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
