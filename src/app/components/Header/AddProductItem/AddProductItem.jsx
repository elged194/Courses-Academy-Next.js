"use client";
import React, { useContext } from "react";
import "./addProduct.css";
import { DashboardContext } from "@/app/context/ApiContext";

const AddProductItem = () => {
  const {
    newProduct,
    setNewProduct,
    addProduct,
    handleCloseModal,
    setshowModalAddProduct,
  } = useContext(DashboardContext);

  // Function to add a product item
  const addProductItem = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Call the function to add a new product (assuming addProduct is defined elsewhere)
    await addProduct();

    // Close the modal after the product is added
    handleCloseModal();

    // Optionally, update the state to hide the modal
    setshowModalAddProduct(false);
  };

  return (
    <div className="form-container">
      <form action="" onSubmit={addProductItem} className="add-product">
        <h2 className="title">Add New Product</h2>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter title..."
            required
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            id="image"
            type="url"
            placeholder="Enter image URL..."
            required
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            rows="5"
            placeholder="Enter description..."
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="text"
            placeholder="Enter price..."
            required
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </div>

        <button type="submit" className="submit-button">
          Add New Item
        </button>
      </form>
    </div>
  );
};

export default AddProductItem;
