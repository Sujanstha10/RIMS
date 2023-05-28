import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate("");
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo?.isAdmin !== "admin") {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [userInfo?.isAdmin, navigate]);
  if (userInfo?.isAdmin !== "admin")
    return (
      <div className='flex items-center justify-center w-full h-screen text-center'>
        <Spinner />
      </div>
    );
  return <>{children}</>;
};

export default ProtectedRoute;
