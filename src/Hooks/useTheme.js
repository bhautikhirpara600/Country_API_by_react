import { useContext } from "react";
import { ThemeContext } from "../Contexts/ThemeContext";

export function useTheme() {
    return useContext(ThemeContext)
}