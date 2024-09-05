"use client";

import { DashboardContext } from "@/app/context/ApiContext";
import { useContext } from "react";

const PriceFilter = () => {
  const { setSearch, setPriceFilter, search, priceFilter } =
    useContext(DashboardContext);
  return (
    <div className="search-filter-container" style={{ textAlign: "center" }}>
      {/* search-input */}
      <input
        type="text"
        placeholder="Search for a product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {/* ------- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginBottom: "10px",
        }}
      >
        <label htmlFor="all">
          All Items{" "}
          <input
            type="radio"
            id="all"
            name="priceRange"
            checked={priceFilter === "all"}
            onChange={() => setPriceFilter("all")}
          />
        </label>

        <label htmlFor="under50">
          under $30{" "}
          <input
            type="radio"
            id="under50"
            name="priceRange"
            checked={priceFilter === "under50"}
            onChange={() => setPriceFilter("under50")}
          />
        </label>

        <label htmlFor="20to50">
          $20 to $50
          <input
            type="radio"
            id="20to50"
            name="priceRange"
            checked={priceFilter === "20to50"}
            onChange={() => setPriceFilter("20to50")}
          />
        </label>

        <label htmlFor="above100">
          Above $100
          <input
            type="radio"
            id="above100"
            name="priceRange"
            checked={priceFilter === "above100"}
            onChange={() => setPriceFilter("above100")}
          />
        </label>
      </div>
    </div>
  );
};

export default PriceFilter;
