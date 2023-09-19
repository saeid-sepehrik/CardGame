import { ReactElement } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";

interface childrenProps {
  children: ReactElement;
}

export const ProtectedRout = ({ children }: childrenProps) => {
  const auth = useAppSelector((s) => s.auth);
  if (auth.token) return children;
  return (
    <>
      <Navigate to={"/login"} />
    </>
  );
};
