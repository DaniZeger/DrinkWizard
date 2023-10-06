import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../App";
import './AddDataButton.scss'

interface AddDataButtonProps {
    target: string
    action: string
}

function AddDataButton({ target, action }: AddDataButtonProps) {
    const context = useContext(userContext)
    const navigation = useNavigate()

    function onNavigate() {
        navigation(`/${target}/add`)
    }

    return (
        <>
            {
                context?.user?.isAdmin &&
                <div className="add-data-warper">
                    <button
                        onClick={onNavigate}
                        className="btn custom-button-outline"
                    >
                        {action}
                    </button>
                </div>
            }
        </>
    );
}

export default AddDataButton;