import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const ProtectedElement = ({ children }) => {
  const navigate = useNavigate("");
  const { loading, userInfo, error } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo === null || userInfo === undefined) {
      setTimeout(() => {
        navigate("/login");
      }, 500);
    }
  }, [userInfo, navigate]);
  if (userInfo === null || userInfo === undefined) {
    return (
      <div className='flex items-center justify-center w-full h-screen text-center'>
        <Spinner />
      </div>
    );
  }
  return <>{children}</>;
};

export default ProtectedElement;
