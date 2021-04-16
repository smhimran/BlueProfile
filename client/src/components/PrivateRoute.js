import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({
  path,
  component,
  isLoggedIn,
  exact,
  handleStateChange,
}) {
  if (isLoggedIn) {
    return (
      <Route
        path={path}
        component={component}
        exact={exact}
        handleStateChange={handleStateChange}
      />
    );
  } else {
    return <Redirect to="/login" />;
  }
}

export default PrivateRoute;
