import Header from "./Components/Header"
import { Outlet } from "react-router"
import { ThemeProvider } from "./Contexts/ThemeContext"
import { SearchQueryProvider } from "./Contexts/SearchQueryContext"

export default function App() {

    return (
        <SearchQueryProvider>
            <ThemeProvider>
                <Header />
                <Outlet />
            </ThemeProvider>
        </SearchQueryProvider>
    )
}