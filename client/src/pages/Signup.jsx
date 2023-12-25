import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpwError, setConfirmpwError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPW: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handlenameBlur = (e) => {
    if (e.target.value.length < 6) {
      setUsernameError("Should be at least 6 characters long");
    } else if (!e.target.value.match(/.*[0-9].*/)) {
      //match returns false if theres no num, but we want it to be true so the if statemtn executes
      setUsernameError("Should contain a number");
    } else {
      setUsernameError("");
    }
  };
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
  const handleconfirmpwBlur = (e) => {
    // console.log(formData, e.target.value);
    if (e.target.value !== formData.password) {
      setConfirmpwError("Passwords should match");
    } else {
      setConfirmpwError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3001/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      } else {
        console.log(res);
      }
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-5 text-gray-800 my-16 text-center">
        Sign Up
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="mb-2 ">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold "
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            required
            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
              usernameError && "border-red-500"
            }`}
            placeholder="jcheng01"
            minLength="5"
            pattern=".*[0-9].*"
            title="Username must have 5 char and a number"
            onChange={handleChange}
            onBlur={handlenameBlur}
          />
          <p className="text-red-500 text-xs italic h-4">{usernameError}</p>
        </div>
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
        <div className="mb-6">
          <label
            htmlFor="confirmPW"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPW"
            required
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 ${
              confirmpwError && "border-red-500"
            }`}
            placeholder="password"
            onChange={handleChange}
            onBlur={handleconfirmpwBlur}
          />
          <p className="text-red-500 text-xs italic h-4">{confirmpwError}</p>
        </div>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
