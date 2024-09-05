"use client";
import { useState } from "react";
import "./MyProfile.css";
import ProfilePage from "./newprof";
import ProfileCard from "./profileCard";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MyProfile = () => {
  const [userInfo, setUserInfo] = useState(true);

  // Download PDF
  const handleDownloadPDF = () => {
    const input = document.getElementById("table-to-pdf");

    // تحسين دقة الصورة من خلال زيادة مقياس الـ Canvas
    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png", 1.0); // ضبط جودة الصورة إلى 1.0 (أعلى جودة)
      const pdf = new jsPDF("p", "pt", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth(); // عرض الصفحة في الـ PDF
      const pdfHeight = pdf.internal.pageSize.getHeight(); // ارتفاع الصفحة في الـ PDF

      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;

      // إضافة الصورة لصفحة PDF مع التأكد من ملاءمتها للصفحة بالكامل
      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight,
        null,
        "FAST"
      );

      // إذا كانت الصورة أكبر من صفحة واحدة، تقسم الصورة وتضيف صفحات جديدة
      let heightLeft = imgHeight;
      while (heightLeft > pdfHeight) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          0,
          position,
          imgWidth,
          imgHeight,
          null,
          "FAST"
        );
        heightLeft -= pdfHeight;
      }

      // حفظ ملف الـ PDF
      pdf.save("Courses_Academy_Purchases.pdf");
    });
  };

  return (
    <>
      <section className="w-full px-4 mx-auto my-4 ">
        <div className="flex flex-wrap  items-center justify-between  ">
          {/* toggel button pages */}
          <div className="inline-flex overflow-hidden  bg-white  divide-x rounded-lg  rtl:flex-row-reverse  dark:divide-gray-700">
            <button
              onClick={(e) => {
                e.preventDefault();
                setUserInfo(true);
              }}
              className={`px-5 py-2 mx-1 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 border-slate-700	hover:bg-slate-600 hover:text-white sm:text-sm ${
                userInfo ? "bg-gray-900 sm:text-sm text-white" : "bg-gray-100"
              } `}
            >
              User Info
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                setUserInfo(false);
              }}
              className={`px-5 py-2 mx-1 text-xs font-medium text-gray-600 transition-colors duration-200 bg-gray-100 border-slate-700 hover:bg-slate-600 hover:text-white sm:text-sm ${
                userInfo ? "bg-gray-100" : "bg-gray-900 sm:text-sm text-white"
              }`}
            >
              Orders
            </button>
          </div>

          {/* button Download as PDF  */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <div
              className={`flex items-center mt-1 gap-x-3 ${
                userInfo ? "hidden" : "flex"
              }`}
            >
              <button
                onClick={handleDownloadPDF}
                className="w-1/2 px-5 py-1 flex items-center text-sm text-gray-800 transition-colors duration-200 bg-white border rounded-lg sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-white dark:border-gray-700"
              >
                Download as PDF
                <i className="bx bx-cloud-download w-10 text-2xl"></i>
              </button>
            </div>
          </div>
        </div>

        {userInfo ? <ProfilePage /> : <ProfileCard />}
      </section>
    </>
  );
};

export default MyProfile;
