import ChatBot from "react-chatbotify";
import { NavigateFunction, useNavigate, createSearchParams } from "react-router-dom";

export default function Chatbot() {

    const navigate: NavigateFunction = useNavigate();

    function chatbotRedirect(target: string) {
        console.log("target: ", target)
        if (target === "🐾 Animals") {
            navigate({
                pathname: "/store",
                search: createSearchParams({ search: "", category: "Animal" }).toString()
            })
        } else if (target === "🏛️ Statues") {
            navigate({
                pathname: "/store",
                search: createSearchParams({ search: "", category: "Human" }).toString()
            })
        }
    }

    const flow = {
        start: {
            message: "👋 Hi there! Welcome to Palmeiras Workshop!\n\nWhat would you like to explore today?",
            options: [
                "🐾 Animals",
                "🏛️ Statues"
            ],
            function: (params: any) => chatbotRedirect(params.userInput),
            path: "redirected"
        },
        redirected: {
            message: (params: any) => `Sit tight, we're redirecting you to ${params.userInput}...`,
            chatDisabled: true
        }
    }
    return <ChatBot flow={flow} />
}