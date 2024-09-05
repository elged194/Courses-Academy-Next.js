"use client";
import React from "react";
import { Provider } from "./context/ApiContext";

const ProviderLayout = ({ children }) => {
  return <Provider>{children}</Provider>;
};

export default ProviderLayout;
