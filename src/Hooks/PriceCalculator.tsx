import Products from "../Data/products.json";
import EventDiscount from "../Data/EventDiscounts.json";
import EventCalendar from "./EventCalendar.tsx";

export default function PriceCalculator(prodId: string | null) {
    const product = Products.find((product) => product.id === prodId)
    //If product not found
    if(product === undefined){ 
        console.error("Product not found while calculating price")
        return {price:0, newPrice: 0, discount: 0}
    };
    let price: number = product.print.price
    const event = EventCalendar()
    if (event) {
        const globalDiscount = EventDiscount[event] || 0
        const productDiscount = product.eventExtraDiscount[event] || 0
        const totalDiscount = Math.round((globalDiscount + productDiscount) * 100) / 100
        if(totalDiscount >=1){
            console.error("Total Discount exceeds 100%")
            return {price:price, newPrice: price, discount: 0}
        }else{
            const newPrice = Math.round((price * totalDiscount) * 100) / 100
            return {price:price, newPrice: newPrice, discount: totalDiscount}
        }
    }else{
        return  {price:price, newPrice: price, discount: 0}
    }
}