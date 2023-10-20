import { useContext, useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { userContext } from "../../../App"
import CountryCodeSelect from "../../../components/forms/country-code-select/CountryCodeSelcet"
import FormsButtons from "../../../components/forms/form-buttons/FormButtons"
import FormInput from "../../../components/forms/form-input/FormInput"
import MainHeader from "../../../components/main-header/MainHeader"
import { formsRequireValidate } from "../../../helpers/Validateion"
import useWindowWidth from "../../../hooks/useWindowWidth"
import { AREA, RESERVATION } from "../../../types/ReservationType"
import AreaButton from "../../../components/buttons/add-area-button/AreaButton"
import './AddReservationPage.scss'
import { reservationApi } from "../../../api/reservationApi"

const bgImage = "https://img.freepik.com/free-photo/medium-shot-happy-friends-with-beer-mugs_23-2148872451.jpg?w=1380&t=st=1692179622~exp=1692180222~hmac=e7d6950829e8e53fd4c0f1a593f5bc7cd19fb90eef8921342a31782dcafd81f4"

const headerProps = {
    image: bgImage,
    colorOverly: 'rgba(0,0,0,1) 5%, rgba(0,0,0,0.2) 96%',
    bgPosition: 'top 90% center'
}

function AddReservationPage() {
    const { barName } = useParams()
    const navigation = useNavigate()
    const user = useContext(userContext)
    const areaList = ["Doesn't Matter", "Bar", "Outside", "Inside"]
    const width = useWindowWidth()
    const [fullName, setFullName] = useState('')
    const [fullNameError, setFullNameError] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [countryCodeError, setCountryCodeError] = useState('')
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [email, setEmail] = useState('')
    const [numberOfPeople, setNumberOfPeople] = useState(0)
    const [numberOfPeopleError, setNumberOfPeopleError] = useState("")
    const [date, setDate] = useState("")
    const [dateError, setDateError] = useState("")
    const [hour, setHour] = useState("00")
    const [minutes, setMinutes] = useState("00")
    const [area, setArea] = useState<AREA>("Doesn't Matter")
    const [message, setMessage] = useState("")
    const [afterSubmit, setAfterSubmit] = useState(false)

    const registrationForm = {
        border: '3px solid var(--Wooden-desk-of-bar--1-hex)',
        width: width > 700 ? '40%' : '97%',
        margin: 'auto',
        padding: '2%',
        background: 'rgba(0, 0, 0, 0.5)'
    }

    useEffect(() => {
        if (user?.user) {
            setFullName(user.user.firstName + " " + user.user.lastName)
            setCountryCode(user.user.country_code || "")
            setPhone(user.user.phone || "")
            setEmail(user.user.email || "")
        }
    }, [])

    const newReservation: RESERVATION = {
        barName: barName as string,
        fullName: fullName,
        country_code: countryCode,
        phone: phone,
        email: email,
        numberOfPeople: numberOfPeople,
        area: area,
        date: new Date(date),
        time: `${hour} : ${minutes}`
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        if (!formsRequireValidate(fullName)) {
            setFullNameError('Name is required')
            return
        }
        if (!formsRequireValidate(countryCode) || !formsRequireValidate(phone)) {
            setCountryCodeError('Phone is required')
            setPhoneError('Phone is required')
            return
        }
        if (!formsRequireValidate(numberOfPeople.toString())) {
            setNumberOfPeopleError('How many would you be?')
            return
        }
        if (!formsRequireValidate(date)) {
            setDateError('When would you like to come?')
            return
        }

        setFullNameError('')
        setCountryCodeError('')
        setPhoneError('')

        reservationApi.addReservation(newReservation)
            .then(() => {
                toast.success('Reservation saved', {
                    onClose: () => {
                        setAfterSubmit(true)
                    }
                })
            })
            .catch((err) => {
                setMessage(err.message)
                toast.error(message)
                return
            })
    }

    function handleReset() {
        setFullName('')
        setCountryCode('')
        setPhone('')
        setEmail('')
        setNumberOfPeople(0)
        setDate('')
        setHour('')
        setMinutes('')
        setArea("Doesn't Matter")
    }

    return (
        <>
            <MainHeader
                title="Book a Table"
                background={headerProps}
            />
            <section className="add-reservation">
                {
                    !afterSubmit &&
                    <form
                        onSubmit={handleSubmit}
                        onReset={handleReset}
                        style={registrationForm}>
                        <FormInput
                            color="#ffc592"
                            label="fullName"
                            labelTitle="Full Name"
                            onChange={(e) => setFullName(e.target.value)}
                            placeHolder="Full Name"
                            value={fullName}
                            width="98%"
                            require
                            error={fullNameError}
                        />
                        <div className={`w-100 d-flex justify-content-between`}>
                            <CountryCodeSelect
                                color="#ffc592"
                                error={countryCodeError}
                                value={countryCode}
                                setValue={setCountryCode}
                                require
                            />
                            <FormInput
                                width={width > 700 ? '175%' : '98%'}
                                color="#ffc592"
                                label="phone"
                                labelTitle="Phone"
                                placeHolder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                error={phoneError}
                                require
                            />
                        </div>
                        <FormInput
                            color="#ffc592"
                            label="email"
                            placeHolder="Email"
                            labelTitle="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            width="97%"
                        />
                        <div className="add-reservation__details">
                            <div className="d-flex align-items-center mx-2">
                                <label
                                    htmlFor="numberOfPeople"
                                    className="form-label"
                                >
                                    <i className="bi bi-people-fill"></i>
                                    <span className="text-danger"> * </span>
                                </label>
                                <input
                                    style={{ width: "40px" }}
                                    onChange={(e) => setNumberOfPeople(+e.target.value)}
                                    value={+numberOfPeople}
                                    type="number"
                                    className="form-control form-control-sm ms-2"
                                    id="numberOfPeople"
                                />
                            </div>
                            <div className="d-flex align-items-center mx-2">
                                <label
                                    htmlFor="date"
                                    className="form-label"
                                >
                                    <i className="bi bi-calendar"></i>
                                    <span className="text-danger"> * </span>
                                </label>
                                <input
                                    style={{ width: "150px" }}
                                    onChange={(e) => setDate(e.target.value)}
                                    value={date}
                                    type="date"
                                    className="form-control form-control-sm ms-2"
                                    id="date"
                                />
                            </div>
                            <div className="d-flex align-items-center mx-2">
                                <label
                                    htmlFor="time"
                                    className="form-label"
                                >
                                    <i className="bi bi-clock-fill"></i>
                                    <span className="text-danger"> * </span>
                                </label>
                                <input
                                    style={{ width: "35px" }}
                                    onChange={(e) => setHour(e.target.value)}
                                    value={hour}
                                    type="text"
                                    className="form-control form-control-sm ms-2"
                                    id="time"
                                    placeholder="00"
                                />
                                <span style={{ color: "#ffc592" }}>
                                    &nbsp; :
                                </span>
                                <input
                                    style={{ width: "35px" }}
                                    onChange={(e) => setMinutes(e.target.value)}
                                    value={minutes}
                                    type="text"
                                    className="form-control form-control-sm ms-2"
                                    id="time"
                                    placeholder="00"
                                />
                            </div>
                        </div>
                        <div className="add-reservation__area">
                            <h5 className="add-reservation__area__label">
                                Select area<span className="text-danger"> * </span>
                            </h5>
                            {
                                areaList.map((ar, index) =>
                                    <AreaButton
                                        key={index}
                                        area={area}
                                        setArea={setArea}
                                        val={ar}
                                    />
                                )
                            }
                        </div>
                        <p className="text-danger">
                            {numberOfPeopleError}
                            {dateError}
                        </p>
                        <p className="text-danger">{message}</p>
                        <FormsButtons
                            cancelTarget="/bars"
                            textAction="Book Table"
                        />
                    </form>
                }
                {
                    afterSubmit &&
                    <>
                        <div className="add-reservation__submitted">
                            <h2 className="add-reservation__submitted__title">
                                Thank for your reservations. <br />
                                Soon you will get a message with all the details
                            </h2>
                            <button
                                type="button"
                                onClick={() => navigation('/bars')}
                                className="btn custom-button-fill add-reservation__submitted__button">
                                Back to Bars Page
                                <i className="ms-3 bi bi-arrow-right"></i>
                            </button>
                        </div>
                    </>
                }
            </section>
        </>
    );
}

export default AddReservationPage;