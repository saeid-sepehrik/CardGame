import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button } from "antd";
import { logout } from "../auth/auth.slice";

export const HeaderComponent = () => {
  const auth = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  return (
    <div>
      {auth.token && (
        <Button
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      )}
    </div>
  );
};
