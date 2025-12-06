import Products from "../Data/products.json";
import EventDiscount from "../Data/EventDiscounts.json";
import EventCalendar from "./EventCalendar";

export default function PriceCalculator(prodId: string) {
    const product = Products.find((product) => product.id === prodId)
    //If product not found
    if(product === undefined){ 
        console.error("Product not found while calculating price")
        return
    };
    let price: number = product.print.price;
    const event = EventCalendar()
    if (event) {
        const globalDiscount = EventDiscount[event] || 0;
        const productDiscount = product.eventExtraDiscount[event] || 0;
        const totalDiscount = globalDiscount + productDiscount;
        if(totalDiscount >=1){
            console.error("Total Discount exceeds 100%");
            return {price:price, discount: 0}
        }else{
            price = Math.round((price * totalDiscount) * 100) / 100;
            return {price:price, discount: totalDiscount}
        }
    }else{
        return  {price:price, discount: 0}
    }
}