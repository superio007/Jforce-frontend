import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type Payload = {
  email: string;
  password: string;
};
type FormValues = {
  Email: string;
  Pass: string;
};
const postSignin = async (payload: Payload) => {
  const res = await axios.post("http://localhost:3001/api/auth/login", payload);
  return res?.data?.data;
};
const Signin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);
    const Payload: any = {
      email: data?.Email,
      password: data?.Pass,
    };
    const result = await postSignin(Payload as any);
    if (result) {
      const payload: any = {
        token: result?.token,
        userId: result?.user?.user_id,
      };
      console.log(payload);
      localStorage.setItem("user", JSON.stringify(payload));
      navigate("/");
    }

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
                <Link to={"/auth/register"} className="text-[#33afe3]">
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
