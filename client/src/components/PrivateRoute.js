import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ path, component, isLoggedIn, exact }) {
  if (isLoggedIn) {
    return <Route path={path} component={component} exact={exact} />;
  } else {
    return <Redirect to="/login" />;
  }
}

export default PrivateRoute;
