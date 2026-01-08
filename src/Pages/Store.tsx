import React, { useState, useEffect } from "react";
import { useSearchParams, createSearchParams, NavigateFunction, useNavigate } from "react-router-dom";
import products from "../Data/products.json";
import productCategories from "../Data/productCategories.json";
import PriceCalculator from "../Hooks/PriceCalculator.tsx";
import "../Styles/Store.css";

export default function Store() {

  const [openFilters, setOpenFilters]
    : [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    = useState(true);

  const [useFilterButton, setUseFilterButton] 
    : [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setUseFilterButton(window.innerWidth < 1000);
      if(window.innerWidth > 1000) {
        setOpenFilters(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [searchParams, setSearchParams]
    : [URLSearchParams, React.Dispatch<React.SetStateAction<URLSearchParams>>]
    = useSearchParams();

  const [search, setSearch]
    : [string, React.Dispatch<React.SetStateAction<string>>]
    = useState(searchParams.get("search") || "");

  const [sortBy, setSortBy]
    : [string, React.Dispatch<React.SetStateAction<string>>]
    = useState(searchParams.get("sortBy") || "name");
  const [invertSort, setInvertSort]

    : [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    = useState(searchParams.get("invertSort") === "true");

  const sortFunctions = (a, b) => {
    if (sortBy === "name") {
      return invertSort ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title);
    } else if (sortBy === "price" || sortBy === "promotion") {
      const aPrices = PriceCalculator(a.id);
      const bPrices = PriceCalculator(b.id);
      switch (sortBy) {
        case "price":
          return invertSort ? bPrices.newPrice - aPrices.newPrice : aPrices.newPrice - bPrices.newPrice;
        case "promotion":
          return invertSort ? aPrices.discount - bPrices.discount : bPrices.discount - aPrices.discount;
      }
    }
  }

  const [category, setCategory]
    : [string, React.Dispatch<React.SetStateAction<string>>]
    = useState(searchParams.get("category") || "All");

  const [priceRange, setPriceRange]:
    [[number, number], React.Dispatch<React.SetStateAction<[number, number]>>]
    = useState([Number(searchParams.get("minPrice")) || 0, Number(searchParams.get("maxPrice")) || 50]);

  const [promotionRange, setPromotionRange]:
    [[number, number], React.Dispatch<React.SetStateAction<[number, number]>>]
    = useState([Number(searchParams.get("minPromotion")) || 0, Number(searchParams.get("maxPromotion")) || 0.99]);

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
      minPromotion: String(promotionRange[0]),
      maxPromotion: String(promotionRange[1]),
      sortBy: sortBy,
      invertSort: String(invertSort),
    });
    setSearchParams(updatedSearchParams);
  }, [category, search, priceRange, promotionRange, sortBy, invertSort]);


  return (
    <div id="store">
      <div id="storefilter">
        {useFilterButton && 
          <button 
          style={{color: openFilters ? "var(--mainColor)" : "var(--accentColor)", backgroundColor: openFilters ? "var(--accentColor)" : "var(--mainColor)"}}
          onClick={() => setOpenFilters(!openFilters)}>
            Filters {openFilters ? "▲" : "▼"}
          </button>}
        <div style={{ height: openFilters ? "auto" : "0px" }}>
          <div>
            <h4>Sort By</h4>
            <div>
              <input
                type="radio"
                id="sortByName"
                name="sortBy"
                value="name"
                checked={sortBy === "name"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              <label htmlFor="sortByName">Name</label>
            </div>
            <div>
              <input
                type="radio"
                id="sortByPrice"
                name="sortBy"
                value="price"
                checked={sortBy === "price"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              <label htmlFor="sortByPrice">Price</label>
            </div>
            <div>
              <input
                type="radio"
                id="sortByPromo"
                name="sortBy"
                value="promotion"
                checked={sortBy === "promotion"}
                onChange={(e) => setSortBy(e.target.value)}
              />
              <label htmlFor="sortByPromo">Promotions</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="invertSort"
                name="invertSort"
                checked={invertSort}
                onChange={(e) => setInvertSort(e.target.checked)}
              />
              <label htmlFor="invertSort">Invert Order</label>
            </div>
          </div>
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
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>
                <label htmlFor="minPrice">Min:</label>
                <input
                  id="minPrice"
                  type="number"
                  min="0"
                  max={priceRange[1] - 1}
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                />
              </div>
              <div>
                <label htmlFor="maxPrice">Max:</label>
                <input
                  type="number"
                  min={priceRange[0] + 1}
                  max="50"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                />
              </div>
            </div>
          </div>
          <div>
            <h4>Promotions</h4>
            <div>
              <input
                type="radio"
                name="promo"
                id="noPromo"
                checked={promotionRange[0] === 0 && promotionRange[1] === 0.99}
                onChange={() => setPromotionRange([0, 0.99])}
              />
              <label htmlFor="noPromo">All</label>
            </div>
            <div>
              <input
                type="radio"
                name="promo"
                id="upTo20Promo"
                checked={promotionRange[0] === 0 && promotionRange[1] === 0.2}
                onChange={() => setPromotionRange([0, 0.2])}
              />
              <label htmlFor="upTo20Promo">Up to 20%</label>
            </div>
            <div>
              <input
                type="radio"
                name="promo"
                id="20to30Promo"
                checked={promotionRange[0] === 0.2 && promotionRange[1] === 0.3}
                onChange={() => setPromotionRange([0.2, 0.3])}
              />
              <label htmlFor="20to30Promo">From 20% to 30%</label>
            </div>
            <div>
              <input
                type="radio"
                name="promo"
                id="30to50Promo"
                checked={promotionRange[0] === 0.3 && promotionRange[1] === 0.5}
                onChange={() => setPromotionRange([0.3, 0.5])}
              />
              <label htmlFor="30to50Promo">From 30% to 50%</label>
            </div>
            <div>
              <input
                type="radio"
                name="promo"
                id="over50Promo"
                checked={promotionRange[0] === 0.51 && promotionRange[1] === 0.99}
                onChange={() => setPromotionRange([0.51, 0.99])}
              />
              <label htmlFor="over50Promo">Over 50%</label>
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
              PriceCalculator(product.id).newPrice <= priceRange[1] &&
              PriceCalculator(product.id).discount >= promotionRange[0] &&
              PriceCalculator(product.id).discount <= promotionRange[1]
          )
          .sort((a, b) => sortFunctions(a, b))
          .map((product, index) => (
            <div
              key={index}
              className="container"
              onClick={() => navToProduct(product.id)}
            >
              {PriceCalculator(product.id).discount > 0 && <div id="discountTag">-{PriceCalculator(product.id).discount * 100}%</div>}
              <h3 style={ PriceCalculator(product.id).discount > 0 ? { paddingRight: "45px", paddingLeft: "15px", textAlign: "left" } : {}}>{product.title}</h3>
              <img
                src={product.print.images[0]}
                alt={product.title}
              />
              <div>
                <p>
                  {PriceCalculator(product.id).discount === 0 ?
                    <>{product.print.price}€</> :
                    <><del style={{ color: "red" }}>{product.print.price}€</del> {PriceCalculator(product.id).newPrice}€</>}</p>
                <p>{product.print.dimention}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
