import { Link } from "react-router-dom";
const Navbar = () => {
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
      </div>
    </>
  );
};

export default Navbar;
