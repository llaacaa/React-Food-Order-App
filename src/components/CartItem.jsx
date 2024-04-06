import { currencyFormatter } from "../util/formatting";

export default function CartItem({ name, quantity, price, add, remove }) {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
      </p>
      <p className="cart-item-actions">
        <button onClick={remove}>-</button>
        <span>{quantity}</span>
        <button onClick={add}>+</button>
      </p>
    </li>
  );
}
