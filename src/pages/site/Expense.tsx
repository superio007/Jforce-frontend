import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
const fetchexpenses = async (user_id: any) => {
  const res = await axios.get(
    `http://localhost:3001/api/expenses?user_id=${user_id}`,
  );
  return res?.data?.data;
};
const Expense = () => {
  const [userId, setuserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const user = JSON.parse(stored);
      if (user) {
        setuserId(user?.userId);
      } else {
        navigate("/auth/signin");
      }
    }
  }, []);
  const { data: expenses = [], isLoading } = useQuery({
    queryKey: ["expenses", userId],
    queryFn: () => fetchexpenses(userId as string),
    enabled: !!userId,
    // staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  console.log(expenses);
  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div className="bg-amber-100 min-h-screen w-full">
        <div className="container mx-auto p-8 flex flex-col space-y-6 justify-center items-center">
          <h2 className="text-xl font-bold text-center">Expense List</h2>
          <div className="flex flex-col gap-3 w-full">
            {expenses?.map((expense: any, index: number) => (
              <div
                key={index}
                className="rounded bg-amber-50 space-y-2 p-3 w-full"
              >
                <h3 className="text-xl font-bold">{expense?.notes}</h3>
                <p>
                  Amount: <span>{`₹${expense?.amount}`}</span>
                </p>
                <p>
                  Date: <span>{expense?.created_at.split("T")[0]}</span>
                </p>
                <p>{expense?.description}</p>
                <button
                  onClick={() =>
                    navigate(`/expenses/update-expense/${expense?.expense_id}`)
                  }
                  className="p-2 rounded hover:cursor-pointer hover:opacity-90 bg-[#33afe3] text-white"
                >
                  Update
                </button>
              </div>
            ))}
            {expenses.length === 0 && (
              <div className="rounded bg-amber-50 space-y-3 p-3  w-full">
                <h3 className="text-xl font-bold text-center">
                  No expense found
                </h3>
                <div className="flex justify-center">
                  <button
                    onClick={() => navigate(`/expenses/add-expense`)}
                    className="p-2 rounded hover:cursor-pointer  hover:opacity-90 bg-[#33afe3] text-white"
                  >
                    Have some
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Expense;
