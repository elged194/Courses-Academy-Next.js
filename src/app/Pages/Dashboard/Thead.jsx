"use client";
import { DashboardContext } from "@/app/context/ApiContext";
import React, { useContext } from "react";

const Thead = () => {
  const { users, products } = useContext(DashboardContext);

  return (
    <>
      <thead>
        <tr>
          <th>Number of subscribers {users.length}</th>
        </tr>

        <tr>
          <th>Number of products {products.length}</th>
        </tr>
      </thead>
    </>
  );
};

export default Thead;
