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
        }else if(day >= 25 && day <= 26){
            return "Christmas Day"
        }else if(day > 26 && day < 31){
            return "New Year's Eve"
        }
    }else if(month === 0){
        if(day < 7){
            return "New Year"
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