import React, { useState, useEffect } from "react";
import { useSearchParams, createSearchParams, NavigateFunction, useNavigate } from "react-router-dom";
import products from "../Data/products.json";
import productCategories from "../Data/productCategories.json";
import PriceCalculator from "../Hooks/PriceCalculator.tsx";
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

  const [priceRange, setPriceRange] : 
  [[number, number], React.Dispatch<React.SetStateAction<[number, number]>>]
   = useState([Number(searchParams.get("minPrice")) || 0, Number(searchParams.get("maxPrice")) || 50]);

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
      category: category,
      minPrice: String(priceRange[0]),
      maxPrice: String(priceRange[1]),
    });
    setSearchParams(updatedSearchParams);
  }, [category, search, priceRange]);


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
        <div>
          <h4>Price Range</h4>
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <div>
          <label htmlFor="minPrice">Min:</label>
          <input
            id="minPrice"
            type="number"
            min="0"
            max={priceRange[1]-1}
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          </div>
          to
          <div>
          <label htmlFor="maxPrice">Max:</label>
          <input
            type="number"
            min={priceRange[0]+1}
            max="50"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
          </div>
          </div>
        </div>
      </div>
      <div id="storecards" className="spaced">
        {products
          .filter(
            (product) =>
              product.title.toLowerCase().includes(search.toLowerCase()) &&
              product.category.includes(category === "All" ? "" : category) &&
              PriceCalculator(product.id).newPrice >= priceRange[0] &&
              PriceCalculator(product.id).newPrice <= priceRange[1]
          )
          .map((product, index) => (
            <div
              key={index}
              className="container spaced"
              onClick={() => navToProduct(product.id)}
            >
              {PriceCalculator(product.id).discount > 0 && <div id="discountTag">-{PriceCalculator(product.id).discount * 100}%</div>}
              <h3>{product.title}</h3>
              <img
                src={product.print.images[0]}
                alt={product.title}
              />
              <div>
                <p>
                  {PriceCalculator(product.id).discount === 0 ?
                    product.print.price :
                    <><del style={{ color: "red" }}>{product.print.price}€</del> {PriceCalculator(product.id).newPrice}€</>}</p>
                <p>{product.print.dimention}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
