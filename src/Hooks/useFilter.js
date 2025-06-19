import { useSearchQuery } from "./useSearchQuery"

export function useFilter(dataArr, callback) {
    const [query] = useSearchQuery()
    const filteredData = dataArr.filter((data) => callback(data).toLowerCase().includes(query.toLowerCase()))

    return [filteredData]
}