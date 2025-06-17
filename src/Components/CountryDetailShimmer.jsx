import { useTheme } from "../Hooks/useTheme"
import "../Style/CountryDetailShimmer.css"
export default function CountryDetailShimmer() {

    const [isDark] = useTheme()

    return (
        <main className={isDark ? "dark" : ""}>
            <div className="country-details-container">
                <div className="back-button my-btn"></div>
                <div className="country-details">
                    <div className="img-div"></div>
                    <div className="details-text-container detail-text-div">
                        <div className="h1-div"></div>
                        <div className="details-text">
                            {
                                Array.from({ length: 8 }).map((_, i) => <p key={i} className="p-text"></p>)
                            }
                        </div>
                        <div className="border-countries">
                            <div className="border-heading"></div>
                            <div className="border-text"></div>
                            <div className="border-text"></div>
                            <div className="border-text"></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}