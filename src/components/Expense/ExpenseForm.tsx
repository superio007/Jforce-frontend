import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

type FormValues = {
  Expensename: string;
  Amount: string;
  Date: string;
  Description: string;
};
const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);

    Swal.fire({
      icon: "success",
      title: "Message Sent",
      text: "We will contact you shortly.",
      confirmButtonColor: "#33afe3",
    });

    reset();
  };
  return (
    <>
      <div className="bg-amber-100 h-screen w-full">
        <div className="container mx-auto h-screen flex justify-center items-center">
          <div className="bg-amber-300 rounded p-4 w-full max-w-80">
            <h2 className="text-center text-black font-bold">Sign In</h2>
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
                  <p className="text-red-500 text-sm">
                    {errors.Amount.message}
                  </p>
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
    </>
  );
};

export default ExpenseForm;
