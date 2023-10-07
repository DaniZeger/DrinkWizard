interface FormTextareaProps {
    labelTitle?: string
    value: string,
    setValue: Function,
    require?: boolean,
    error?: string
}

function FormTextarea({
    labelTitle = 'Description',
    value,
    setValue,
    require,
    error
}: FormTextareaProps) {
    const requireUi = <span className="text-danger"> * </span>
    const label = labelTitle.toLowerCase().replace(" ", "_")

    return (
        <div style={{ width: '100%' }} className="mb-3 mx-2">
            <label style={{ color: 'black' }} htmlFor={label} className="form-label">
                {labelTitle} {require && requireUi} :
            </label>
            <textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="form-control"
                id={label}
                rows={3}>
            </textarea>
            <small className="text-danger">{error}</small>
        </div>
    );
}

export default FormTextarea;