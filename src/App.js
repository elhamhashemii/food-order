import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { CartContextProvider } from "./store/cart-context";

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  function showCartHandler() {
    setCartIsVisible(true);
  }

  function hideCartHandler() {
    setCartIsVisible(false);
  }

  return (
    <CartContextProvider>
      {cartIsVisible && <Cart onCloseCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
