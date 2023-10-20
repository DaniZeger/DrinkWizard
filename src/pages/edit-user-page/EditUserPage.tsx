import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useWindowWidth from "../../hooks/useWindowWidth"
import { USER } from "../../types/UserType"
import FormsButtons from "../../components/forms/form-buttons/FormButtons"
import FormInput from "../../components/forms/form-input/FormInput"
import PasswordInput from "../../components/forms/password-input/PasswordInput"
import MainHeader from "../../components/main-header/MainHeader"
import CountryCodeSelect from "../../components/forms/country-code-select/CountryCodeSelcet"
import { toast } from "react-toastify"
import { formsLengthValidate, formsMailValidate, formsPasswordValidate } from "../../helpers/Validateion"
import { userApi } from "../../api/userApi"
import { userContext } from "../../App"


const bgImage = "https://img.freepik.com/free-photo/cocktail-celebration-martini-lemon-lime-whiskey-tequila-generative-ai_188544-12371.jpg?w=1380&t=st=1691166384~exp=1691166984~hmac=aa0d6b199dcad4f628c1ec1ac4710ab3c6fb2d70a9166da8265a84c891b586cf"

const headerProps = {
    image: bgImage,
    colorOverly: 'rgba(0,0,0,1) 2%, rgba(0,0,0,0) 100%',
    bgPosition: 'center'
}

function EditUserPage() {
    const { id } = useParams()
    const context = useContext(userContext)
    const navigation = useNavigate()
    const width = useWindowWidth()
    const [user, setUser] = useState<USER>()
    const [firstName, setFirstName] = useState("")
    const [firstNameError, setFirstNameError] = useState("")
    const [lastName, setLastName] = useState("")
    const [lastNameError, setLastNameError] = useState("")
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (!id) return
        userApi.getUserById(id)
            .then(json => setUser(json))
            .catch(err => {
                console.log(err.message);
                if (err.response && err.response.status > 399) {
                    navigation('/404')
                }
            })
    }, [])

    useEffect(() => {
        setFirstName(user?.firstName as string)
        setLastName(user?.lastName as string)
        setEmail(user?.email as string)
        setCountryCode(user?.country_code as string)
        setPhone(user?.phone as string)
        setAddress(user?.address as string)
        setPassword(user?.password as string)
        setIsAdmin(user?.isAdmin ? user.isAdmin : false)
    }, [user])


    const newUser: USER = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        country_code: countryCode,
        phone: phone,
        address: address,
        password: password,
        isAdmin: isAdmin
    }


    function onEdit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        if (!formsLengthValidate(firstName) || !formsLengthValidate(lastName) || !formsMailValidate(email)) {
            if (!formsLengthValidate(firstName)) {
                setFirstNameError('First name must be longer then 2 characters')
            }
            if (!formsLengthValidate(lastName)) {
                setLastNameError('Last name must be longer then 2 characters')
            }
            if (!formsMailValidate(email)) {
                setEmailError('Please enter a validate email')
            }
            return
        }

        setFirstNameError('')
        setLastNameError('')
        setEmailError('')

        if (!id) return
        userApi.editUser(id, newUser)
            .then(() => {
                toast.success('User updated successfully', {
                    onClose: () => {
                        setTimeout(() => {
                            navigation('/admin')
                        }, 3000)
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
        setFirstName('')
        setLastName('')
        setEmail('')
        setCountryCode('')
        setPhone('')
        setAddress('')
        setPassword('')
    }

    return (
        <>
            <MainHeader
                background={headerProps}
                title="Edit User"
            />
            <section className="sign-up">
                <form
                    onReset={handleReset}
                    onSubmit={onEdit}
                    className="sign-up__form"
                    style={{ width: width > 700 ? '40%' : '97%' }}
                >
                    <div className={`w-100 ${width > 700 ? "d-flex justify-content-between" : ''}`}>
                        <FormInput
                            width="100%"
                            color="#ffc592"
                            label="firstName"
                            labelTitle="First Name"
                            placeHolder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            error={firstNameError}
                            require
                        />
                        <FormInput
                            width="100%"
                            color="#ffc592"
                            label="lastName"
                            labelTitle="Last Name"
                            placeHolder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            error={lastNameError}
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
                        error={emailError}
                        require
                    />
                    <div className={`w-100 d-flex justify-content-between`}>
                        <CountryCodeSelect
                            color="#ffc592"
                            error=""
                            value={countryCode}
                            setValue={setCountryCode}
                        />
                        <FormInput
                            width={width > 700 ? '175%' : '98%'}
                            color="#ffc592"
                            label="phone"
                            labelTitle="Phone"
                            placeHolder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <FormInput
                        color="#ffc592"
                        label="address"
                        placeHolder="Some street 00, City, Country, zip"
                        labelTitle="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        width="97%"
                    />

                    {
                        context.user && context.user.isAdmin &&
                        <div className="form-check sign-up__checkbox">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={isAdmin}
                                onChange={() => setIsAdmin(!isAdmin)}
                                id="SetAdmin" />
                            <label
                                className="form-check-label"
                                htmlFor="SetAdmin">
                                Set as admin
                            </label>
                        </div>
                    }

                    <FormsButtons
                        cancelTarget="/admin"
                        textAction="Save Changes"
                    />
                </form>

            </section>
        </>
    );
}

export default EditUserPage;