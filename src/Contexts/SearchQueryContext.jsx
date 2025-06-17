import { createContext, useState } from "react";

export const SearchQueryContext = createContext([])

export function SearchQueryProvider({children}) {
    const [query, setQuery] = useState("")

    return (
        <SearchQueryContext.Provider value={[query, setQuery]}>
            {children}
        </SearchQueryContext.Provider>
    )
}