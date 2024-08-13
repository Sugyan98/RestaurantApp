import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [items, updateItems] = useState([]);
  const [total, updateTotal] = useState(0);

  const totalCalc = (price) => {
    updateTotal((prevTotal) => {
      prevTotal += price;
      return prevTotal;
    });
  };

  const addItemToCartHandler = (item) => {
    let temp;
    updateItems((prevState) => {
      temp = [...prevState];
      for (let i of temp) {
        if (i.name === item.name) {
          i.quantity = Number(i.quantity) + Number(item.quantity);
          totalCalc(i.price);
          return temp;
        }
      }
      totalCalc(item.price);
      return [...items, item];
    });
  };

  const removeItemFromCartHandler = (id) => {
    updateItems((prevState) => {
      let temp = [...prevState];
      for (let i of temp) {
        if (i.id === id && i.quantity === 1) {
          let temp1 = temp.filter((item) => item.id !== id);
          totalCalc(-i.price);
          return temp1;
        } else if (i.id === id && i.quantity) {
          i.quantity = Number(i.quantity) - 1;
          totalCalc(-i.price);
          return temp;
        }
      }
    });
  };

  const cartContext = {
    items: items,
    totalAmount: total,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
