"use client";
import { useMemo, useContext, useCallback } from "react";
import Link from "next/link";
import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";

const ProductsList = ({ DataProduct }) => {
  const {
    addCart,
    isLoggedIn,
    addMyFavorite,
    deletItemFavorit,
    favProduct,
    search,
    priceFilter,
    setShowModal,
  } = useContext(DashboardContext);

  // -----/ Filtered Products /------
  const filteredProducts = useMemo(() => {
    if (!Array.isArray(DataProduct)) return []; // تحقق من أن DataProduct هو مصفوفة

    return DataProduct.filter(
      (item) =>
        item.title &&
        item.title.toLowerCase().includes(search?.toLowerCase() || "")
    ).filter((item) => {
      switch (priceFilter) {
        case "under50":
          return item.price <= 30;
        case "20to50":
          return item.price > 20 && item.price <= 50;
        case "above100":
          return item.price > 100;
        default:
          return true;
      }
    });
  }, [DataProduct, search, priceFilter]); // التبعيات

  // -----/ handleAddToCart /------
  const handleAddToCart = useCallback(
    (product) => {
      if (isLoggedIn) {
        addCart(product); // إضافة المنتج إلى السلة
      } else {
        setShowModal(true); // فتح نافذة تسجيل الدخول
      }
    },
    [isLoggedIn, addCart, setShowModal] // التبعيات
  );

  // -----/ handleFavoriteToggle /------
  const handleFavoriteToggle = useCallback(
    (productId) => {
      if (favProduct.some((favItem) => favItem.id === productId)) {
        deletItemFavorit(productId); // حذف المنتج من المفضلة
      } else {
        addMyFavorite(productId); // إضافة المنتج إلى المفضلة
      }
    },
    [favProduct, deletItemFavorit, addMyFavorite] // التبعيات
  );

  return (
    <>
      {filteredProducts?.map((product) => (
        // <div
        //   className="flex flex-col items-center justify-center my-2 w-full max-w-sm mx-auto"
        //   key={product.id}
        // >
        //   <div
        //     className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
        //     style={{
        //       backgroundImage: `url(${product.image})`,
        //     }}
        //   />
        //   <div className="w-11/12 -mt-5 overflow-hidden bg-gray-300  rounded-lg shadow-lg  ">
        //     <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase ">
        //       {product.title}
        //     </h3>
        //     <div className="flex items-center justify-between px-3 py-2 ">
        //       <span className="font-bold text-gray-800 ">${product.price}</span>

        //       <div className="flex items-center">
        //         <i
        //           className={
        //             favProduct.some((favItem) => favItem.id === product.id)
        //               ? "bx bxs-heart-circle mr-3"
        //               : "bx bx-heart-circle mr-3"
        //           }
        //           onClick={() => handleFavoriteToggle(product.id)}
        //         ></i>

        //         <button className="px-2 py-1 text-xs font-semibold flex items-center justify-center text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700  focus:bg-gray-700 focus:outline-none">
        //           Add to cart
        //           <i className="bx bx-cart-alt text-lg ml-2"></i>
        //         </button>
        //       </div>
        //     </div>
        //   </div>
        // </div>

        <article className="product-item" key={product.id}>
          <Link href={`/Pages/ProductItem/${product.id}`}>
            <figure>
              <Image
                src={product.image}
                alt={product.title}
                width={700}
                height={400}
              />
            </figure>
          </Link>
          <div className="product-details ">
            <div>
              <h3>{product.title}</h3>
              <p>Course • Mindful Mike</p>
            </div>

            <div>
              <h5>${product.price}</h5>

              <div className="acton-btn">
                <i
                  className={
                    favProduct.some((favItem) => favItem.id === product.id)
                      ? "bx bxs-heart-circle"
                      : "bx bx-heart-circle"
                  }
                  onClick={() => handleFavoriteToggle(product.id)}
                ></i>

                <button onClick={() => handleAddToCart(product)}>
                  <i className="bx bx-cart-alt"></i> Add To Cart
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </>
  );
};

export default ProductsList;
