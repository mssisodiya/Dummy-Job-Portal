import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import getCurrentUser from "./components/auth";

const EmpRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    check.role === 2 ? setIsAuthenticated(1) : setIsAuthenticated(2);
  }, []);
  const check = getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        check.role === 1 ? (
          <Redirect to="/notfound" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default EmpRoute;
