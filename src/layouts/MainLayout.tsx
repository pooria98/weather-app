import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="relative w-full h-dvh home-bg text-white">
      <Outlet />
    </div>
  );
};

export default MainLayout;
