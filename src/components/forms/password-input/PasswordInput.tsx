import { useState } from "react";
import useWindowWidth from "../../../hooks/useWindowWidth";

interface PasswordInputProps {
    value: string,
    setValue: Function
    error: string
}

function PasswordInput({ value, setValue, error }: PasswordInputProps) {
    const width = useWindowWidth()
    const [showPassword, setShowPassword] = useState(false);

    function handleClickShowPassword(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        setShowPassword((show) => !show)
    }

    return (
        <div className="d-flex flex-column mx-2">
            <div>
                <label
                    style={{ color: '#D9AE89' }}
                    htmlFor="inputPassword"
                    className="form-label"
                >
                    Password <span style={{ color: 'red' }}> * </span>:
                </label>
            </div>
            <div className={width > 700 ? "d-flex align-items-center" : ''}>
                <input
                    style={{ width: width > 700 ? '50%' : '100%' }}
                    type={showPassword ? 'text' : 'password'}
                    id="inputPassword" className="form-control me-3"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <button
                    onClick={handleClickShowPassword}
                    style={{ fontSize: '25px' }}
                    className="p-0 btn btn-sm text-white"
                >
                    <i className={`bi bi-eye-${showPassword ? 'slash-' : ''}fill`}></i>
                </button>
                <small className="mx-3" style={{ color: '#D9AE89', fontSize: '12px' }}>
                    Must be 8-15 characters long.
                </small>
            </div>
            <small className="text-danger">{error}</small>
        </div>
    );
}

export default PasswordInput;