"use client";
import Modal from "@/app/components/Modal/Modal";
import { DashboardContext } from "@/app/context/ApiContext";
import Link from "next/link";
import React, { useContext } from "react";

const ActionsProduct = ({ data }) => {
  const {
    isLoggedIn,
    addCart,
    handleCloseModal,
    favProduct,
    deletItemFavorit,
    addMyFavorite,
    setShowModal,
  } = useContext(DashboardContext);

  return (
    <>
      {/* Modal show  */}
      {!isLoggedIn && (
        <Modal>
          <div className="login-redirect">
            <i className="bx bx-log-in"></i>
            <h1>Please Login to Continue</h1>

            <div className="redirect-links">
              <Link href="/Pages/Login" onClick={handleCloseModal}>
                LogIn{" "}
              </Link>{" "}
              or
              <Link href="/Pages/Register" onClick={handleCloseModal}>
                {" "}
                Register
              </Link>
            </div>
          </div>
        </Modal>
      )}

      <div className="actions">
        <button
          className="add-to-cart"
          onClick={() => (isLoggedIn ? addCart(data) : setShowModal(true))}
        >
          <i className="bx bx-cart-alt"></i> Add To Cart
        </button>

        {favProduct.some((favItem) => favItem.id === data.id) ? (
          <i
            className="bx bxs-heart-circle"
            onClick={() => deletItemFavorit(data.id)}
          ></i>
        ) : (
          <i
            className="bx bx-heart-circle"
            onClick={() => addMyFavorite(data.id)}
          ></i>
        )}
      </div>
    </>
  );
};

export default ActionsProduct;
