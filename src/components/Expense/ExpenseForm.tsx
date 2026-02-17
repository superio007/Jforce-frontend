import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type FormValues = {
  Expensename: string;
  Amount: string;
  Date: string;
  Description: string;
};

type Payload = {
  user_id: number;
  amount: string;
  expense_date: string;
  description: string;
  notes: string;
};

const fetchExpense = async (id: string) => {
  const res = await axios.get(`http://localhost:3001/api/expenses/${id}`);
  return res.data.data;
};

const updateExpense = async (id: string, payload: Payload) => {
  const res = await axios.put(
    `http://localhost:3001/api/expenses/${id}`,
    payload,
  );
  return res.data.data;
};

const addExpense = async (payload: Payload) => {
  const res = await axios.post(`http://localhost:3001/api/expenses`, payload);
  return res.data.data;
};

const ExpenseForm = () => {
  const { action, id } = useParams();
  const navigate = useNavigate();
  const userId = useMemo(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return "";
    return JSON.parse(stored)?.userId ?? "";
  }, []);

  const isUpdate = action === "update-expense" && !!id;

  const { data: expense, isLoading } = useQuery({
    queryKey: ["expense", id],
    queryFn: () => fetchExpense(id as string),
    enabled: isUpdate,
    refetchOnWindowFocus: false,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      Expensename: "",
      Amount: "",
      Date: "",
      Description: "",
    },
  });

  // Only reset when update data is fetched
  useEffect(() => {
    if (isUpdate && expense) {
      reset({
        Expensename: expense.notes ?? "",
        Amount: expense.amount ?? "",
        Date: expense.expense_date ? expense.expense_date.split("T")[0] : "",
        Description: expense.description ?? "",
      });
    }
  }, [expense, isUpdate, reset]);

  const onSubmit = async (data: FormValues) => {
    const payload: Payload = {
      user_id: Number(userId),
      amount: data.Amount,
      expense_date: data.Date,
      description: data.Description,
      notes: data.Expensename,
    };

    if (isUpdate) {
      await updateExpense(id as string, payload);
      reset();
      navigate("/expenses");
    } else {
      await addExpense(payload);
      reset(); // clear form only when adding
      navigate("/expenses");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-amber-100 h-screen w-full">
      <div className="container mx-auto h-screen flex justify-center items-center">
        <div className="bg-amber-300 rounded p-4 w-full max-w-80">
          <h2 className="text-center font-bold">
            {isUpdate ? "Update Expense" : "Add Expense"}
          </h2>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="Expensename" className="text-sm font-semibold">
                Expense Name
              </label>
              <input
                {...register("Expensename", {
                  required: "Expensename is required",
                })}
                id="Expensename"
                className="form-input rounded border-[#cfe7e7] bg-[#f6f8f7] h-14 px-4 text-base"
                placeholder="Enter your Expensename"
                type="text"
              />
              {errors.Expensename && (
                <p className="text-red-500 text-sm">
                  {errors.Expensename.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Amount</label>
              <input
                {...register("Amount", {
                  required: "Amount is required",
                })}
                className="form-input rounded border-[#cfe7e7] bg-[#f6f8f7] h-14 px-4 text-base"
                placeholder="Enter your amount"
                type="number"
              />
              {errors.Amount && (
                <p className="text-red-500 text-sm">{errors.Amount.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Date" className="text-sm font-semibold">
                Date
              </label>
              <input
                {...register("Date", {
                  required: "Amount is required",
                })}
                id="Date"
                className="form-input rounded border-[#cfe7e7] bg-[#f6f8f7] h-14 px-4 text-base"
                placeholder="Enter your Date"
                type="date"
              />
              {errors.Date && (
                <p className="text-red-500 text-sm">{errors.Date.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="Description" className="text-sm font-semibold">
                Description
              </label>
              <textarea
                {...register("Description", {
                  required: "Description is required",
                })}
                id="Description"
                className="form-input rounded border-[#cfe7e7] bg-[#f6f8f7] p-4 text-base"
                placeholder="Enter your full name"
              />
              {errors.Description && (
                <p className="text-red-500 text-sm">
                  {errors.Description.message}
                </p>
              )}
            </div>
            <button
              className="w-full bg-[#33afe3] cursor-pointer hover:opacity-90 text-white font-bold py-4 rounded text-lg hover:shadow-lg transition-all"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExpenseForm;
