import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";
const HeaderCartButton = (props) => {
  const [btnIsBumped, setBtnIsBumped] = useState(false);
  const ctx = useContext(CartContext);
  const { items } = ctx;
  const numberOfCartrItems = ctx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${btnIsBumped && classes.bump}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsBumped(true);
    const timer = setTimeout(() => {
      setBtnIsBumped(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button onClick={props.onClick} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartrItems}</span>
    </button>
  );
};

export default HeaderCartButton;
