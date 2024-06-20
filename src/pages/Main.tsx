import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { addData } from "../scripts/Database";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/login");
      addData();
    }
  }, [location.pathname, navigate]);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Outlet />
    </div>
  );
};
export default Main;
