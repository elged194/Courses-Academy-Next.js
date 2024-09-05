"use client";
import { DashboardContext } from "@/app/context/ApiContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const PaymentRight = () => {
  const { setCart } = useContext(DashboardContext);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const router = useRouter();

  const handleShowSnackbar = (e) => {
    e.preventDefault();
    setShowSnackbar(true);
  };

  useEffect(() => {
    let timer;

    if (showSnackbar) {
      // تعيين المؤقت لإخفاء Snackbar وإعادة تعيين السلة والتنقل
      timer = setTimeout(() => {
        setShowSnackbar(false); // إخفاء Snackbar
        setCart([]); // إعادة تعيين السلة
        router.push("/"); // الانتقال إلى الصفحة الرئيسية
      }, 3000); // تأخير 3 ثوانٍ
    }

    // تنظيف المؤقت عند إلغاء التفعيل أو التحديث
    return () => clearTimeout(timer);
  }, [showSnackbar, router, setCart, setShowSnackbar]);

  return (
    <>
      {showSnackbar && (
        <div className={`SnackbarCheck show`}>
          <div className="SnackbarCheck__content">
            Purchase completed successfully{" "}
            <i class="bx bx-message-alt-check"></i>
          </div>
        </div>
      )}

      <div className="payment-right">
        <form action="" className="payment-form">
          <h1 className="payment-title">Payment Details</h1>
          <div className="payment-method">
            <input
              type="radio"
              name="payment-method"
              id="method-1"
              defaultChecked=""
            />
            <label htmlFor="method-1" className="payment-method-item">
              <Image
                src="/images/visa.png"
                alt="visa"
                width={300}
                height={300}
              />
            </label>
            <input type="radio" name="payment-method" id="method-2" />
            <label htmlFor="method-2" className="payment-method-item">
              <Image
                src="/images/mastercard.png"
                alt="mastercard"
                width={300}
                height={300}
              />
            </label>
            <input type="radio" name="payment-method" id="method-3" />
            <label htmlFor="method-3" className="payment-method-item">
              <Image
                src="/images/paypal.png"
                alt="paypal"
                width={300}
                height={300}
              />
            </label>
            <input type="radio" name="payment-method" id="method-4" required />
            <label htmlFor="method-4" className="payment-method-item">
              <Image
                src="/images/stripe.png"
                alt="stripe"
                width={300}
                height={300}
              />
            </label>
          </div>
          <div className="payment-form-group">
            <input
              type="email"
              placeholder=" "
              className="payment-form-control"
              id="email"
              required
            />
            <label
              htmlFor="email"
              className="payment-form-label payment-form-label-required"
            >
              Email Address
            </label>
          </div>
          <div className="payment-form-group">
            <input
              type="text"
              placeholder=" "
              className="payment-form-control"
              id="card-number"
              required
            />
            <label
              htmlFor="card-number"
              className="payment-form-label payment-form-label-required"
            >
              Card Number
            </label>
          </div>
          <div className="payment-form-group-flex">
            <div className="payment-form-group">
              <input
                type="date"
                placeholder=" "
                className="payment-form-control"
                id="expiry-date"
                required
              />
              <label
                htmlFor="expiry-date"
                className="payment-form-label payment-form-label-required"
              >
                Expiry Date
              </label>
            </div>
            <div className="payment-form-group">
              <input
                type="text"
                placeholder=" "
                className="payment-form-control"
                id="cvv"
                required
              />
              <label
                htmlFor="cvv"
                className="payment-form-label payment-form-label-required"
              >
                CVV
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="payment-form-submit-button"
            onClick={handleShowSnackbar}
          >
            <i className="ri-wallet-line" /> Pay
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentRight;
