import { Outlet } from "react-router";
import bgImg from "../images/bg.jpg";

const MainLayout = () => {
  const gradient = "linear-gradient(to top, rgba(56,189,248,0.4), rgba(30,27,75,0.4))";

  return (
    <div
      className="relative w-full h-dvh text-white"
      style={{
        backgroundImage: `${gradient}, url(${bgImg})`,
      }}
    >
      <Outlet />
    </div>
  );
};

export default MainLayout;
