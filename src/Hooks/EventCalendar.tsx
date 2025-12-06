//Simple function to check for calendar events that justify discounts
export default function EventCalendar() {
    const ans = []
    const date = new Date()
    const year = date.getUTCFullYear()
    const month = date.getUTCMonth()
    const day = date.getUTCDate()

    //Check for Christmas (global discount)
    if(month === 11){
        if(day < 17){
            return "Christmas"
        }else if(day >=17 && day < 25){
            return "Christmas Eve"
        }else if(day === 25){
            return "Christmas Day"
        }else{
            return "Boxing Week"
        }
    }
    //TODO: Check for Easter(Global Discount) and Carnival(Discount on masks)
    //TODO: Check for Mothers Day (discount on flowers and female figures)
    //TODO: Check for Fathers Day (discount on flowers and male figures)
    //TODO: Check for Child Day (discount on playthings)(no model available)
    //TODO: Check for Lovers Day (discount on flowers && "nude" figures)
    //TODO: Check for Halloween(Discount on masks)
    //TODO: Check for Summer(Small Thematic discount)
    else{
        return false
    }
}