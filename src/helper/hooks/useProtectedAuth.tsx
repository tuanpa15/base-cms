import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useProtectedAuth = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
  }
};

export default useProtectedAuth;
