import "./Checkout.css";
import PaymentRight from "./paymentRight";
import PaymentLeft from "./paymentLeft";

const Checkout = () => {
  // ---------------------- / Show Checkout /----------------------------

  return (
    <>
      {/* start: Payment */}
      <section className="payment-section">
        <div className="container">
          <div className="payment-wrapper">
            <PaymentLeft />
            <PaymentRight />
          </div>
        </div>
      </section>
      {/* end: Payment */}
    </>
  );
};

export default Checkout;
