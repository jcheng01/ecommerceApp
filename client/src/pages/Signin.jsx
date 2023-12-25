import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const handleemailBlur = (e) => {
    if (!e.target.value) {
      setEmailError("Email is required");
    } else if (
      !e.target.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    ) {
      //match returns false if theres no num, but we want it to be true so the if statemtn executes
      setEmailError("Please enter valid email");
    } else {
      setEmailError("");
    }
  };
  const handlepasswordBlur = (e) => {
    if (e.target.value.length < 9) {
      setPasswordError("Password should be more than 8 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const datajson = await res;
      console.log(datajson);

      if (datajson.ok === true) {
        console.log("Login successful:");
        // You might handle navigation or store a token here
      }
      setLoading(false);

      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log("Login error:", error);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-5 text-gray-800 my-16 text-center">
          Sign In
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mb-2 ">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                emailError && "border-red-500"
              }`}
              placeholder="jcheng01@syr.edu"
              onChange={handleChange}
              onBlur={handleemailBlur}
            />
            <p className="text-red-500 text-xs italic h-4">{emailError}</p>
          </div>
          <div className="mb-2 ">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
                passwordError && "border-red-500"
              }`}
              placeholder="password"
              onChange={handleChange}
              onBlur={handlepasswordBlur}
            />
            <p className="text-red-500 text-xs italic h-4">{passwordError}</p>
          </div>

          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
          {/* <OAuth /> */}
        </form>
        <div className="flex gap-2 mt-5">
          <p>Dont have an account?</p>
          <Link to={"/signup"}>
            <span className="text-blue-700">Sign up</span>
          </Link>
        </div>
      </div>{" "}
    </>
  );
};

export default Signin;
