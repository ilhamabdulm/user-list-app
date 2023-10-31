import { FaArrowLeft } from "react-icons/fa";
import Button from "../elements/button";

const NotFoundOrganism = () => {
  return (
    <div className="fixed top-0 z-[9999999] -ml-6 min-h-screen h-full bg-[#F8F7FC] w-full xs:w-[420px] flex flex-col justify-center items-center space-y-8">
      <div className="text-center">
        <h1 className="text-g-800 font-bold">404</h1>
        <p className="text-neutral-9">Oops... Page not found!</p>
      </div>
      <Button variant="text" type="nav-link" to="/users">
        <FaArrowLeft /> Kembali
      </Button>
    </div>
  );
};

export default NotFoundOrganism;
