import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Home from "./Pages/Home.js";
import Store from "./Pages/Store.js";
import About from "./Pages/About";
import FAQ from "./Pages/FAQ";
import Product from "./Pages/Product";
import NoPage from "./Pages/Home";
import CartProvider from "./Data/CartContext";
import CheckOut from "./Pages/CheckOut.js";

export default function Index() {
  return (
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="store" element={<Store />} />
            <Route path="about" element={<About />} />
            <Route path="product" element={<Product />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </CartProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
