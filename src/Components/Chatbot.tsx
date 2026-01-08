import { useEffect } from "react";
import ChatBot from "react-chatbotify";
import { NavigateFunction, useNavigate, createSearchParams } from "react-router-dom";
import EventCalendar from "../Hooks/EventCalendar.tsx";

export default function Chatbot() {

    //Chatbot behavior settings 
    const settings = {
        tooltip:{
            mode: "CLOSE",
            text: "Welcome!"
        }
    }

    //Fades out tooltip
    useEffect(()=>{
        const timer = setTimeout(() => {
            const tooltip = document.getElementsByClassName("rcb-chat-tooltip")[0];
            if(tooltip === undefined) return;
            tooltip.style.transition = "0.5s";
            tooltip.style.opacity = "0";
        }, 5000);
        return () => clearTimeout(timer);
    },[])

    //assigns css variables and values to chatbot
    const styles = {
        headerStyle: {
            background: 'var(--accentColor)',
            color: 'var(--mainColor)',
            padding: '2px',
        },
        chatHistoryButtonStyle: {
            background: "var(--mainColor)",
            borderRadius: "0px",
            padding: "2px",
        },
        chatInputContainerStyle: {
            background: "var(--accentColor)",
            borderRadius: "0px",
            padding: "5px",
        },
        botBubbleStyle: {
            backgroundColor: "var(--accentColor)",
            color: "var(--secondaryColor)",
            borderRadius: "0px",
            padding: "10px",
        },
        chatWindowStyle: {
            backgroundColor: "var(--mainColor)",
            color: "var(--accentColor)",
            height: "80%",
            border: "var(--border2)",
            boxShadow: "var(--boxShadow)",
        },
        chatButtonStyle: {
            width: "50px",
            height: "50px",
            borderRadius: "var(--borderRound)",
            background: "black",
            border: "var(--border2)",
        },
        tooltipStyle:{
            right: "80px",
            bottom: "25px",
            padding:"5px",
            background: "var(--accentColor)",
            color: "var(--secondaryColor)",
            border: "var(--border2)",
        },
        footerStyle: {
            background: 'var(--accentColor)',
            color: 'var(--secondaryColor)',
            padding: '2px',
        }
    }

    // handles chatbot url redirect
    const navigate: NavigateFunction = useNavigate();
    function chatbotRedirect(target: string) {
        console.log("target: ", target)
        if (target === "🐾 Animals") {
            navigate({
                pathname: "/store",
                search: createSearchParams({category: "Animal", }).toString()
            })
        } else if (target === "🏛️ Statues") {
            navigate({
                pathname: "/store",
                search: createSearchParams({ category: "Human" }).toString()
            })
        } else if (target === "👌 Promotions") {
            navigate({
                pathname: "/store",
                search: createSearchParams({ sortBy: "promotion" }).toString()
            })
        }
    }

    const welcomeMessage = () =>{
        const event = EventCalendar()
        switch(event){
            case "Christmas":
            case "Christmas Eve":
                return `🎁 Christmas is Near!🎄 \n🎅 We have discounts on all of our products! \n\n What would you like to explore today?`
            case "Christmas Day":
                return `🎁 Merry Christmas!🎄 \n🎅 We have discounts on all of our products! \n\n What would you like to explore today?`
            case "New Year's Eve":
                return `New Year is Near!🎇 \n We have discounts on all of our products! 🎉🎇\n\n What would you like to explore today?`
            case "New Year":
                return `🎉 Happy New Year!🎇 \n We have discounts on all of our products! 🎉🎇\n\n What would you like to explore today?`

            default:
                return `👋 Hi there! Welcome to Palmeiras Workshop!\n\nWhat would you like to explore today?`
        }
        
    }

    // chatbot conversation flow
    const flow = {
        start: {
            message: welcomeMessage,
            options: [
                "🐾 Animals",
                "🏛️ Statues",
                "👌 Promotions"
            ],
            function: (params: any) => chatbotRedirect(params.userInput),
            path: "redirected"
        },
        redirected: {
            message: (params: any) => `Sit tight, we're redirecting you to ${params.userInput}...`,
            chatDisabled: true
        }
    }
    return <ChatBot flow={flow} styles={styles} settings={settings} />
}