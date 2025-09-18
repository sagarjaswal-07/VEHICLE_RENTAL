import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PaymentSuccess() {
    const nav = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h1 className="text-success" style={{fontSize:'70px'}}>Payment Successful 🎉</h1>
            <h2>Your booking has been confirmed!</h2>
            <button className="btn btn-primary  mt-3 px-3 py-2" style={{boxShadow:'3px 4px 8px black',borderRadius:'3px'}} onClick={() => nav("/mybooking")}>
                Go to My Bookings
            </button>
        </div>
    );
}
