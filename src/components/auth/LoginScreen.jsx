import React from "react";
import "../../css/login.css";

export const LoginScreen = () => {
  return (
    <main className="container-fluid">
      <div className="row boxLogin">
        <div className="col-12 col-sm-6">
          <form className="form-signin">
            <h1 className="h3 mb-3 fw-normal text-center">Login</h1>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
              <label className="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
              <label className="floatingInput">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-primary mt-2">
              Sign in
            </button>
          </form>
        </div>
        <div className="col-12 col-sm-6">
          <form className="form-signin">
            <h1 className="h3 mb-3 fw-normal text-center">Register</h1>
            <div className="form-floating">
              <input type="text" className="form-control" placeholder="Name" />
              <label className="floatingInput">Name</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
              <label className="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                placeholder="Email"
              />
              <label className="floatingInput">Password</label>
            </div>
            <button className="w-100 btn btn-lg btn-success mt-2">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
