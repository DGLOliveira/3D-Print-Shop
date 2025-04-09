import React, { useState, createContext } from "react";
import Products from "./products.json";

  type CartProduct = { id: string; quantity: number };
export const CartContext = createContext<{
  items: CartProduct[];
  getProductQuantity: (id: string) => number;
  addOneToCart: (id: string) => void;
  removeOneFromCart: (id: string) => void;
  deleteFromCart: (id: string) => void;
  getTotalCost: () => number;
  emptyCart: () => void;
}>({
  items: [],
  getProductQuantity: () => 0,
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => 0,
  emptyCart: () => {},
});

export function CartProvider({ children }) {
  const [items, setItems] = useState<CartProduct[]>([]);
  //console.log(cartProducts);
  // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]

  function getProductQuantity(id:string): number {
    const quantity = items.find(
      (product) => product.id === id,
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  }

  function addOneToCart(id:string): void {
    const quantity = getProductQuantity(id);
    if (quantity === 0) {
      // product is not in cart
      setItems([
        ...items,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      // product is in cart
      // [ { id: 1 , quantity: 3 }, { id: 2, quantity: 1 } ]    add to product id of 2
      setItems(
        items.map(
          (product) =>
            product.id === id // if condition
              ? { ...product, quantity: product.quantity + 1 } // if statement is true
              : product, // if statement is false
        ),
      );
    }
  }

  function removeOneFromCart(id:string): void {
    const quantity = getProductQuantity(id);
    if (quantity == 1) {
      deleteFromCart(id);
    } else {
      setItems(
        items.map(
          (product) =>
            product.id === id // if condition
              ? { ...product, quantity: product.quantity - 1 } // if statement is true
              : product, // if statement is false
        ),
      );
    }
  }

  function deleteFromCart(id:string): void {
    // [] if an object meets a condition, add the object to array
    // [product1, product2, product3]
    // [product1, product3]
    setItems((items) =>
      items.filter((currentProduct) => {
        return currentProduct.id != id;
      }),
    );
  }

  function getTotalCost(): number {
    let totalCost = 0;
    items.map((cartItem) => {
      let price:number = 0;
      const product = Products.find((object) => object.id === cartItem.id);
      if(product !== undefined){
        price = product.print.price;
      }
      totalCost += price * cartItem.quantity;
    });
    return totalCost;
  }

  function emptyCart(): void {
    setItems([]);
  }

  const contextValue = {
    items,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    emptyCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
