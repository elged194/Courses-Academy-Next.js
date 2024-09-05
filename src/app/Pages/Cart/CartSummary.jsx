"use client";
import { DashboardContext } from "@/app/context/ApiContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const CartSummary = () => {
  const { quantityCart, totalPrice, updateUserProduct } =
    useContext(DashboardContext);
  const router = useRouter();

  return (
    <>
      <h3>Cart Summary</h3>
      <p>Total Items: {quantityCart}</p>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      <button
        className="btn-checkout"
        onClick={() => {
          updateUserProduct();
          router.push("/Pages/Checkout");
        }}
      >
        Proceed to Checkout
      </button>
    </>
  );
};

export default CartSummary;
