import { Link } from "react-router"

function CountryCard({ countryName, population, imgURL, region, capital, data }) 
{
    return (
        <Link className="country-card" to={`/${countryName}`} state={data}>
            <div className="img-div"><img src={imgURL} alt={`${countryName} Flag`} /></div>
            <div className="card-text">
                <h3 className="card-title">{countryName}</h3>
                <p><b>Population: </b>{population}</p>
                <p><b>Region: </b>{region}</p>
                <p><b>Capital: </b>{capital}</p>
            </div>
        </Link>
    )
}

export default CountryCard