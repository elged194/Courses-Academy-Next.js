"use client";
import Link from "next/link";
import React, { useContext, useCallback } from "react";
import ProfileCard from "./profileCard";
import { DashboardContext } from "@/app/context/ApiContext";
import { useRouter } from "next/navigation";

const HeaderRight = () => {
  const {
    handleLogout,
    isLoggedIn,
    setShowModal,
    quantityCart,
    setshowModalAddProduct,
  } = useContext(DashboardContext);
  const router = useRouter();

  // Callback for handling logout
  const handleLogoutAndRedirect = useCallback(() => {
    router.push("/Pages/Login");
    setTimeout(() => {
      handleLogout();
    }, 0);
  }, [router, handleLogout]);

  // Callback to open add product modal
  const handleOpenAddProduct = useCallback(() => {
    setshowModalAddProduct(true);
    setShowModal(true);
  }, [setshowModalAddProduct, setShowModal]);

  return (
    <>
      {/* Login/Logout */}
      {isLoggedIn ? (
        <i className="bx bx-log-out" onClick={handleLogoutAndRedirect}></i>
      ) : (
        <Link href="/Pages/Login">
          <i className="bx bx-log-in"></i>
        </Link>
      )}

      {/* MyProfile page */}
      {isLoggedIn && (
        <div className="MyProfile-header" style={{ display: "flex" }}>
          <i
            className="bx bx-user-pin"
            onClick={() => {
              router.push("/Pages/MyProfile");
            }}
          ></i>

          <div className="profile-card">
            <ProfileCard />
          </div>
        </div>
      )}

      {/* Favorite items */}
      <Link href="/Pages/Favorite">
        <i className="bx bx-heart"></i>
      </Link>

      {/* Cart page */}
      <i className="bx bx-cart-alt" onClick={() => router.push("/Pages/Cart")}>
        <span>{quantityCart}</span>
      </i>

      {/* Add New Product */}
      <button onClick={handleOpenAddProduct}>New Product</button>
    </>
  );
};

export default HeaderRight;
