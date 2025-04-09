import "./styles.css";
import {
  Outlet,
  Link,
  useLocation,
  Location,
  createSearchParams,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { SiGooglemaps } from "react-icons/si";
import DarkMode from "./Components/DarkMode.tsx";
import logo from "./Assets/logo.svg";
import products from "./Data/products.json";
import { CartContext } from "./Data/CartContext.js";
import "./Styles/Layout.css";

export default function App() {
  const [shopMenu, setShopMenu]
    : [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    = useState(false);
  const [menu, setMenu]
    : [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    = useState(false);
  const cart: any = useContext(CartContext);
  const totalItems = cart.items.reduce(
    (sum: number, item: { quantity: number; id: string }) => sum + item.quantity, 0);
  let location: Location = useLocation();
  let navigate: NavigateFunction = useNavigate();

  function shopLink(prodId: string) {
    navigate({
      pathname: "/product",
      search: createSearchParams({ prodId }).toString(),
    });
  };

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 100);
  }, [location, navigate]);

  function checkout() {
    if (cart.items.length > 0) {
      navigate("/checkout");
    }
  };

  const cartItem = (index: number, quantity: number, id: string) => {
    const product = products.find((product) => product.id === id);
    if (product !== undefined) {
      return (
        <div key={index}>
          <img
            src={product.print.images[0]}
            alt={product.title}
            onClick={() => shopLink(id)}
          />
          <div>
            <h4>{product.title}</h4>
            <p><b>Quantity:</b>{quantity}</p>
            <p><b>Price:</b>{product.print.price * quantity}€</p>
          </div>
        </div>
      )
    } else {
      return (
        <div key={index}>
          <h4>Product not found</h4>
        </div>
      )
    }
  }

  return (
    <div className="App">
      <header>
        <nav>
          <Link
            onClick={() => (setShopMenu(false), setMenu(false))}
            id="logo"
            to="/"
          >
            <svg id="logosvg" style={{ backgroundImage: `url(${logo})` }} />
            <h2>Palmeiras Workshop</h2>
          </Link>
        </nav>
        <nav>
          <ul>
            <li
              className={menu ? "selected" : " "}
              onClick={() => (setShopMenu(false), setMenu(!menu))}
            >
              <h3>Menu</h3>
            </li>
            <li
              className={shopMenu ? "selected" : " "}
              onClick={() => (setMenu(false), setShopMenu(!shopMenu))}
            >
              <h3>Cart</h3>
              <h6>{totalItems} items</h6>
            </li>
            <DarkMode />
          </ul>
        </nav>
      </header>
      <div id="menu" className={menu ? "" : "invisible"} >
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "menuOption selected"
              : "menuOption"
          }
          onClick={() => (setShopMenu(false), setMenu(false))}
        >
          Home
        </Link>
        <Link
          to="store"
          className={
            location.pathname === "/store"
              ? "menuOption selected"
              : "menuOption"
          }
          onClick={() => (setShopMenu(false), setMenu(false))}
        >
          Store
        </Link>
        <Link
          to="about"
          className={
            location.pathname === "/about"
              ? "menuOption selected"
              : "menuOption"
          }
          onClick={() => (setShopMenu(false), setMenu(false))}
        >
          About
        </Link>
        <Link
          to="faq"
          className={
            location.pathname === "/faq"
              ? "menuOption selected"
              : "menuOption"
          }
          onClick={() => (setShopMenu(false), setMenu(false))}
        >
          FAQ
        </Link>
      </div>
      <div id="shopbar" className={shopMenu ? "" : "invisible"} >
        <div id="shopList">
          {cart.items.map((item: { quantity: number; id: string }, index: number) => (
            cartItem(index, item.quantity, item.id)
          ))}
        </div>
        <div id="shopBottom">
          <div>
            <b>
              <p>Total: {cart.getTotalCost()}€</p>
            </b>
          </div>
          <div>
            <button onClick={checkout} disabled={cart.items.length === 0}>Checkout</button>
          </div>
        </div>
      </div>
      <div className="page" onClick={() => (setShopMenu(false), setMenu(false))}>
        <Outlet />
      </div>
      <footer onClick={() => (setShopMenu(false), setMenu(false))}>
        <div>
          <h4>Palmeiras Workshop</h4>
          <svg id="logosvg" style={{ backgroundImage: `url(${logo})` }} />
          <h5>Not Copyrighted. Zero rights reserved.</h5>
        </div>
        <address>
          <h4>Contacts</h4>
          <ul>
            <li>
              <AiOutlinePhone /> 555-555-555
            </li>
            <li>
              <AiOutlineMail />{" "}
              <a href="mailto:nobody@fakemail.com">nobody@fakemail.com</a>
            </li>
            <li>
              <SiGooglemaps /> A, 1th street, Middle of Nowhere, Nothingham
              Kingdom
            </li>
          </ul>
        </address>
      </footer>
    </div>
  );
}
