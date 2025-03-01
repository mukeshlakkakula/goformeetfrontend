"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

const Register = () => {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://goformeetbackend-2.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Registration successful! Please log in.");
        router.push("/auth/login");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Something went wrong!");
    }
  };

  return (
    <>
      {" "}
      <Navbar />
      <div className="flex flex-col pt-4 w-full gap-5 items-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-bold mb-4">Register</h2>
          <input
            className="w-full p-2 border rounded mb-2"
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
          />
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
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
