import React from "react";

export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <span className="navbar-brand">Andre</span>
        <button className="btn btn-outline-danger">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
          <span> Exit</span>
        </button>
      </div>
    </div>
  );
};
