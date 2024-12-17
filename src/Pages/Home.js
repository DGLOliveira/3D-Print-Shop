import React, { useState, useEffect } from "react";
import { createSearchParams, useNavigate, Link } from "react-router-dom";
import products from "../Data/products.json";
import "../Styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [hero, setHero] = useState(0);
  const [prodId, selectProduct] = useState(-1);

  useEffect(() => {
    if (prodId !== -1) {
      navigate({
        pathname: "/product",
        search: createSearchParams({ prodId }).toString(),
      });
    }
  },[prodId]);

  
  useEffect(() => {
    setTimeout(() => {
      if(hero === 2){
        setHero(0);
      }else{
        setHero(hero + 1);
      }
    }, 10000);
    return () => clearTimeout();
  },[hero]);

  return (
    <div id="home">
      <div id="hero">
        <img src="products/hero1.jpeg" style={{left: hero*-100+"%"}}/>
        <img src="products/hero2.jpeg" style={{left: hero*-100+"%"}}/>
        <img src="products/hero3.jpeg" style={{left: hero*-100+"%"}}/>
        <div id="heroMessage">
          <h1>3D Figurines</h1>
          <p>
            <b>Of man and nature, we bring form.</b>
          </p>
          <Link to="store">
            <button>Pre-Order</button>
          </Link>
        </div>
      </div>
      <div id="featured">
        <h1 className="spaced">Most Popular</h1>
        <div className="spaced">
          {products.map((product, index) =>
            product.featured !== 0 ? (
              <div
                key={index}
                onClick={() => selectProduct(product.id)}
                className="container spaced"
              >
                <h3>{product.title}</h3>
                <img
                  index={index}
                  src={product.print.images[0]}
                  alt={product.title}
                />
              </div>
            ) : null,
          )}
        </div>
      </div>
      <div id="intro">
        <h1>Who we are</h1>
        <p>We are a small online shop that specializes in the production of 3D figurines.
          We take pride in the quality of our products and the attention we give to each of our customers.
          We are always open to new ideas and suggestions, so if you have any, please don't hesitate to contact us.
        </p>
      </div>
    </div>
  );
}
