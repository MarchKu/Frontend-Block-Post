import { useState } from "react";
import { useAuth } from "../contexts/authentication";
import "../App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const { register, isLoading } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };
    register(data);
  };

  return (
    <>
      <section className="w-full h-screen flex flex-col justify-center items-center">
        <form
          className="login-form w-[20%] min-w-[450px] bg-slate-400 flex flex-col justify-center items-center rounded-lg gap-[1.5rem] py-[1rem] px-[1rem]"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-[2rem]">Register</h1>
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
              className="ml-[1.5rem] pl-[0.5rem] font-normal"
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
              className="ml-[1.5rem] pl-[0.5rem] font-normal"
            />
          </label>
          <label className="font-semibold w-[80%] flex justify-between">
            First Name
            <input
              id="firstname"
              name="firstname"
              type="text"
              placeholder="Enter first name here"
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
              value={firstName}
              className="ml-[1.5rem] pl-[0.5rem] font-normal"
            />
          </label>
          <label className="font-semibold w-[80%] flex justify-between">
            Last Name
            <input
              id="lastname"
              name="lastname"
              type="text"
              placeholder="Enter last name here"
              onChange={(event) => {
                setLastName(event.target.value);
                ``;
              }}
              value={lastName}
              className="ml-[1.5rem] pl-[0.5rem] font-normal"
            />
          </label>
          <div className="flex gap-[1rem]">
            <Link
              to="/login"
              className="w-[180px] bg-orange-500 rounded-lg p-2 font-semibold hover:bg-orange-600 text-center"
            >
              Back to login
            </Link>
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
                <span className="ml-2">Submit</span>
              )}
            </button>
          </div>
        </form>
      </section>
      <ToastContainer />
    </>
  );
}

export default RegisterPage;
