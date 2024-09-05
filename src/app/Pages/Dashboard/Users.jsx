"use client";
import Modal from "@/app/components/Modal/Modal";
import { DashboardContext } from "@/app/context/ApiContext";
import React, { useContext, useState } from "react";

const Users = () => {
  const {
    users,
    newUser,
    setNewUser,
    setShowModalDeleteUser,
    setShowModal,
    deleteUser,
    handleCloseModal,
    showModalDeleteUser,
  } = useContext(DashboardContext);
  const [userId, setUserId] = useState(null);

  // -----/ updateUser in Dashbord /------
  const updateUser = async () => {
    try {
      // إرسال طلب PATCH لتحديث بيانات المستخدم
      const response = await fetch(`http://localhost:4000/users/${userId}`, {
        method: "PATCH", // استخدام طريقة PATCH لتحديث بيانات المستخدم
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser), // تحويل بيانات المستخدم إلى JSON
      });

      if (response.ok) {
        // إعادة تعيين بيانات المستخدم وتقديم إشعار بنجاح التحديث
        setNewUser({ username: "", email: "", password: "" });
        alert("Profile updated successfully");
      } else {
        // تقديم إشعار بفشل التحديث
        alert("Failed to update profile");
      }
    } catch (error) {
      // تسجيل الأخطاء في وحدة التحكم
      console.error("Error updating user:", error);
    }
  };

  // -----/ handleEdit /------
  const handleEdit = (user) => {
    // تعيين ID المستخدم وتحديث حالة المستخدم بالمعلومات الحالية
    setUserId(user.id);
    setNewUser({
      username: user.username,
      email: user.email,
      password: user.password,
    });
  };

  // -----/ handleShowDeleteUser /------
  const handleShowDeleteUser = (user) => {
    // تعيين ID المستخدم وعرض نافذة التأكيد لحذف المستخدم
    setUserId(user.id);
    setShowModalDeleteUser(true);
    setShowModal(true);
  };

  return (
    <div className="user">
      <h3>Users</h3>
      <input
        type="text"
        placeholder="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <input
        type="email"
        placeholder="Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />

      {/* button update User */}
      <button onClick={updateUser}>Update User</button>

      <table className="responsive-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <React.Fragment key={user.id}>
              {/* show users */}
              <tr>
                <td style={{ textAlign: "center" }}>{user.id}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{ backgroundColor: "#444" }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleShowDeleteUser(user)}
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

      {/* show model handel delete */}
      {showModalDeleteUser && (
        <Modal>
          <div className="snackbar">
            <p>Are you sure you want to delete User Account?</p>
            <div className="snackbar-buttons">
              <button
                className="confirm-btn"
                onClick={() => {
                  deleteUser(userId);
                  handleCloseModal();
                }}
              >
                Yes
              </button>
              <button className="cancel-btn" onClick={handleCloseModal}>
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Users;
