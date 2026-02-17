import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type FormValues = {
  Username: string;
  Email: string;
  Pass: string;
  Fullname: string;
};

type payLoad = {
  username: string;
  email: string;
  password: string;
  full_name: string;
};

const postUser = async (payLoad: FormValues) => {
  const res = await axios.post(
    "http://localhost:3001/api/auth/register",
    payLoad,
  );
  return res?.data?.data;
};

const Register = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setApiError("");
    setLoading(true);

    const payload: payLoad = {
      username: data.Username,
      email: data.Email,
      password: data.Pass,
      full_name: data.Fullname,
    };

    try {
      const res = await postUser(payload as any);

      const result = res?.data?.data;

      if (!result?.token) {
        throw new Error("Invalid server response");
      }

      const userPayload = {
        token: result.token,
        userId: result.user?.user_id,
      };

      localStorage.setItem("user", JSON.stringify(userPayload));
      reset();
      navigate("/");
    } catch (error: any) {
      if (error.response) {
        // Backend returned error
        setApiError(error.response.data?.message || "Registration failed");
      } else if (error.request) {
        setApiError("Server not responding. Try again later.");
      } else {
        setApiError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
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
                <label htmlFor="Username" className="text-sm font-semibold">
                  User Name
                </label>
                <input
                  {...register("Username", {
                    required: "Username is required",
                  })}
                  id="Username"
                  className="form-input rounded border-[#cfe7e7] bg-[#f6f8f7] h-14 px-4 text-base"
                  placeholder="Enter your username"
                  type="text"
                />
                {errors.Username && (
                  <p className="text-red-500 text-sm">
                    {errors.Username.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Password</label>
                <input
                  {...register("Pass", { required: "Password is required" })}
                  className="form-input rounded border-[#cfe7e7] bg-[#f6f8f7] h-14 px-4 text-base"
                  placeholder="Enter your password"
                  type="password"
                />
                {errors.Pass && (
                  <p className="text-red-500 text-sm">{errors.Pass.message}</p>
                )}
              </div>
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
                <label htmlFor="Fullname" className="text-sm font-semibold">
                  Full Name
                </label>
                <input
                  {...register("Fullname", {
                    required: "Full name is required",
                  })}
                  id="Fullname"
                  className="form-input rounded border-[#cfe7e7] bg-[#f6f8f7] h-14 px-4 text-base"
                  placeholder="Enter your full name"
                  type="text"
                />
                {errors.Fullname && (
                  <p className="text-red-500 text-sm">
                    {errors.Fullname.message}
                  </p>
                )}
              </div>
              <button
                disabled={loading}
                className="w-full bg-[#33afe3] cursor-pointer hover:opacity-90 text-white font-bold py-4 rounded text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
              >
                {loading ? "Processing..." : "Submit"}
              </button>

              {apiError && (
                <p className="text-red-600 text-sm text-center font-medium">
                  {apiError}
                </p>
              )}

              <p className="text-center capitalize">
                If you are user?{" "}
                <Link to={"/auth/signin"} className="text-[#33afe3]">
                  login now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
