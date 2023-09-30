import { useEffect, useState } from "react";
import { getCountries } from "../../../api/countryiesApi";

interface Props {
    value: string,
    setValue: Function,
    error?: string,
    color: 'black' | '#ffc592'
    require?: boolean
}

function CountryCodeSelect({ value, setValue, error, color, require }: Props) {
    const [countries, setCountries] = useState<Array<any>>([])
    const requireUi = <span className="text-danger"> * </span>

    useEffect(() => {
        getCountries()
            .then(json =>
                setCountries(json)
            )
    })

    return (
        <div className="d-flex flex-column ms-2">
            <label
                style={{ color: color }}
                htmlFor='countryCode'
                className="form-label"
            >
                Code {require && requireUi} :
            </label>
            <select
                className="form-select"
                id="countryCode"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            >
                <option>+000</option>
                {
                    countries.map((cc, index) =>
                        <option
                            key={index}
                            value={cc.dial_code}>
                            {cc.name} | {cc.dial_code}
                        </option>
                    )
                }
            </select>
            <small className="text-danger">{error}</small>
        </div>
    )
}

export default CountryCodeSelect;