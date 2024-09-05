"use client";
import Modal from "@/app/components/Modal/Modal";
import { DashboardContext } from "@/app/context/ApiContext";
import React, { useContext, useState } from "react";

const Products = () => {
  const {
    products,
    newProduct,
    setNewProduct,
    addProduct,
    deleteProduct,
    setShowModal,
    setShowModalDeleteProduct,
    handleCloseModal,
    showModalDeleteProduct,
  } = useContext(DashboardContext);

  const [isEditing, setIsEditing] = useState(false);
  const [productId, setProductId] = useState(null);

  // ------/ handleInputChange /-------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // تحديث حالة المنتج الجديد بناءً على إدخال المستخدم
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // ------/ handle Add Or Update Product /-------
  const handleAddOrUpdateProduct = () => {
    if (isEditing) {
      updateProduct(); // إذا كان في وضع التحرير، تحديث المنتج
    } else {
      addProduct(); // خلاف ذلك، إضافة منتج جديد
    }
  };

  // ------/ updateProduct /-------
  const updateProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/products/${productId}`,
        {
          method: "PUT", // استخدام طريقة PUT لتحديث المنتج
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProduct), // تحويل بيانات المنتج إلى JSON
        }
      );

      if (response.ok) {
        // إعادة تعيين الحالة بعد التحديث الناجح
        setIsEditing(false);
        setNewProduct({ title: "", price: "", description: "", image: "" });
        alert("Product updated successfully");
      } else {
        alert("Failed to update product"); // رسالة تنبيه في حال الفشل
      }
    } catch (error) {
      console.error("Error updating product:", error); // تسجيل الأخطاء في وحدة التحكم
    }
  };

  // ------/ handleEdit /-------
  const handleEdit = (product) => {
    // تفعيل وضع التحرير وتحديث حالة المنتج لتكون قيم المنتج المحدد
    setIsEditing(true);
    setProductId(product.id);
    setNewProduct({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    });
  };

  // ------/ handleShowDelete /-------
  const handleShowDeleteProduct = (product) => {
    // إعداد حالة الحذف وعرض نافذة التأكيد
    setProductId(product.id);
    setShowModal(true);
    setShowModalDeleteProduct(true);
  };

  return (
    <div>
      <h3>Products</h3>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={newProduct.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Price"
        name="price"
        value={newProduct.price}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Description"
        name="description"
        value={newProduct.description}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="Image URL"
        name="image"
        value={newProduct.image}
        onChange={handleInputChange}
      />
      <button onClick={handleAddOrUpdateProduct}>
        {isEditing ? "Update Product" : "Add Product"}
      </button>
      <table className="responsive-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <React.Fragment key={product.id}>
              <tr>
                <td style={{ textAlign: "center" }}>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>
                  <button onClick={() => handleEdit(product)}>Edit</button>
                </td>
                <td>
                  <button
                    onClick={() => handleShowDeleteProduct(product)}
                    style={{ backgroundColor: "#c82333" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Show Modal for Delete Confirmation */}
      {showModalDeleteProduct && (
        <Modal>
          <div className="snackbar">
            <p>Are you sure you want to delete Product?</p>
            <div className="snackbar-buttons">
              <button
                className="confirm-btn"
                onClick={() => {
                  deleteProduct(productId);
                  handleCloseModal();
                }}
              >
                Yes
              </button>
              <button className="cancel-btn" onClick={() => handleCloseModal()}>
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Products;
