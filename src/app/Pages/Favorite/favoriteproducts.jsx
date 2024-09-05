"use client";
import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const FavoriteProducts = () => {
  const { favProduct, deleteItemFromFavorites } = useContext(DashboardContext);

  return (
    <>
      {favProduct.length > 0 ? (
        favProduct.map((item) => (
          <article className="product-item" key={item.id}>
            <Link href={`/Pages/ProductItem/${item.id}`}>
              <figure>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={500}
                  height={500}
                  className="product-image"
                />
              </figure>
            </Link>

            <div className="product-details">
              <h3 className="product-title">{item.title}</h3>
              <div className="product-info">
                <p className="product-price">${item.price}</p>
                <i
                  className="bx bx-trash delete-icon"
                  onClick={() => deleteItemFromFavorites(item.id)}
                  aria-label="Delete item from favorites"
                ></i>
              </div>
            </div>
          </article>
        ))
      ) : (
        <p className="no-favorites-message">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          You haven't added any favorite products yet.
        </p>
      )}
    </>
  );
};

export default FavoriteProducts;
