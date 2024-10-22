import { Route, Routes } from "react-router-dom";
import AuthProvider from "../components/auth-provider";
import { lazy } from "react";

const Home = lazy(() => import("../pages/home"));
//STAFF
const Staff = lazy(() => import("../pages/staff"));
const StaffEdit = lazy(() => import("../pages/staff/EditStaff"));
const Login = lazy(() => import("../pages/login"));
const ForgotPassword = lazy(() => import("../pages/forgot-password"));

const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthProvider />}>
        <Route path="/staff" element={<Staff />} />
        <Route path="/staff/:id" element={<StaffEdit />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
};

export default RootRouter;
