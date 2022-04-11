import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { startChecking } from "../actions/auth";
import { LoginScreen } from "../components/auth/LoginScreen";
import { CalendarScreen } from "../components/calendar/CalendarScreen";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);
  if (checking) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="login"
            element={
              <PublicRoutes uid={uid}>
                <LoginScreen />
              </PublicRoutes>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoutes uid={uid}>
                <CalendarScreen />
              </PrivateRoutes>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
