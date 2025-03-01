"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [token, setToken] = useState(Cookies.get("jwt_token"));
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  console.log("jwt", Cookies.get("jwt_token"));

  const logout = () => {
    Cookies.remove("jwt_token");
    Cookies.remove("user");
    setToken(Cookies.get("jwt_token"));
    router.push("/");
  };
  useEffect(() => {
    setToken(Cookies.get("jwt_token"));
  }, [token]);
  return (
    <nav className="bg-blue-600 p-4 shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          GoForMeet
        </Link>

        <button
          className="text-white md:hidden block focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        <div
          className={`absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent p-4 md:p-0 md:flex items-center space-x-4 transition-all ${
            isOpen ? "block" : "hidden md:flex"
          }`}
        >
          {token !== undefined ? (
            <>
              <Link
                href="/tracking"
                className="block text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Tracker
              </Link>
              <Link
                href="/taskmanager"
                className="block text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Task Manager
              </Link>
              <button
                onClick={logout}
                className="block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="block bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
