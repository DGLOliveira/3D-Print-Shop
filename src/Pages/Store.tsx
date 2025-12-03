import React, { useState, useEffect } from "react";
import { useSearchParams, createSearchParams, NavigateFunction, useNavigate } from "react-router-dom";
import products from "../Data/products.json";
import productCategories from "../Data/productCategories.json";
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
    = useState(searchParams.get("category") || "All");

  const navigate: NavigateFunction = useNavigate();

  const navToProduct = (prodId: string) => {
    navigate({
      pathname: "/product",
      search: createSearchParams({ prodId }).toString(),
    })
  }

  useEffect(() => {
    const updatedSearchParams = new URLSearchParams({
      search: search,
      category: category
    });
    setSearchParams(updatedSearchParams);
  }, [category, search]);


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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {productCategories.map((categoryName, index) => (
              <option key={index} value={categoryName}>
                {categoryName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div id="storecards" className="spaced">
        {products
          .filter(
            (product) =>
              product.title.includes(search) &&
              product.category.includes(category === "All" ? "" : category),
          )
          .map((product, index) => (
            <div
              key={index}
              className="container spaced"
              onClick={() => navToProduct(product.id)}
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
