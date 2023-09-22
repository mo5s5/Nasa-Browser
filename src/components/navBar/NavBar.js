import { useTranslation } from 'react-i18next'
import './navBar.scss'
import { Link } from 'react-router-dom'


export default function NavBar(props) {
    const [t] = useTranslation("global")
    return (
        <header className='navbar'>
            <ul className='nav'>
                <Link to='/nasa_photo'>{t("topBar.astronomyPhoto")}</Link>
                <Link to='/nearby_asteroids'>{t("topBar.nearbyAsteroid")}</Link>
                <Link to='/submit_new_planet'>{t("topBar.submitNewPlanet")} </Link>
            </ul>
        </header>
    )
}


