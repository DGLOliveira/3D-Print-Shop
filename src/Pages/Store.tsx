import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, createSearchParams, NavigateFunction, useNavigate } from "react-router-dom";
import products from "../Data/products.json";
import "../Styles/Store.css";

export default function Store() {

  const [searchParams, setSearchParams]
    : [URLSearchParams, React.Dispatch<React.SetStateAction<URLSearchParams>>]
    = useSearchParams();

  const [search, setSearch]
    : [string, React.Dispatch<React.SetStateAction<string>>]
    = useState(searchParams.get("search") || "");

  const [category, setCategory]
    : [string, React.Dispatch<React.SetStateAction<string>>] 
    = useState(searchParams.get("category") || "");

  const navigate: NavigateFunction = useNavigate();

  const [prodId, selectProduct]
    : [string, React.Dispatch<React.SetStateAction<string>>] 
    = useState("");


  useEffect(() => {
    if (prodId !== "") {
      navigate({
        pathname: "/product",
        search: createSearchParams({ prodId }).toString(),
      });
    }

  }, [prodId]);

  useEffect(() => {
    setSearchParams({ search: search, category: category });
  }, [category, search])


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
            <div
              key={index}
              className="container spaced"
              onClick={() => selectProduct(product.id)}
            >
              <h3>{product.title}</h3>
              <img
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
