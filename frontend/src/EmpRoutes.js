import { Route, Redirect } from "react-router-dom";
import getCurrentUser from "./components/auth";

const EmpRoute = ({ component: Component, ...rest }) => {
  const check = getCurrentUser();

  return (
    <Route
      {...rest}
      render={(props) =>
        check.role === 2 ? (
          <Redirect to="/notfound" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
export default EmpRoute;
