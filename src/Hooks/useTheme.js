import { useContext } from "react";
import { ThemeContext } from "../Contexts/themeContext";

export function useTheme() {
    return useContext(ThemeContext)
}