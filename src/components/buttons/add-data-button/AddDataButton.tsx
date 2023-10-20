import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../../App";
import './AddDataButton.scss'

interface AddDataButtonProps {
    target: string
    action: string
    addUser?: boolean
    isAdminPage?: boolean
}

function AddDataButton({
    target,
    action,
    addUser,
    isAdminPage
}: AddDataButtonProps) {
    const context = useContext(userContext)
    const navigation = useNavigate()

    function onNavigate() {
        navigation(!addUser ? `/${target}/add` : '/sign-up')
    }

    return (
        <>
            {
                context?.user?.isAdmin &&
                <div className={`add-data-warper${isAdminPage ? '--admin' : ''}`}>
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