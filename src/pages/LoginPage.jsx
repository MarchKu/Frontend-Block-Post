import { useState } from "react";
import { useAuth } from "../contexts/authentication";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username,
      password,
    };
    login(data);
  };

  return (
    <>
      <section className="w-full h-screen flex flex-col justify-center items-center">
        <form
          className="login-form min-w-[450px] min-h-[270px]  bg-slate-400 flex flex-col justify-center items-center rounded-lg gap-[1.5rem] py-[1rem] px-[1rem]"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-[2rem]">Login </h1>
          <label className="font-semibold w-[80%] flex justify-between">
            Username
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Enter username here"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
              value={username}
              className="ml-[1.5rem] pl-[0.5rem] font-normal w-auto"
            />
          </label>
            <label className="font-semibold w-[80%] flex justify-between">
              Password
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter password here"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                value={password}
                className="ml-[1.5rem] pl-[0.5rem] font-normal w-auto"
              />
            </label>
          <div className="flex flex-col justify-center items-center gap-[0.5rem]">
            <button
              type="submit"
              className="w-[180px] bg-orange-500 rounded-lg p-2 font-semibold hover:bg-orange-600"
            >
              {isLoading ? (
                <div>
                  <div
                    className="inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                  ></div>
                  <span className="ml-2">Processing...</span>
                </div>
              ) : (
                <span className="ml-2">Login</span>
              )}
            </button>
            <p>
              If you do not have an accout please{" "}
              <Link
                to="/register"
                className="underline font-semibold text-orange-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
}

export default LoginPage;
