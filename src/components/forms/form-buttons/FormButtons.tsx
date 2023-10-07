import { useNavigate } from "react-router-dom";
import '../../../styles/_buttons.scss'

interface FormsButtonsProps {
    textAction: string
    cancelTarget: string
}

function FormsButtons({ textAction, cancelTarget }: FormsButtonsProps) {
    const navigation = useNavigate()

    function handleCancel() {
        navigation(cancelTarget)
    }

    return (
        <div className="mx-2">
            <div className="mt-4">
                <button
                    type="submit"
                    className="btn w-100 submit-button">
                    {textAction}
                </button>
            </div>
            <div className="mt-4 d-flex justify-content-between">
                <button
                    onClick={handleCancel}
                    style={{ width: '48%' }}
                    className="btn custom-button-outline"
                >
                    Cancel
                </button>
                <button
                    type="reset"
                    style={{ width: '48%' }}
                    className="btn custom-button-outline"
                >
                    <i className="bi bi-arrow-clockwise"></i>
                </button>
            </div>
        </div>
    );
}

export default FormsButtons;