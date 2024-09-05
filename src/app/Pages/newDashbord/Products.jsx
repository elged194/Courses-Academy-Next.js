import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";
import { useContext } from "react";

const Products = () => {
  const {
    products,
    newProduct,
    setNewProduct,
    addProduct,
    deleteProduct,
    handleOpenModal,
    handleCloseModal,
    showModalAddProduct,
    showModalDeleteUser,
    showModalDeleteProduct,
  } = useContext(DashboardContext);

  return (
    <>
      <div className="flex-1 px-2 sm:px-0">
        {/* Groups Name */}
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-bold text-gray-800">Products</h3>
        </div>

        {/* Content Groups*/}
        <div className="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div className="group bg-gray-900/30 py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md hover:bg-gray-900/40 hover:smooth-hover">
            <a
              className="bg-gray-900/70 text-white/50 group-hover:text-white group-hover:smooth-hover flex w-20 h-20 rounded-full items-center justify-center"
              href="#"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </a>
            <a
              className="text-white/50 group-hover:text-white group-hover:smooth-hover text-center"
              href="#"
            >
              Create Product
            </a>
          </div>

          {products.map((product) => (
            <div
              key={product.id}
              className="relative group bg-gray-800 py-10 sm:py-20 px-4 flex flex-col space-y-2 items-center cursor-pointer rounded-md  hover:smooth-hover"
            >
              <div className="absolute left-0 top-4 text-white/50  text-2xl w-full flex items-center justify-between px-5 ">
                <i className="bx bxs-trash-alt"></i>
                <i className="bx bxs-edit-alt"></i>
              </div>

              <Image
                className="w-20 h-20 object-cover object-center rounded-full"
                src={product.image}
                alt={product.title}
                width={700}
                height={400}
              />
              <h4 className="text-white text-2xl font-bold capitalize text-center">
                {product.title}
              </h4>
              <p className="text-white/50">${product.price} Price</p>
              <p className="absolute top-2 text-white/30 inline-flex items-center text-xs">
                ID: {product.id}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
