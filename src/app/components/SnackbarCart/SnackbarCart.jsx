"use client";
import { DashboardContext } from "@/app/context/ApiContext";
import "./showSnackbar.css";
import { useContext } from "react";

const SnackbarCart = () => {
  const { showSnackbarCart } = useContext(DashboardContext); // context Api

  return (
    <div className={` snackbar-cart  ${showSnackbarCart ? "show" : "hide"}`}>
      Added to the shopping cart <i className="bx bx-check-circle"></i>
    </div>
  );
};

export default SnackbarCart;
