import { useSearchQuery } from "../Hooks/useSearchQuery"

function SelectMenu() {

    const [_, setQuery] = useSearchQuery()

    return (
        <select name="select-menu" className="filter-by-region" onChange={(e) => setQuery(e.target.value)}>
            <option hidden>Filter by Region</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
            <option value="">All Country</option>
        </select>
    )
}

export default SelectMenu