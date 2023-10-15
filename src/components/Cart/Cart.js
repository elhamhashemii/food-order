import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import AuthContext from "../../store/cart-context";
import { useContext } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(AuthContext);
  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id)
  }
  const cartItemAddHandler = (item) => {
    ctx.addItem({
      ...item,
      amount: 1
    })
  }
  const cartItems = ctx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      summary={item.description}
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ));
  const hasItems = ctx.items.length > 0;
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  return (
    <Modal onCloseModal={props.onCloseCart}>
      <ul className={classes["cart-items"]}>{cartItems}</ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onCloseCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
