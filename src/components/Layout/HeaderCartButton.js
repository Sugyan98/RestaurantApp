import { useContext } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartCntx from "../../store/cart-context";

const HeaderCartButton = (props) => {
  const cartcntx = useContext(CartCntx);
  let quantity = 0;
  cartcntx.items.forEach((item) => {
    quantity = quantity + Number(item.quantity);
  });
  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{quantity}</span>
    </button>
  );
};

export default HeaderCartButton;
