import { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import Display from "./Display";

export default function DarkMode() {
    const [darkMode, setDarkMode] = useState(false);

    const lightValues={
        mainColor : getComputedStyle(root).getPropertyValue("--mainColorLight"),
        secondaryColor : getComputedStyle(root).getPropertyValue("--secondaryColorLight"),
        terciaryColor : getComputedStyle(root).getPropertyValue("--terciaryColorLight"),
        accentColor : getComputedStyle(root).getPropertyValue("--accentColorLight"),
        opaqueColor : getComputedStyle(root).getPropertyValue("--mainOpaqueLight"),
        boxShadow : getComputedStyle(root).getPropertyValue("--boxShadowLight"),
        boxShadowInset : getComputedStyle(root).getPropertyValue("--boxShadowInsetLight"),
        border1 : getComputedStyle(root).getPropertyValue("--border1Light"),
        border2 : getComputedStyle(root).getPropertyValue("--border2Light"),
    };

    const darkValues={
        mainColor : getComputedStyle(root).getPropertyValue("--mainColorDark"),
        secondaryColor : getComputedStyle(root).getPropertyValue("--secondaryColorDark"),
        terciaryColor : getComputedStyle(root).getPropertyValue("--terciaryColorDark"),
        accentColor : getComputedStyle(root).getPropertyValue("--accentColorDark"),
        opaqueColor : getComputedStyle(root).getPropertyValue("--mainOpaqueDark"),
        boxShadow : getComputedStyle(root).getPropertyValue("--boxShadowDark"),
        boxShadowInset : getComputedStyle(root).getPropertyValue("--boxShadowInsetDark"),
        border1 : getComputedStyle(root).getPropertyValue("--border1Dark"),
        border2 : getComputedStyle(root).getPropertyValue("--border2Dark"),
    };

    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").matches
            ? setDarkMode(true)
            : setDarkMode(false);
    }, []);

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
        event.matches ? setDarkMode(true) : setDarkMode(false);
    });

    useEffect(() => {
        if (darkMode) {
            root.style.setProperty("--mainColor", darkValues.mainColor);
            root.style.setProperty("--secondaryColor", darkValues.secondaryColor);
            root.style.setProperty("--terciaryColor", darkValues.terciaryColor);
            root.style.setProperty("--accentColor", darkValues.accentColor);
            root.style.setProperty("--mainOpaque", darkValues.opaqueColor);
            root.style.setProperty("--boxShadow", darkValues.boxShadow);
            root.style.setProperty("--boxShadowInset", darkValues.boxShadowInset);
            root.style.setProperty("--border1", darkValues.border1);
            root.style.setProperty("--border2", darkValues.border2);
            document.getElementById("logosvg").style.filter = "invert(1)";
        } else {
            root.style.setProperty("--mainColor", lightValues.mainColor);
            root.style.setProperty("--secondaryColor", lightValues.secondaryColor);
            root.style.setProperty("--terciaryColor", lightValues.terciaryColor);
            root.style.setProperty("--accentColor", lightValues.accentColor);
            root.style.setProperty("--mainOpaque", lightValues.opaqueColor);
            root.style.setProperty("--boxShadow", lightValues.boxShadow);
            root.style.setProperty("--boxShadowInset", lightValues.boxShadowInset);
            root.style.setProperty("--border1", lightValues.border1);
            root.style.setProperty("--border2", lightValues.border2);
            document.getElementById("logosvg").style.filter = "invert(0)";
        }
    }, [darkMode]);

    return (
        <div className="darkmode" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
                <FaSun />
            ) : (
                <FaMoon />
            )}
        </div>
    )
}