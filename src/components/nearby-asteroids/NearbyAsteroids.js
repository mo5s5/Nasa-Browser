import { useState } from "react"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.module.css'
import './nearby_asteroids.scss'
import { useContext } from "react";
import { Context } from "../../context";
import AsteroidSheet from "./AsteroidSheet";
import { useTranslation } from "react-i18next";

export default function NearbyAsteroids() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [t] = useTranslation("global");
    const startDayIso = startDate.toISOString().slice(0, 10);
    const endDayIso = endDate.toISOString().slice(0, 10);
    const { getNearbyAsteroids, responseOk } = useContext(Context);
    const [rangeBigger, setRangeBigger] = useState(false)


    const onSearch = (startDate, endDate) => {
        const oneDay = 1000 * 60 * 60 * 24;
        const rangeEnd = endDate.getTime();
        const rangeStart = startDate.getTime();
        let range = Math.ceil(rangeEnd - rangeStart) / oneDay;
        if (range < 7.1) {
            getNearbyAsteroids(startDayIso, endDayIso);
            setRangeBigger(false)
        } else {
            setRangeBigger(true)
        }
    }

    return (
        <div className="main">
            <h3>{t("nearbyAsteroid.title")}</h3>
            <h5>{t("nearbyAsteroid.info")}</h5>
            <div className="date-section">
                <span>{t("nearbyAsteroid.startDate")}:</span>
                <DatePicker
                    popperPlacement="bottom"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat='dd/MM/yyyy'
                    showYearDropdown
                    scrollableMonthYearDropdown />
                <span>{t("nearbyAsteroid.endDate")}:</span>
                <DatePicker
                    popperPlacement="bottom"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    minDate={startDate}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    scrollableMonthYearDropdown
                />
                <button className="search" onClick={() => onSearch(startDate, endDate)}>{t("nearbyAsteroid.search")}</button>
            </div>
            {rangeBigger ? <span className="alert">{t("nearbyAsteroid.rangeBigger")}</span> : <span></span>}
            <div className="content"> {responseOk &&
                <AsteroidSheet />}
            </div>
        </div>
    )
}