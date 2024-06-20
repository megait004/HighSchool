import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <div className="flex min-h-screen w-full justify-between">
      <div className="flex-grow-1">
        <NavBar />
      </div>
      <div className="flex-grow overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
