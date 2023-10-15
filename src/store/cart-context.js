import React, { useReducer } from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_MEAL") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];

    let updatedMeals;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedMeals = [...state.items];
      updatedMeals[existingCartItemIndex] = updatedItem;
    } else {
      updatedMeals = state.items.concat(action.item);
    }

    return {
      items: updatedMeals,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE_MEAL") {
    let updatedMeals;
    updatedMeals = [...state.items];
    const itemToRemoveIndex = updatedMeals.findIndex(
      (item) => item.id === action.id
    );
    const itemToRemove = state.items[itemToRemoveIndex];
    const updatedTotalAmount = state.totalAmount - itemToRemove.price;
    const itemToRemoveAmount = itemToRemove.amount;
    if (itemToRemoveAmount > 1) {
      let updatedItem;
      updatedItem = { ...itemToRemove, amount: itemToRemove.amount - 1 };
      updatedMeals[itemToRemoveIndex] = updatedItem;
    } else {
      updatedMeals.splice(itemToRemoveIndex, 1);
    }
    return { items: updatedMeals, totalAmount: updatedTotalAmount };
  }
  return defaultCartState;
};

export const CartContextProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addMealHandler = (item) => {
    dispatchCart({ type: "ADD_MEAL", item: item });
  };

  const removeMealHandler = (id) => {
    dispatchCart({ type: "REMOVE_MEAL", id: id });
  };

  return (
    <CartContext.Provider
      value={{
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addMealHandler,
        removeItem: removeMealHandler,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContext;
