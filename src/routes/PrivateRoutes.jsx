import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children, uid }) => {
  return !!uid ? children : <Navigate to="/login" />;
};
