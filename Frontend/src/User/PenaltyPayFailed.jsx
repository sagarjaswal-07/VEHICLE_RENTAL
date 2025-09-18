import { useNavigate } from "react-router-dom";


export default function PenaltyPayFailed() {
    const nav = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h1 className="text-success" style={{fontSize:'70px'}}>Penalty Payment Failed </h1>
            <h2>Your Penalty is not paid ,Try Again !</h2>
            <button className="btn btn-primary  mt-3 px-3 py-2" style={{boxShadow:'3px 4px 8px black',borderRadius:'3px'}} onClick={() => nav("/")}>
                Go to My Home
            </button>
        </div>
    );
}
