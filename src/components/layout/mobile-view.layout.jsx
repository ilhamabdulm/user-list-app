import { Outlet } from "react-router-dom";

const MobileViewLayout = () => {
  return (
    <main className="!min-h-screen flex justify-center">
      <div className="w-full xs:w-[420px] min-h-screen h-full bg-[#F8F7FC] xs:shadow-md">
        <Outlet />
      </div>
    </main>
  );
};

export default MobileViewLayout;
