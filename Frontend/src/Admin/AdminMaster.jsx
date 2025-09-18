import { Outlet } from "react-router-dom";
import AdminHeader from "../Layout/AminHeader";
import AdminFooter from "../Layout/AdminFooter";

export default function AdminMaster(){
    return(
        <>
        <AdminHeader />
        <Outlet />
        <AdminFooter />
        </>
    )
}