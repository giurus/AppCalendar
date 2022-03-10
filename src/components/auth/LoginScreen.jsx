import React from "react";
import "../../css/login.css";

export const LoginScreen = () => {
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Email" />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-group d-grid col-6">
              <input
                type="submit"
                className="btn btn-primary"
                value="Sign in"
              />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2 bg-primary">
          <h3>Register</h3>
          <form>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Name" />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repeat password"
              />
            </div>

            <div className="form-group d-grid col-6">
              <input type="submit" className="btn btn-light" value="Sign up" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
