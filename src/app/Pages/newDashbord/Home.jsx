import React from "react";

const HomeDashbord = () => {
  return (
    <>
      <div className="flex-1 px-2 sm:px-0">
        {/* Groups Name */}
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-bold text-gray-800">Home</h3>
        </div>

        {/* Content Groups*/}
        <div className="mb-10 sm:mb-0 w-full mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">

          <div className="flex  items-center p-8 bg-gray-700 shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl text-gray-300 font-bold">6.8</span>
              <span className="block text-gray-300">Average mark</span>
            </div>
          </div>


          <div className="flex  items-center p-8 bg-gray-700 shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl text-gray-300 font-bold">6.8</span>
              <span className="block text-gray-300">Average mark</span>
            </div>
          </div>


          <div className="flex items-center p-8 bg-gray-700 shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl text-gray-300 font-bold">6.8</span>
              <span className="block text-gray-300">Average mark</span>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default HomeDashbord;
