import { useState, useEffect } from "react"
import './submit-planet.scss'
import { useTranslation } from "react-i18next";

export default function SubmitNewPlanet() {
    const [formValue, setFormValue] = useState({
        planetName: '',
        galaxy: '',
        diameter: '',
        distance: '',
        name: '',
        email: '',
    })

    const [t] = useTranslation("global");
    const [formError, setFormError] = useState({});
    const [isSubmit, setSubmit] = useState(false);

    useEffect(() => {
        if (Object.keys(formError).length === 0 && isSubmit) {
            console.log(formValue);
        }
    }, [formError, formValue, isSubmit]);

    const handlevalidation = (e) => {
        e.preventDefault()
        const { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });

    };

    const validationForm = (value) => {
        console.log(value);
        const errors = {};
        const emailPattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!formValue.planetName) {
            errors.planetName = t("submitPlanet.planetRequired");
        } else if (formValue.planetName.length < 16) {
            errors.planetName = t("submitPlanet.nameValid");;
        }
        if (!formValue.email) {
            errors.email = t("submitPlanet.emailRequired");
        } else if (!emailPattern.test(value.email)) {
            errors.email = t("submitPlanet.emailValid");
        }
        if (!formValue.galaxy) {
            errors.galaxy = t("submitPlanet.galaxyRequired");
        }
        if (!formValue.distance) {
            errors.distance = t("submitPlanet.distanceRequired");
        }
        if (!formValue.diameter) {
            errors.diametr = t("submitPlanet.diameterRequired");
        }
        if (!formValue.name) {
            errors.name = t("submitPlanet.yourNameRequired");
        }
        return errors;
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        setFormError(validationForm(formValue));
        setSubmit(true);
    };

    function isInputLetter(evt) {
        let ch = String.fromCharCode(evt.which);
        if (!(/[a-zA-Z]/.test(ch) || evt.keyCode === 8)) {
            evt.preventDefault();
        }
    }

    return (
        <div className="main">
            <h3>{t("submitPlanet.info")}</h3>
            <div className="planet-submit">
                <form onSubmit={handlesubmit}>
                    <input
                        type="text"
                        name="planetName"
                        placeholder={t("submitPlanet.planetName")}
                        value={formValue.planetName}
                        onChange={handlevalidation} />
                    <span>{formError.planetName}</span>
                    <select className="select"
                        name="galaxy"
                        onChange={handlevalidation}
                        value={formValue.galaxy}>
                        <optgroup className=".optgroup">
                            <option disabled="">{t("submitPlanet.galaxyName")}</option>
                            <option value="Milky Way">Milky Way</option>
                            <option value="Messier 83">Messier 83</option>
                            <option value="Black Eye Galaxy">Black Eye Galaxy</option>
                            <option value="Pinwheel">Pinwheel</option>
                            <option value="Canis Major Dwarf">Canis Major Dwarf</option>
                            <option value="Somewhere else...">Somewhere else...</option>
                        </optgroup>

                    </select>
                    <span>{formError.galaxy}</span>
                    <input
                        type="number"
                        name="diameter"
                        min={0}
                        placeholder={t("submitPlanet.diameter")}
                        value={formValue.diameter}
                        onChange={handlevalidation}
                    />
                    <span>{formError.diameter}</span>
                    <input
                        type="number"
                        min={0}
                        name="distance"
                        placeholder={t("submitPlanet.distance")}
                        value={formValue.distance}
                        onChange={handlevalidation}
                    />
                    <span>{formError.distance}</span>
                    <input
                        type="text"
                        name="name"
                        onKeyDown={isInputLetter}
                        placeholder={t("submitPlanet.yourName")}
                        value={formValue.name}
                        onChange={handlevalidation}
                    />
                    <span>{formError.name}</span>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formValue.email}
                        onChange={handlevalidation}
                    />
                    <span>{formError.email}</span>
                    <button className="button">{t("submitPlanet.submit")}</button>
                </form>
            </div>
        </div>
    )

}