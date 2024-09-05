// pages/index.js (HomePage)
import { Suspense, lazy } from "react";
import "./Home.css";
import PriceFilter from "./PriceFilter";
import Loading from "@/app/loading";
import SnackbarCart from "@/app/components/SnackbarCart/SnackbarCart";
import Hero from "./hero/hero";

// استخدام React.lazy لتحميل المكون ProductsList
const ProductsList = lazy(() => import("./ProductsList"));

// fetch Data Products
async function getProducts() {
  // await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("http://localhost:4000/products", {
    // cache: 'no-cache',
    next: {
      revalidate: 0,
    },
  });

  return res.json();
}

const HomePage = async () => {
  // ---- / Get products /-----
  const DataProduct = await getProducts();

  return (
    <>
      {/* show popUp */}
      <SnackbarCart />
      <br />

      {/* filter section */}
      <PriceFilter />
      <hr />

      {/* Hero section*/}
      <Hero />

      <section className="products-list my-5">
        <Suspense fallback={<Loading />}>
          {/* All data products */}
          <ProductsList DataProduct={DataProduct} />
        </Suspense>
      </section>
    </>
  );
};

export default HomePage;
