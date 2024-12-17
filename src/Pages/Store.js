import React, { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import products from "../Data/products.json";
import "../Styles/Store.css";

export default function Store() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const [prodId, selectProduct] = useState(-1);
  useEffect(() => {
    if (prodId !== -1) {
      navigate({
        pathname: "/product",
        search: createSearchParams({ prodId }).toString(),
      });
    }
  });
  return (
    <div id="store">
      <div id="storefilter">
        <div>
          <label htmlFor="search">
            <h4>Search</h4>
          </label>
          <input
            type="search"
            id="search"
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <h4>Category</h4>
          <div>
            <input
              type="radio"
              id="any"
              name="type"
              value={""}
              onChange={(e) => setCategory(e.target.value)}
              checked={category === ""}
            />
            <label htmlFor="any">Any</label>
          </div>
          <div>
            <input
              type="radio"
              id="human"
              name="type"
              value={"Human"}
              onChange={(e) => setCategory(e.target.value)}
              checked={category === "Human"}
            />
            <label htmlFor="human">Human</label>
          </div>
          <div>
            <input
              type="radio"
              id="animal"
              name="type"
              value={"Animal"}
              onChange={(e) => setCategory(e.target.value)}
              checked={category === "Animal"}
            />
            <label htmlFor="animal">Animal</label>
          </div>
          <div>
            <input
              type="radio"
              id="architecture"
              name="type"
              value={"Architecture"}
              onChange={(e) => setCategory(e.target.value)}
              checked={category === "Architecture"}
            />
            <label htmlFor="Architecture">Architecture</label>
          </div>
        </div>
      </div>
      <div id="storecards" className="spaced">
        {products
          .filter(
            (product) =>
              product.title.includes(search) &&
              product.category.includes(category),
          )
          .map((product, index) => (
            <div key={index} className="container spaced">
              <h3>{product.title}</h3>
              <img
                index={index}
                onClick={() => selectProduct(product.id)}
                src={product.print.images[0]}
                alt={product.title}
              />
              <div>
                <p>{product.print.price} €</p>
                <p>{product.print.dimention}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
