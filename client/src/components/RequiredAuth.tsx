import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../hooks/store/useUser";

export const RequiredAuth = ({ children }: { children: JSX.Element }) => {
  const user = useUser((state) => state.user);
  const location = useLocation();

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/auth' state={{ from: location }} replace />;
  }

  return children;
};
