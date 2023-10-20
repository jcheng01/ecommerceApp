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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5174/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      // console.log(data);
      const datajson = await res;
      console.log(datajson);
      // console.log(JSON.stringify(data));
      // if (datajson.success === false) {
      //   console.log("Login successful:", data.message);
      //   // setMessage("Login successful!");
      //   // You might handle navigation or store a token here
      // }
      // navigate("/");
    } catch (error) {
      console.log("Login error:", error);
      // setMessage("Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            className="border p-3 rounded-lg"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-lg"
            id="password"
            onChange={handleChange}
          />

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
