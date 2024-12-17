import { useState, useContext, Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import products from "../Data/products.json";
import { CartContext } from "../Data/CartContext.js";
import Display from "../Components/Display.js";
import "../Styles/Product.css";

export default function Product() {
  const [querry] = useSearchParams();
  const id = querry.get("prodId");
  const cart = useContext(CartContext);
  const product = products.find((product) => product.id === id);
  const quantity = cart.getProductQuantity(id);
  const [display, setDisplay] = useState(false);
  const [picture, setPicture] = useState(0);
  const [grab, setGrab] = useState("grab");
  function changePicture(change) {
    if (change === -1 && picture > 0) {
      setPicture(picture - 1);
    } else if (change === 1 && picture < product.print.images.length - 1) {
      setPicture(picture + 1);
    } else if (picture >= product.print.images.length) {
      setPicture(product.print.images.length - 1);
    }
  }
  function swipePicture(e) {
    let move = e.changedTouches[0].clientX;
    let middleX = e.target.x + e.target.width / 2;
    if (middleX > move + 50) {
      changePicture(1);
    } else if (middleX < move - 10) {
      changePicture(-1);
    }
  }
  return (
    <div id="Product">
      <div>
        <div id="productInfo" className="container">
          <div>
            <h2>{product.title}</h2>
          </div>
          <div className="spaced">
            <p>
              <b>Color:</b> {product.print.color}
            </p>
            <p>
              <b>Size:</b> {product.print.dimention}
            </p>
            <p>
              <b>Price:</b> {product.print.price}€
            </p>
          </div>
          <div>
            <div>
              <b>In Cart:</b>
              <button
                onClick={() => cart.addOneToCart(id)}
              >+</button>
              <b>{quantity}</b>
              <button
                onClick={() => cart.removeOneFromCart(id)}
                disabled={quantity === 0}
              >-</button>
            </div>
          </div>
        </div>
        <div id="productDisplay" className="container spaced">
          <div id="displaySelector">
            <button
              className={display ? " " : " buttonOn"}
              onClick={() => setDisplay(false)}
            >
              Pictures
            </button>
            <button
              className={display ? "buttonOn" : " "}
              onClick={() => setDisplay(true)}
            >
              3D View
            </button>
          </div>
          {display ? (
            <Suspense fallback={<div>"Please Wait"</div>}>
              <div className="canvas"
                onMouseDown={() => setGrab("grabbing")}
                onMouseUp={() => setGrab("grab")}
                onMouseLeave={() => setGrab("grab")}
                onMouseEnter={(e) => { e.buttons === 1 ? setGrab(true) : setGrab(false) }}
                style={{ background: "radial-gradient(var(--mainColor), gray)", cursor: grab }}
              >
                <Display source={product.model} color={product.print.color} />
              </div>
            </Suspense>
          ) : (
            <div className="canvas">
              <div>
                <img
                  onTouchEnd={(e) => swipePicture(e)}
                  src={product.print.images[picture]}
                  alt={product.title}
                />
              </div>
              <div>
                <button
                  className="ghostbutton"
                  onClick={() => changePicture(-1)}
                  disabled={picture === 0}
                >
                  <AiOutlineArrowLeft />
                </button>
                {product.print.images.map((img, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="image"
                    value={index}
                    checked={picture === index}
                    onChange={(e) => {
                      setPicture(index);
                    }}
                  />
                ))}
                <button
                  className="ghostbutton"
                  onClick={() => changePicture(1)}
                  disabled={picture === product.print.images.length - 1}
                >
                  <AiOutlineArrowRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div id="productDetails" className="container">
        <div>
          <h3>Details</h3>
          <p>Material:{product.print.material}</p>
          <p>
            Model:{" "}
            <a href={product.source} target="_blank">
              {product.origin}
            </a>
          </p>
          <p>Creative Commons Licence: {product.creativecommons}</p>
        </div>
        <div>
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}
