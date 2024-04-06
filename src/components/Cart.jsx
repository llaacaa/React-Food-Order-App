import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

export default function Cart() {
  const cart = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);
  const cartTotal = cart.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  function handleCartClose() {
    userCtx.hideCart();
  }

  function handleAddCartItem(item) {
    cart.addItem(item);
  }

  function handleRemoveCartItem(id) {
    cart.removeItem(id);
  }

  return (
    <Modal
      className="cart"
      open={userCtx.progress === "cart"}
      onClose={userCtx.progress === "cart" ? handleCartClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cart.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              add={() => handleAddCartItem(item)}
              remove={() => handleRemoveCartItem(item.id)}
              {...item}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCartClose}>
          Close
        </Button>
        {cart.items.length > 0 && (
          <Button onClick={() => userCtx.showCheckout()}>Go to Checkout</Button>
        )}
      </p>
      <Modal
        open={userCtx.progress === "checkout"}
        onClose={() => userCtx.hideCheckout()}
      >
        <Checkout
          totalAmount={currencyFormatter.format(cartTotal)}
          closeModal={() => userCtx.hideCheckout()}
          allItems={cart.items}
        />
      </Modal>
    </Modal>
  );
}
