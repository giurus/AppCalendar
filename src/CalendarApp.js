import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppRouter } from "./routes/AppRouter";
import "./css/style.css";

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};
