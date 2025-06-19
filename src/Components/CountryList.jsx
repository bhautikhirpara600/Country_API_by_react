import { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
import CountryListShimmer from "./CountryListShimmer";
import { useSearchQuery } from "../Hooks/useSearchQuery";
import { useFilter } from "../Hooks/useFilter";

function CountryList() {
    const [countryData, setCountryData] = useState([])
    const [errorOk, setErrorOk] = useState(false)

    // const [query] = useSearchQuery()

    const filteredData = () => {
        const [filteredByName] = useFilter(countryData, (data) => data.name.common)
        const [filteredByRegion] = useFilter(countryData, (data) => data.region)

        if(!filteredByName.length) return filteredByRegion
        if(filteredByName.length === 2 && filteredByRegion.length > 2) return filteredByRegion

        return filteredByName
    }


    useEffect(() => {
        fetch("https://restcountries.com/v3.1/independent?status=true")
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error(`HTTP error status : ${res.status}`)
            })
            .then(data => setCountryData(data))
            .catch(err => {
                console.log("Data fetch failed::", err)
                setErrorOk(true)
            })
    }, [])

    if (errorOk) {
        // jyare fetch("Khoti link") karo tyare error aave chhe te router ma je errorElement aapyo chhe te aavashe.
        // pan tene vadhu clear karava mate manually error create kari shakay jyare res.status = 404 ke 500 aave te catch ma aavatu nathi
        // etle line no. 12 to 15 ma manually error create karel chhe...
        return <h1>Something error occurred in fetch API</h1>
    }

    if (!countryData) {
        return <CountryListShimmer />
    }

    return (
        <>
            <div className="countries-container">
                {
                    filteredData().map((country) => <CountryCard
                        key={country.name.common}
                        countryName={country.name.common}
                        population={country.population.toLocaleString("en-IN")}
                        imgURL={country.flags.svg}
                        region={country.region}
                        capital={country.capital?.[0]}
                        data={country}
                    />)
                }
            </div>
        </>
    )
}

export default CountryList