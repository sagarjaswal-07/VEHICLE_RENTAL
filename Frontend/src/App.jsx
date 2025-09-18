import "../public/css/input.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Master from "./Layout/Master";
import Home from "./User/Home";
import About from "./User/About";
import Categories from "./User/Categories";
import Vehicles from "./User/Vehicles";
import VehicleDetails from "./User/VehicleDetails";
import Owners from "./User/Owners";
import Contact from "./User/Contact";
import UserRegister from "./Authentication/UserRegister";
import OwnerRegister from "./Authentication/OwnerRegister";
import Login from "./Authentication/Login";
import AdminMaster from "./Admin/AdminMaster";
import Dashboard from "./Admin/Dashboard";
import AddCategory from "./Admin/AddCategory";
import ManageCategory from "./Admin/ManageCategory";
import { ToastContainer } from "react-toastify";
import UpdateCategory from "./Admin/UpdateCategory";

import ManageOwners from "./Admin/ManageOwners";
import ManageQueries from "./Admin/ManageQueries";
import OwnerMaster from "./Owner/OwnerMaster";
import OwnerDashboard from "./Owner/OwnerDashboard";
import AddVehicles from "./Owner/AddVehicles";
import ManageVehicles from "./Owner/ManageVehicles";
import UpdateVehicles from "./Owner/UpdateVehicles";
import AddVehicleAvailability from "./Owner/AddVehicleAvailability";
import OwnerProfile from "./Owner/OwnerProfile";
import AddPenaltyRules from "./Admin/AddPenaltyRules";
import ManagePenaltyRules from "./Admin/ManagePenaltyRules";
import UpdatePenaltyRules from "./Admin/UpdatePenaltyRules";
import ViewVehicles from "./Admin/ViewVehciles";
import ManageVehiclesAvailability from "./Owner/ManageVehcileAvailability";
import UpdateVehicleAvailability from "./Owner/UpdateVehicleAvailability";
import ViewCategories from "./Owner/ViewCategories";
import RentVehicle from "./User/RentVehicle";
import ManageRentedVehciles from "./Admin/ManageRentedVehicles";

import ManageAcceptedRentalVehicle from "./Owner/ManageAcceptedRentalVehicles";
import ManageRejectedRentalVehicle from "./Owner/ManageRejectedRentalVehicles";
import ManagePendingRentalVehicle from "./Owner/ManagePendingRentalVehcles";
import UpdateOwnerProfile from "./Owner/UpdateOwnerProfile";
import ShowVehicles from "./User/ShowVehicle";
import ManageCompletedRentalVehicle from "./Owner/ManageCompletedRentalVehicle";
import AddPenalty from "./Owner/AddPenalty";
import ManagePendingPenalties from "./Owner/ManagePendingPenalties";
import ManagePaidPenalties from "./Owner/ManagePaidPanalties";
import ManageUnpaidPenalties from "./Owner/ManageUnpaidPenalty";
import ManagePenalties from "./Admin/ManagePenalties";
import MyBooking from "./User/MyBooking";
import SeePenalties from "./User/SeePenalty";
import ViewPenaltyRules from "./Owner/ViewPenaltyRules";
import RejectedPenalties from "./Owner/RejectedPenalties";
import ApprovedPenalties from "./Owner/ApprovedPenalties";
import UpdatePenalty from "./Owner/UpdatePenalty";
import ManageCancelledRentalVehicle from "./Owner/ManageCancelledRentalVehicles";
import PaymentSuccess from "./User/PaymentSuccess";
import PenaltyPaySuccess from "./User/PenaltyPaySuccess";
import PenaltyPayFailed from "./User/PenaltyPayFailed";
import PaymentFailed from "./User/PaymentFailed";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Master />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicle-details/:id" element={<VehicleDetails />} />
            <Route path="/owners" element={<Owners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/owner-register" element={<OwnerRegister />} />
            <Route path="/login" element={<Login />} />
            <Route path="/rentvehicle/:id" element={<RentVehicle />} />
            <Route path="/showvehicle/:id" element={<ShowVehicles />} />
            <Route path="/mybooking" element={<MyBooking />} />
            <Route path="/seepenalties" element={<SeePenalties />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/penaltypaysuccess" element={<PenaltyPaySuccess />} />
            <Route path="/penaltypayfailed" element={<PenaltyPayFailed />} />
            <Route path="/paymentfailed" element={<PaymentFailed />} />
          </Route>

          <Route path="/admin" element={<AdminMaster />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/addcategory" element={<AddCategory />} />
            <Route path="/admin/managecategory" element={<ManageCategory />} />
            <Route
              path="/admin/updatecategory/:id"
              element={<UpdateCategory />}
            />
            <Route path="/admin/manageowners" element={<ManageOwners />} />
            <Route path="/admin/managequeries" element={<ManageQueries />} />
            <Route
              path="/admin/addpenaltyRules"
              element={<AddPenaltyRules />}
            />
            <Route
              path="/admin/managepenaltyRules"
              element={<ManagePenaltyRules />}
            />
            <Route
              path="/admin/updatepenaltyrules/:id"
              element={<UpdatePenaltyRules />}
            />
            <Route path="/admin/viewvehicles" element={<ViewVehicles />} />
            <Route
              path="/admin/managerentedvehicle"
              element={<ManageRentedVehciles />}
            />
            <Route
              path="/admin/managepenalties"
              element={<ManagePenalties />}
            />
          </Route>

          <Route path="/owner" element={<OwnerMaster />}>
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/owner/addvehicles" element={<AddVehicles />} />
            <Route path="/owner/managevehicles" element={<ManageVehicles />} />
            <Route
              path="/owner/updatevehicles/:id"
              element={<UpdateVehicles />}
            />
            <Route
              path="/owner/addvehiclesavailability"
              element={<AddVehicleAvailability />}
            />
            <Route
              path="/owner/managevehiclesavailability"
              element={<ManageVehiclesAvailability />}
            />
            <Route
              path="/owner/updatevehiclesavailability/:id"
              element={<UpdateVehicleAvailability />}
            />
            <Route path="/owner/viewcategories" element={<ViewCategories />} />
            <Route path="/owner/profile" element={<OwnerProfile />} />
            <Route
              path="/owner/updateprofile/:id"
              element={<UpdateOwnerProfile />}
            />
            <Route
              path="/owner/managependingrenting"
              element={<ManagePendingRentalVehicle />}
            />
            <Route
              path="/owner/manageacceptedrenting"
              element={<ManageAcceptedRentalVehicle />}
            />
            <Route
              path="/owner/managerejectedrenting"
              element={<ManageRejectedRentalVehicle />}
            />
            <Route
              path="/owner/managecompletedrenting"
              element={<ManageCompletedRentalVehicle />}
            />
            <Route
              path="/owner/managecancelledrenting"
              element={<ManageCancelledRentalVehicle />}
            />
            <Route path="/owner/addpenalty/:id" element={<AddPenalty />} />
            <Route
              path="/owner/managependingpenalties"
              element={<ManagePendingPenalties />}
            />
            <Route
              path="/owner/managepaidpenalties"
              element={<ManagePaidPenalties />}
            />
            <Route
              path="/owner/updatepenalties/:id"
              element={<UpdatePenalty />}
            />
            <Route
              path="/owner/manageunpaidpenalties"
              element={<ManageUnpaidPenalties />}
            />
            <Route
              path="/owner/manageapprovedpenalties"
              element={<ApprovedPenalties />}
            />
            <Route
              path="/owner/managerejectedpenalties"
              element={<RejectedPenalties />}
            />
            <Route
              path="/owner/viewpenaltyrules"
              element={<ViewPenaltyRules />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
