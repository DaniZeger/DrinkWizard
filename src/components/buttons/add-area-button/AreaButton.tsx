interface Props {
    val: string,
    setArea: Function
    area: string
}

function AreaButton({ val, area, setArea }: Props) {
    return (
        <button
            style={{ color: area === val ? '#BF6836' : 'white' }}
            type="button"
            className="btn m-2"
            onClick={() => setArea(val)}
        >
            {val}
        </button>
    );
}

export default AreaButton;