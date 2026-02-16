import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <div className="bg-amber-50 w-full p-2 text-center">
        <p className=" text-center ">
          Made By{" "}
          <Link to={""} className="text-[#33afe3] font-bold">
            Kiran Dhoke
          </Link>
        </p>
      </div>
    </>
  );
};

export default Footer;
