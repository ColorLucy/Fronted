import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const productsInLocalStorage = localStorage.getItem("cartProducts");
      return productsInLocalStorage ? JSON.parse(productsInLocalStorage) : [];
    } catch (error) {
      return [];
    }
  });

  const [totalCantidadProductos, setTotalCantidadProductos] = useState(0);

  useEffect(() => {
    localStorage?.setItem("cartProducts", JSON.stringify(cartItems));

    // Calcular la cantidad total de productos
    const totalCantidad = cartItems.reduce(
      (previous, current) => previous + current.amount,
      0
    );
    setTotalCantidadProductos(totalCantidad);
  }, [cartItems]);

  const addItemToCart = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart.id_detalle === product.id_detalle
    );

    if (inCart) {
      setCartItems(
        cartItems.map((productInCart) => {
          if (productInCart.id_detalle === product.id_detalle) {
            return { ...inCart, amount: inCart.amount + 1 };
          } else return productInCart;
        })
      );
    } else {
      setCartItems([...cartItems, { ...product, amount: 1 }]);
    }
  };

  const deleteItemToCart = (product) => {
    const inCart = cartItems.find(
      (productInCart) => productInCart.id_detalle === product.id_detalle
    );

    if (inCart.amount === 1) {
      setCartItems(
        cartItems.filter(
          (productInCart) => productInCart.id_detalle !== product.id_detalle
        )
      );
    } else {
      setCartItems(
        cartItems.map((productInCart) => {
          if (productInCart.id_detalle === product.id_detalle) {
            return { ...inCart, amount: inCart.amount - 1 };
          } else return productInCart;
        })
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalCantidadProductos,
        addItemToCart,
        deleteItemToCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
