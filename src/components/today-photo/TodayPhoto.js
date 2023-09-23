import { useState } from "react"
import './today_photo.scss'
import { useContext } from "react";
import { Context } from "../../context";
import DatePicker from "react-datepicker"
import { useTranslation } from "react-i18next";

export default function TodayPhoto() {
    const { fetchPhoto, photoData } = useContext(Context);
    const [date, setDate] = useState(new Date());
    const [t] = useTranslation("global");

    return (
        <div className="main">
            <DatePicker
                wrapperClassName="calendar"
                popperPlacement="bottom"
                selected={date}
                onChange={(date) => setDate(date)}
                dateFormat='dd/MM/yyyy'
                showYearDropdown
                scrollableMonthYearDropdown />
            <button className="search" onClick={() => fetchPhoto(date)}>{t("dayPhoto.search")}</button>
            {photoData ?
                <div className="content">
                    <h1>{photoData.title}</h1>
                    <img src={photoData.url} alt={photoData.title} />
                    <a href={photoData.hdurl}>HD link of picture</a>
                    <p>{photoData.explanation}</p>
                </div> : <div />}
        </div>
    )
}