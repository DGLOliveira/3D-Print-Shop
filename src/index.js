import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import CartProvider from "./Data/CartContext";
import Home from "./Pages/Home.tsx";
import Store from "./Pages/Store.tsx";
import About from "./Pages/About.tsx";
import FAQ from "./Pages/FAQ.tsx";
import Product from "./Pages/Product.tsx";
import NoPage from "./Pages/NoPage.tsx";
import CheckOut from "./Pages/CheckOut.tsx";

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
