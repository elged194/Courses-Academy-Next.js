/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import Users from "./Users";
import Products from "./Products";
import Home from "./Home";

const page = () => {
  const [pages, setpages] = useState("home");
  return (
    <>
      {/* component */}

      <div className="w-full  flex-1 flex flex-col space-y-5 lg:space-y-0 lg:flex-row lg:space-x-10  sm:p-6 sm:my-2  ">
        {/* start Navigation */}
        <div className="bg-gray-800 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
          {/* sidBar */}
          <nav className="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">

            <a
              className={`text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-700 hover:text-white smooth-hover ${pages === 'home'? 'bg-gray-700' : ''}`}
              href="#"
              onClick={() => setpages("home")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </a>

            {/* Active: bg-gray-800 text-white, Not active: text-white/50 */}
            <a
              className={`text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-700 hover:text-white smooth-hover ${pages === 'users'? 'bg-gray-700' : ''}`}
              href="#"
              onClick={() => setpages("users")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </a>

            <a
              className={`text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-700 hover:text-white smooth-hover ${pages === 'products'? 'bg-gray-700' : ''}`}
              href="#"
              onClick={() => setpages("products")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </nav>

         
        </div>

        {/* ---/ Dashbord Home /--- */}
        {(pages === "home" ? <Home /> : "")}

        {/* ---/ Products /--- */}
        {(pages === "products" ? <Products /> : "")}

        {/* ---/ Users /--- */}
        {(pages === "users" ? <Users /> : "")}
      </div>
    </>
  );
};

export default page;
