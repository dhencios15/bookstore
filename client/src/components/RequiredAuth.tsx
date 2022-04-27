import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const RequiredAuth = ({ children }: { children: JSX.Element }) => {
  const auth = { user: "hello" };
  const location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/auth' state={{ from: location }} replace />;
  }

  return children;
};
