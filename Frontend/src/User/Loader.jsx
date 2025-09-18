import { ClipLoader, MoonLoader } from "react-spinners";

export default function Loader()
{
    return(
        <>
        <div className="container">
            <div className="row " style={{height:"80vh",paddingTop:"100px"}}>
                <div className="col-3 d-flex justify-content-center my-auto mx-auto" style={{fontWeight:'bolder'}} >
                <ClipLoader color="#f77d0a"  size={"130px"}  loading={true} />
                </div>
            </div>
        </div>
        </>
    )
}