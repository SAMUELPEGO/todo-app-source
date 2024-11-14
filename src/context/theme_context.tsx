import React, { createContext, useState } from "react";

type theme = "dark" | "light"
interface themeContextProps {
    theme:theme
    change?:React.Dispatch<React.SetStateAction<theme>>
}
export const ThemeContext = createContext<themeContextProps>({theme:"dark"})

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme,setTheme] = useState<theme>("dark")
    return (
        <ThemeContext.Provider value={{theme,change:setTheme}}>

            {children}
        </ThemeContext.Provider>

    )
}
export default ThemeProvider