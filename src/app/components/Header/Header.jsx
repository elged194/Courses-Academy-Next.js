"use client";
import "./Header.css";
import Link from "next/link";
import "boxicons/css/boxicons.min.css";
import { useContext } from "react";
import { DashboardContext } from "@/app/context/ApiContext";
import { useRouter } from "next/navigation";
import Popup from "./popup";
import HeaderRight from "./HeaderRight";

const Header = () => {
  const { isLoggedIn, setShowModal } = useContext(DashboardContext);
  const router = useRouter();

  return (
    <>
      {/* Show modal if needed */}
      <Popup />

      <header className="header">
        <h2 className="logo text-slate-500">
          <Link href="/">Courses Academy</Link>
        </h2>

        <ul className="nav-links">
          <li
            style={{ cursor: "pointer" }}
            onClick={() => {
              // If user is logged in, navigate to dashboard, otherwise open modal
              isLoggedIn ? router.push("/Pages/Dashboard") : setShowModal(true);
            }}
          >
            Dashboard
          </li>

          {/* Show login and register links if user is not logged in */}
          {!isLoggedIn && (
            <>
              <li>
                <Link href="/Pages/Login">Login</Link>
              </li>
              <li>
                <Link href="/Pages/Register">Register</Link>
              </li>
            </>
          )}

          <li>
            <Link href="/">Home</Link>
          </li>
        </ul>

        <div className="header-icons">
          {/* Render additional header icons or elements */}
          <HeaderRight />
        </div>
      </header>
    </>
  );
};

export default Header;
