import { useNavigate } from "react-router-dom";
const Expense = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-amber-100 h-screen w-full">
        <div className="container mx-auto p-8 flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold text-center">Expense List</h2>
          <div className="flex flex-col gap-3 w-full">
            <div className="rounded bg-amber-50 space-y-2 p-3 w-full">
              <h3 className="text-xl font-bold">Lunch with friends</h3>
              <p>
                Amount: <span>{"₹150"}</span>
              </p>
              <p>
                Date: <span>{"15-01-2025"}</span>
              </p>
              <button
                onClick={() => navigate(`/expenses/update-expense/`)}
                className="p-2 rounded hover:cursor-pointer hover:opacity-90 bg-[#33afe3] text-white"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Expense;
