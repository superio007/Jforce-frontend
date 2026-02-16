import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

type FormValues = {
  Email: string;
  Pass: string;
};
const Signin = () => {
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
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="Email" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  {...register("Email", {
                    required: "Email is required",
                  })}
                  id="Email"
                  className="form-input rounded border-[#cfe7e7] bg-[#f6f8f7] h-14 px-4 text-base"
                  placeholder="Enter your email"
                  type="email"
                />
                {errors.Email && (
                  <p className="text-red-500 text-sm">{errors.Email.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Password</label>
                <input
                  {...register("Pass", { required: "Password is required" })}
                  className="form-input rounded border-[#cfe7e7] bg-[#f6f8f7] h-14 px-4 text-base"
                  placeholder="Enter your password"
                  type="text"
                />
                {errors.Pass && (
                  <p className="text-red-500 text-sm">{errors.Pass.message}</p>
                )}
              </div>
              <button
                className="w-full bg-[#33afe3] cursor-pointer hover:opacity-90 text-white font-bold py-4 rounded text-lg hover:shadow-lg transition-all"
                type="submit"
              >
                Submit
              </button>
              <p className="text-center capitalize">
                If you are new?{" "}
                <Link to={"/register"} className="text-[#33afe3]">
                  register now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
