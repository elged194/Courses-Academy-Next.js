"use client";
import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";

export default function Profile() {
  const { currentUser, setCurrentUser } = useContext(DashboardContext);
  const [editUser, setEditUser] = useState(false);
  const [profileImage, setProfileImage] = useState(
    currentUser?.image || "https://via.placeholder.com/85"
  );

  // -----/ UseEffect to Set Profile Image /------
  useEffect(() => {
    if (currentUser?.image) {
      setProfileImage(currentUser.image);
    }
  }, [currentUser]);

  // -------/ handle Image Upload /--------
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        setProfileImage(imageUrl);

        // Update the image in currentUser
        const updatedUser = { ...currentUser, image: imageUrl };
        setCurrentUser(updatedUser);

        // Store the updated user in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      };

      reader.readAsDataURL(file);
    }
  };

  // -----/ Toggle Edit Mode /------
  const handleEditUser = () => {
    setEditUser((prevEditUser) => !prevEditUser);
  };

  // -------/ update User /--------
  const updateUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/users/${currentUser.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentUser), // Send the password unencrypted
        }
      );

      if (response.ok) {
        const updatedData = await response.json();
        setCurrentUser(updatedData);
        alert("Profile updated successfully");
        setEditUser(false);

        // Update the data in localStorage
        localStorage.setItem("loggedInUser", JSON.stringify(currentUser));
      } else {
        const errorData = await response.json();
        console.error("Failed to update profile:", errorData);
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  return (
    <section className="bg-white mt-5 ">
      <div className="container px-6 py-18 mx-auto">
        <div className="lg:flex justify-center ">
          <div className="lg:w-1/3">
            <div className="">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                id="file-input"
                style={{ display: "none" }}
              />
              <label htmlFor="file-input">
                <i className="bx bx-edit ursor-pointer"></i>
                <Image
                  src={profileImage}
                  alt={currentUser?.username}
                  className="cursor-pointer w-28 h-28 rounded-full object-cover mb-5"
                  width={500}
                  height={500}
                />
              </label>
            </div>

            <h1 className="mt-4 text-gray-600 md:text-lg">Welcome back</h1>
            <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl">
              {currentUser?.username}
            </h1>
          </div>

          <div className="mt-8 lg:w-1/2 lg:mt-0">
            {/* Edit User */}
            <div className="w-full text-end lg:mt-6">
              <i
                className="bx bx-edit pr-8  cursor-pointer text-2xl"
                onClick={handleEditUser} // السماح بتعديل البانات
              ></i>
            </div>

            <form className="w-full lg:max-w-xl">
              <div className="relative flex items-center">
                <span className="absolute">
                  <i className="bx bx-user text-xl w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"></i>
                </span>
                <input
                  type="text"
                  disabled={!editUser} //الانبوت معطل
                  value={currentUser?.username}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, username: e.target.value })
                  }
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="your name"
                />
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <i className="bx bx-envelope text-xl w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"></i>
                </span>
                <input
                  type="email"
                  disabled={!editUser} //الانبوت معطل
                  value={currentUser?.email}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, email: e.target.value })
                  }
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
                />
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <i className="bx bx-lock text-xl w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"></i>
                </span>
                <input
                  type="password"
                  disabled={!editUser} //الانبوت معطل
                  value={currentUser?.password}
                  onChange={(e) =>
                    setCurrentUser({ ...currentUser, password: e.target.value })
                  }
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                />
              </div>
              <div className="mt-8 md:flex md:items-center">
                {editUser && (
                  <button
                    type="button"
                    onClick={updateUser}
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform dark:bg-gray-900 rounded-lg md:w-1/2 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
                  >
                    Update
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* purchases المشتريات */}
        <div className="mt-6 md:mt-18 sm:flex sm:items-center">
          <div className="flex items-center mt-4 sm:mt-0 -mx-1.5 sm:w-1/2">
            <a
              className="mx-1.5   text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
              href="#"
            >
              <i className="bx bxl-twitter text-3xl fill-current"></i>
            </a>

            <a
              className="mx-1.5  text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
              href="#"
            >
              <i className="bx bxl-linkedin text-3xl fill-current"></i>
            </a>

            <a
              className="mx-1.5  text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
              href="#"
            >
              <i className="bx bxl-facebook text-3xl fill-current"></i>
            </a>

            <a
              className="mx-1.5   text-gray-400 transition-colors duration-300 transform hover:text-blue-500"
              href="#"
            >
              <i className="bx bxl-instagram text-3xl fill-current"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
