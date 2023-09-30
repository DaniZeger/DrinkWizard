import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../App";
import FormsButtons from "../../components/forms/form-buttons/FormButtons";
import FormInput from "../../components/forms/form-input/FormInput";
import PasswordInput from "../../components/forms/password-input/PasswordInput";
import MainHeader from "../../components/main-header/MainHeader";
import useWindowWidth from "../../hooks/useWindowWidth";
import './LoginPage.scss'
import { toast } from "react-toastify";
import { setToken } from "../../auth/TokenManeger";
import { formsMailValidate, formsPasswordValidate } from "../../helpers/Validateion";
import { userApi } from "../../api/userApi";

const bgImage = "https://img.freepik.com/free-photo/front-view-cocktail-shaker-with-orange-shot-glass_23-2148454372.jpg?w=1380&t=st=1691182220~exp=1691182820~hmac=77f5ecf11e09a5fe6f9c9c86d7a49eceb6805b796649974693a67d9a2e2a6b2d"

const headerProps = {
    image: bgImage,
    colorOverly: 'rgba(0,0,0,1) 2%, rgba(0,0,0,0) 100%',
    bgPosition: 'center'
}

function LoginPage() {
    const width = useWindowWidth()
    const navigation = useNavigate()
    const user = useContext(userContext)
    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [message, setMessage] = useState('')

    function onLogIn(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        if (!formsMailValidate(email) || !formsPasswordValidate(password)) {
            if (!formsMailValidate(email)) {
                setEmailError('Please enter a validate email')
            }
            if (!formsPasswordValidate(password)) {
                setPasswordError('Password must be between 8 to 15 characters')
            }
            return
        }
        setEmailError('')
        setPasswordError('')

        userApi.logIn({ email, password })
            .then((json) => {
                setToken(json.token)
                user?.setUser(json)
                toast.success(`Welcome back ${json.firstName} ${json.lastName}`, {
                    onClose: () => {
                        setTimeout(() => {
                            navigation('/')
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
        setEmail('')
        setPassword('')
    }

    return (

        <>
            <MainHeader
                background={headerProps}
                title="Log in."
            />

            <section className="log-in">
                <form
                    className="log-in__form"
                    style={{ width: width > 700 ? '40%' : '97%' }}
                    onReset={handleReset}
                    onSubmit={onLogIn}
                >
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
                    <PasswordInput
                        value={password}
                        setValue={setPassword}
                        error={passwordError}
                    />

                    <FormsButtons
                        cancelTarget="/"
                        textAction="Log In"
                    />

                </form>
            </section>
        </>
    );
}

export default LoginPage;