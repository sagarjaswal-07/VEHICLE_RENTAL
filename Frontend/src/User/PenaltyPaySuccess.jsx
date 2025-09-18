import { useNavigate } from "react-router-dom";


export default function PenaltyPaySuccess() {
    const nav = useNavigate();

    return (
        <div className="container text-center mt-5">
            <h1 className="text-success" style={{fontSize:'70px'}}>Penalty Payment Successful 🎉</h1>
            <h2>Your Penalty is paid wait for the Admin and Owner approval !!</h2>
            <button className="btn btn-primary  mt-3 px-3 py-2" style={{boxShadow:'3px 4px 8px black',borderRadius:'3px'}} onClick={() => nav("/")}>
                Go to My Home
            </button>
        </div>
    );
}
