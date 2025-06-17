import "../Style/CountryDetail.css"
import { Link, useLocation, useParams } from "react-router"
import { useEffect, useState } from "react"
import CountryDetailShimmer from "./CountryDetailShimmer"
import { useTheme } from "../Hooks/useTheme"

export default function CountryDetail() {
    // const countryName = new URLSearchParams(location.search).get("name")

    const params = useParams()
    const countryName = params.country

    const { state } = useLocation()
    const [isDark] = useTheme()

    const [countryDetail, setCountryDetail] = useState(null)
    const [notFound, setNotFound] = useState(false)

    function updateData(data) {
        setCountryDetail({
            imgURL: data.flags.svg,
            nativeName: Object.values(data.name.nativeName).map(item => item.common).join(", "),
            population: data.population,
            region: data.region,
            subRegion: data.subregion,
            capital: data.capital.join(", "),
            tld: data.tld.join(", "),
            currency: Object.values(data.currencies).map(item => item.name).join(", "),
            language: Object.values(data.languages).map(item => item).join(", "),
            borders: []
        })

        if (!data.borders) {
            // Promise.all ne promise ni Array joi pan jyare je country ma border j nathi tyare te Array ni 
            // jagya e undefined aave chhe etle te error aape chhe.
            // etle tene manually ek empty array aapi didhi....
            data.borders = []
        }

        Promise.all(data.borders.map((border) => {
            return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then(res => res.json())
                .then(([country]) => country.name.common)
        })).then(borderName => setCountryDetail(prevState => ({ ...prevState, borders: borderName })))
    }

    useEffect(() => {
        if (state) {
            updateData(state)
            return
        }

        fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
                throw new Error(`HTTP error status ${res.status}`)
            })
            .then(([data]) => {
                updateData(data)
            }).catch(err => {
                console.log("Data fetch failed: ", err)
                setNotFound(true)
            })
    }, [countryName])

    if (notFound) {
        // CountryList.jsx ma line no. 25 to 27 ma je problem chhe te j...
        return <h1>Country Not Found</h1>
    }

    if (!countryDetail) {
        // Jo countryDetail ma empty object pass karu to te truthy value chhe etle first time component render thay tyare
        // te line number 86 par undefined.toLocaleString("en-IN") malashe ane error aapashe.
        // Pan jo null pass karish to falsy value malashe ane aa shimmer effect aavi jashe...
        return <CountryDetailShimmer />
    }

    return (
        <main className={isDark ? "dark" : ""}>
            <div className="country-details-container">
                <span className="back-button" onClick={() => history.back()}>
                    <i className="fa-solid fa-arrow-left" />
                    &nbsp; Back
                </span>
                <div className="country-details">
                    <img src={countryDetail.imgURL} alt={`${countryName} Flag`} />
                    <div className="details-text-container">
                        <h1>{countryName}</h1>
                        <div className="details-text">
                            <p>
                                <b>Native Name: </b>
                                <span className="native-name">{countryDetail.nativeName}</span>
                            </p>
                            <p>
                                <b>Population: </b>
                                <span className="population">{countryDetail.population.toLocaleString("en-IN")}</span>
                            </p>
                            <p>
                                <b>Region: </b>
                                <span className="region">{countryDetail.region}</span>
                            </p>
                            <p>
                                <b>Sub Region: </b>
                                <span className="sub-region">{countryDetail.subRegion}</span>
                            </p>
                            <p>
                                <b>Capital: </b>
                                <span className="capital">{countryDetail.capital}</span>
                            </p>
                            <p>
                                <b>Top Level Domain: </b>
                                <span className="top-level-domain">{countryDetail.tld}</span>
                            </p>
                            <p>
                                <b>Currencies: </b>
                                <span className="currencies">{countryDetail.currency}</span>
                            </p>
                            <p>
                                <b>Languages: </b>
                                <span className="languages">{countryDetail.language}</span>
                            </p>
                        </div>
                        {
                            countryDetail.borders.length !== 0
                            &&
                            <div className="border-countries">
                                <b>Border Countries: </b>&nbsp;
                                {
                                    countryDetail.borders.map(border => <Link key={border} to={`/${border}`}>{border}</Link>)
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}