"use client";
import { useContext, useState, useCallback } from "react";
import { DashboardContext } from "@/app/context/ApiContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const { newUser, setNewUser, addUser, usersErrMsg } =
    useContext(DashboardContext);

  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  // handleRegister() تستخدم للتحقق من طول كلمة السر وإضافة مستخدم جديد
  const handleRegister = useCallback(
    (e) => {
      e.preventDefault();

      if (newUser.password.length < 8) {
        setPasswordError("Password must be at least 8 characters long.");
        return;
      }

      const userAdded = addUser(); // حفظ دالة إنشاء حساب جديد

      if (userAdded) {
        setIsLoading(true);

        setTimeout(() => {
          router.push("/Pages/Login");
        }, 500);
      } else {
        return usersErrMsg;
      }
    },
    [newUser.password, addUser, router, usersErrMsg]
  );

  // تحديث اسم المستخدم
  const handleUsernameChange = useCallback(
    (e) => {
      setNewUser((prevNewUser) => ({
        ...prevNewUser,
        username: e.target.value,
      }));
    },
    [setNewUser]
  );

  // تحديث البريد الإلكتروني
  const handleEmailChange = useCallback(
    (e) => {
      setNewUser((prevNewUser) => ({
        ...prevNewUser,
        email: e.target.value,
      }));
    },
    [setNewUser]
  );

  // تحديث كلمة المرور
  const handlePasswordChange = useCallback(
    (e) => {
      setNewUser((prevNewUser) => ({
        ...prevNewUser,
        password: e.target.value,
      }));
      setPasswordError(""); // إعادة تعيين رسالة الخطأ عند تغيير كلمة المرور
    },
    [setNewUser]
  );

  return (
    <>
      {/* اسم المستخدم */}
      <div className="relative flex items-center mt-8">
        <span className="absolute">
          <i className="bx bx-user mx-3 text-2xl text-gray-700"></i>
        </span>
        <input
          type="text"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Username"
          value={newUser.username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      {/* البريد الإلكتروني */}
      <div className="relative flex items-center mt-6">
        <span className="absolute">
          <i className="bx bx-envelope mx-3 text-2xl text-gray-700"></i>
        </span>
        <input
          type="email"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Email address"
          value={newUser.email}
          onChange={handleEmailChange}
          required
        />
      </div>

      {/* كلمة المرور */}
      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <i className="bx bx-lock-alt mx-3 text-2xl text-gray-700"></i>
        </span>
        <input
          type="password"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Password"
          value={newUser.password}
          onChange={handlePasswordChange}
          required
        />
      </div>

      {/* تأكيد كلمة المرور */}
      <div className="relative flex items-center mt-4">
        <span className="absolute">
          <i className="bx bx-lock-alt mx-3 text-2xl text-gray-700"></i>
        </span>
        <input
          type="password"
          className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Confirm Password"
          value={newUser.password}
          onChange={handlePasswordChange}
          required
        />
      </div>

      {/* زر التسجيل */}
      <div className="mt-6">
        <button
          onClick={handleRegister}
          className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-900 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        <div className="mt-6 text-center">
          <Link
            href="/Pages/Login"
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Already have an account?
          </Link>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
