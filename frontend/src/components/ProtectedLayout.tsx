import { Outlet } from "react-router-dom";
import ProtectedPage from "../utils/ProtectedPage";

const ProtectedLayout = () => {
  return (
    <ProtectedPage>
      <Outlet />
    </ProtectedPage>
  );
};

export default ProtectedLayout;