import { useState, useContext, useEffect } from "react";
import { CartContext } from "../Data/CartContext.js";
import products from "../Data/products.json";
import {
    createSearchParams,
    useNavigate,
} from "react-router-dom";
import "../Styles/CheckOut.css";

export default function CheckOut() {
    const cart = useContext(CartContext);
    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    const [stage, setStage] = useState(0);
    //Stage 1 - confirm order
    //Stage 2 - Client Details
    //Stage 3 - Payment Options
    //Stage 4 - Confirmation
    //Stage 5 - Success
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [postcode, setPostcode] = useState("");
    const [message, setMessage] = useState("");
    const [payment, setPayment] = useState("");

    let navigate = useNavigate();
    function shopLink(prodId) {
        navigate({
            pathname: "/product",
            search: createSearchParams({ prodId }).toString(),
        });
    }

    const moveStage = (value) => {
        setStage(value);
        window.scrollTo(0, 0, "smooth");
    };

    useEffect(() => {
        if (stage === 4) {
            cart.emptyCart();
        }
    }, [stage]);

    return (
        <div id="checkout" className="page">
            <h1>Check-Out</h1>
            <progress value={stage} max="4" />
            <div id="checkoutContainer">
                <div id="confirmOrder" style={{ left: -100 * stage + "%" }} >
                    <h2>Confirm Order</h2>
                    <div>
                        {cart.items.map((item, index) => (
                            <div key={index}>
                                <img
                                    src={
                                        products.find((product) => product.id === item.id).print
                                            .images[0]
                                    }
                                    alt={products.find((product) => product.id === item.id).title}
                                    onClick={() => shopLink(item.id)}
                                />
                                <div>
                                    <h4>
                                        {products.find((product) => product.id === item.id).title}
                                    </h4>
                                    <p>
                                        <b>Quantity:</b>
                                        {item.quantity}
                                    </p>
                                    <p>
                                        <b>Price:</b>
                                        {products.find((product) => product.id === item.id).print
                                            .price * item.quantity}
                                        €
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p>
                        <b>Total Price:</b> {cart.getTotalCost()} €
                    </p>
                    <div className="stageButtons">
                        <button onClick={() => moveStage(1)}>Next</button>
                    </div>
                </div>
                <div id="clientDetails" style={{ left: -100 * 2 * stage + 100 + "%" }}>
                    <h2>Client Details</h2>
                    <form className="spaced" onSubmit={(e) => { e.preventDefault();moveStage(2); }}>
                        <fieldset>
                            <legend>Name</legend>
                            <div>
                                <label htmlFor="firstName">*First Name</label>
                                <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required></input>
                            </div>
                            <div>
                                <label htmlFor="lastName">*Last Name</label>
                                <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required></input>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Contacts</legend>
                            <div>
                                <label htmlFor="email">*Email</label>
                                <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                            </div>
                            <div>
                                <label htmlFor="phone">*Phone Number</label>
                                <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required></input>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Delivery Address</legend>
                            <div>
                                <label htmlFor="country">*Country</label>
                                <input type="text" id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} required></input>
                            </div>
                            <div>
                                <label htmlFor="city">*City</label>
                                <input type="text" id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required></input>
                            </div>
                            <div>
                                <label htmlFor="address1">*Address {"(first line)"}</label>
                                <input type="text" id="address1" name="address1" value={address1} onChange={(e) => setAddress1(e.target.value)} required />
                            </div>
                            <div>
                                <label htmlFor="address2">*Address {"(second line)"}</label>
                                <input type="text" id="address2" name="address2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="postcode">*Postcode</label>
                                <input type="text" id="postcode" name="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} required></input>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend>Additional Information</legend>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
                        </fieldset>
                        <div className="stageButtons">
                            <button onClick={() => moveStage(0)}>Back</button>
                            <button type="submit">Next</button>
                        </div>
                    </form>
                </div>
                <div id="paymentOptions" style={{ left: -100 * 2 * stage + 200 + "%" }} >
                    <h3>Payment Options</h3>
                    <form onSubmit={(e) => { e.preventDefault();moveStage(3); }}>
                    <div className="spaced">
                        <select name="paymentOptions" id="paymentOptions" onChange={(e) => setPayment(e.target.value)} required>
                            <option value="">Select Payment Option</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>
                    <div className="stageButtons">
                        <button onClick={() => moveStage(1)}>Back</button>
                        <button type="submit">Next</button>
                    </div>
                    </form>
                </div>
                <div id="confirmInfo" style={{ left: -100 * 2 * stage + 300 + "%" }} >
                    <h3>Confirmation</h3>
                    <p>Please verify that all data is correct before finalizing the order.</p>
                    <div>
                        <div id="verifyOrder">
                            <h4>Order Summary</h4>
                            {cart.items.map((item, index) => (
                                <div key={index}>
                                    <img
                                        src={
                                            products.find((product) => product.id === item.id).print
                                                .images[0]
                                        }
                                        alt={products.find((product) => product.id === item.id).title}
                                        onClick={() => shopLink(item.id)}
                                    />
                                    <div>
                                        <h4>
                                            {products.find((product) => product.id === item.id).title}
                                        </h4>
                                        <p>
                                            <b>Quantity:</b>
                                            {item.quantity}
                                        </p>
                                        <p>
                                            <b>Price:</b>
                                            {products.find((product) => product.id === item.id).print
                                                .price * item.quantity}
                                            €
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div id="verifyInfo">
                            <div>
                                <h4>Client Information</h4>
                                <p><b>Name:</b> {firstName} {lastName}</p>
                                <p><b>Email:</b> {email}</p>
                                <p><b>Phone:</b> {phone}</p>
                            </div>
                            <div>
                                <h4>Delivery Address</h4>
                                <p><b>Country:</b> {country}</p>
                                <p><b>City:</b> {city}</p>
                                <p><b>Address:</b> {address1}</p>
                                <p> {address2}</p>
                                <p><b>Postcode:</b> {postcode}</p>
                            </div>
                            <div>
                                <h4>Payment Information</h4>
                                <p><b>Payment Option:</b> {payment}</p>
                            </div>
                            <div>
                                <h4>Additional Information</h4>
                                <p>{message}</p>
                            </div>
                        </div>
                    </div>
                    <div className="stageButtons">
                        <button onClick={() => moveStage(2)}>Back</button>
                        <button onClick={() => moveStage(4)}>Submit</button>
                    </div>
                </div>
                <div id="processed" style={{ left: -100 * 2 * stage + 400 + "%" }} >
                    <h3>Success</h3>
                    <p>Thank you for trying this website, since this is not a real buisness, nothing has been done, and no information was either sent or stored.</p>
                    <p>If it was real, this process would have sent the information to the buisness, whom then would respond with the total cost and the payment details.</p>
                </div>
            </div>
        </div>
    );
}