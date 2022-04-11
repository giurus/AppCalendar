import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";

export const Navbar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(startLogout());
  };
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand">Bienvenid@: {name}</span>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span> Exit</span>
        </button>
      </div>
    </div>
  );
};
