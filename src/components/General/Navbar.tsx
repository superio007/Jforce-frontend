import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const handlelogOut = () => {
    localStorage.removeItem("user");
    navigate("/auth/signin");
  };
  return (
    <>
      <div className="bg-amber-50 w-full p-4 space-y-2 text-center">
        <h2 className="text-lg text-center font-bold capitalize">
          Welcome to expense tracker
        </h2>
        <div className="flex justify-center gap-4 items-center">
          <Link
            to={"/expenses/add-expense"}
            className=" capitalize hover:cursor-pointer"
          >
            Add Expense
          </Link>
          <Link to={"/expenses"} className="capitalize hover:cursor-pointer">
            Expenses
          </Link>
        </div>
        <button
          onClick={() => handlelogOut()}
          className="bg-red-400 text-white rounded p-2 hover:cursor-pointer hover:opacity-90"
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default Navbar;
