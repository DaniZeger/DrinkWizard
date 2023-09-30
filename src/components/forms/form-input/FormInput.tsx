interface FormInputProps {
    label: string,
    labelTitle: string
    placeHolder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    require?: boolean
    color: 'black' | '#ffc592'
    width: string
    error?: string
}

function FormInput({
    label,
    placeHolder,
    value,
    onChange,
    require,
    labelTitle,
    color,
    width,
    error
}: FormInputProps) {
    const requireUi = <span className="text-danger"> * </span>
    return (
        <div
            style={{ width: width }}
            className="mb-3 mx-2"
        >
            <label
                style={{ color: color }}
                htmlFor={label}
                className="form-label"
            >
                {labelTitle} {require && requireUi}:
            </label>
            <input
                onChange={onChange}
                value={value}
                type="text"
                className={`form-control ${error && error?.length > 0 ? 'is-invalid' : ''}`}
                id={label}
                placeholder={placeHolder}
            />
            <small
                className="text-danger"
            >
                {error}
            </small>
        </div>
    );
}

export default FormInput;