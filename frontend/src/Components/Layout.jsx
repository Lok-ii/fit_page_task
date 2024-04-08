import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full flex flex-col items-center gap-12">
      <div className="flex items-center font-bold text-6xl">
        <h1>
          Stock <span className="text-[#2563EB]">Scan Parser</span>
        </h1>
      </div>
      <div className="flex items-center justify-center p-4 shadow-home w-[25%] max-h-[60vh] rounded-lg">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
