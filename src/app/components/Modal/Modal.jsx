"use client";
import { useContext } from "react";
import "./Modal.css";
import { DashboardContext } from "@/app/context/ApiContext";

const Modal = ({ children }) => {
  // استخدم useContext للوصول إلى قيم DashboardContext
  const { showModal, handleCloseModal } = useContext(DashboardContext);

  // إذا كان showModal غير مفعل، قم بإرجاع null لعدم عرض المكون
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        {/* زر إغلاق الـ Modal */}
        <button
          className="close-button"
          onClick={() => handleCloseModal()} // يمكنك استخدام الدالة مباشرة بدون قوسين
        >
          &times; {/* رمز إغلاق الـ Modal */}
        </button>
        {/* محتوى الـ Modal */}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
