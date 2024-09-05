"use client";
import React, { useContext } from "react";
import { DashboardContext } from "@/app/context/ApiContext";
import Link from "next/link";

const LoginForm = () => {
  const { checkUser, setCheckUser, checkUserAcc, isLoadingLoding } =
    useContext(DashboardContext);

  // معالج تقديم النموذج
  const handleSubmit = (e) => {
    e.preventDefault(); // منع الإرسال الافتراضي للنموذج
    checkUserAcc(); // استدعاء وظيفة التحقق من المستخدم
  };

  return (
    <>
      <div className="w-full mt-4">
        <input
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          type="email"
          placeholder="Email Address"
          aria-label="Email Address"
          id="email"
          required
          value={checkUser.email}
          onChange={(e) =>
            setCheckUser({ ...checkUser, email: e.target.value })
          }
        />
      </div>
      <div className="w-full mt-4">
        <input
          className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg  dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          type="password"
          placeholder="Password"
          aria-label="Password"
          id="password"
          value={checkUser.password}
          onChange={(e) =>
            setCheckUser({ ...checkUser, password: e.target.value })
          }
          required
        />
      </div>

      {/* {errorMsg && (
        <p className="error" style={{ color: "red" }}>
          {errorMsg}
        </p>
      )} */}

      <div className="flex items-center justify-end mt-4">
        {/* <a
          href="#"
          className="text-sm text-gray-600  hover:text-gray-500"
        >
          Forget Password?
        </a> */}
      </div>

      <div className=" md:flex md:items-center">
        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          {isLoadingLoding ? "Loading..." : "Sign In"}{" "}
        </button>

        <Link
          href={`/Pages/Register`}
          className="inline-block mt-4 text-center text-blue-500 md:mt-0 md:mx-6 hover:underline "
        >
          Register
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
