import CristmasTree from "../Assets/EventIcons/ChristmasTree.svg"
import EventCalendar from "../Hooks/EventCalendar.tsx"

export default function EventIcon() {
    const eventName = EventCalendar()
    if (eventName) {
        let eventIconData = {url: "", alt: ""}
        const getEventIcon = () => {
            switch (eventName) {
                case "Christmas":
                case "Christmas Eve":
                    eventIconData.alt = "Christmas Is Near!"
                    eventIconData.url = CristmasTree
                    break
                case "Christmas Day":
                    eventIconData.url = CristmasTree
                    eventIconData.alt = "Merry Christmas!"
                    break
                default:
                    return { url: false }
            }
        }
        getEventIcon()
        if(!eventIconData.url) return <div id="eventIcon"></div>
        return (
            <svg id="eventIcon" style={{ backgroundImage: `url(${eventIconData.url})` }} aria-label={eventIconData.alt} />
        );
    } else {
        return <></>
    }
}