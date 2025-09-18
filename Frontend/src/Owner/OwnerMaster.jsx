import { Outlet } from "react-router-dom";
import OwnerHeader from "../Layout/OwnerHeader";
import OwnerFooter from "../Layout/OwnerFooter";

export default function OwnerMaster(){
    return(
        <>
        <OwnerHeader />
        <Outlet />
        <OwnerFooter/>
        </>
    )
}