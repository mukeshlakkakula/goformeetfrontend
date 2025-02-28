"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie"; // Import js-cookie
import Navbar from "@/components/Navbar";

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitSuccess = (jwtToken, user) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 6,
    });

    Cookies.set("user", JSON.stringify({ email: user }));

    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        alert("Logged in  successful!");
        console.log("userd", data.user.email);
        onSubmitSuccess(data.token, data.user.email);
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 items-center h-screen bg-gray-100">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          className="w-full p-2 border rounded mb-2"
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded mb-2"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button className="bg-blue-500 text-white w-full p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
