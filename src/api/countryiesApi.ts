import axios from "axios"

export interface COUNTRIES_TYPE {
    name: string,
    dial_code: string,
    code: string
}

export async function getCountries() {
    const data = await axios({
        method: 'GET',
        url: `https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json`,
        responseType: "json"
    })
    return data.data
}
