import { useContext } from "react";
import { SearchQueryContext } from "../Contexts/SearchQueryContext";

export function useSearchQuery() {
    return useContext(SearchQueryContext)
}