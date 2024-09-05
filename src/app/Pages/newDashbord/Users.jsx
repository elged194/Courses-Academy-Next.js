import React from "react";

const Users = () => {
  return (
    <>
      <div className="flex-1 px-2 sm:px-0">
        {/* Groups Name */}
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-bold text-gray-800">Users</h3>
        </div>

        {/* Content Groups*/}
        <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
            <a
              className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </a>
            <a
              className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center"
              href="#"
            >
              Create User
            </a>
          </div>

          <div className="relative group bg-gray-900 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/80 hover:smooth-hover">
            <img
              className="w-20 h-20 object-cover object-center rounded-full"
              src="https://images.unsplash.com/photo-1547592180-85f173990554?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
              alt="cuisine"
            />
            <h4 className="text-white text-2xl font-bold capitalize text-center">
              Cuisine
            </h4>
            <p className="text-white/50">55 members</p>
            <p className="absolute top-2 text-white/20 inline-flex items-center text-xs">
              22 Online{" "}
              <span className="ml-2 w-2 h-2 block bg-green-500 rounded-full group-hover:animate-pulse" />
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
