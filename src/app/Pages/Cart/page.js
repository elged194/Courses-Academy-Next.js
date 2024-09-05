import "./Cart.css";
import CartItems from "./cartItems";
import CartSummary from "./CartSummary";

const Cart = () => {
  return (
    <div className="cart-container">
      <h2 className="title" >Your Cart</h2>
      <div className="cart-items">
        <CartItems />
      </div>

      <div className="cart-summary">
        <CartSummary />
      </div>
    </div>
  );
};

export default Cart;
