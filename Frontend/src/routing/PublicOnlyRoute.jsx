import { Navigate } from "react-router-dom";
import useUserStore from "../zustand/useUserStore";

export const PublicOnlyRoute = ({ children }) => {
  const user = useUserStore((state) => state.user);
  const accountType = useUserStore((state) => state.accountType);
  
  if (user && accountType) {
    return <Navigate to={`/${accountType}/dashboard`} replace />;
  }
  return children;
};