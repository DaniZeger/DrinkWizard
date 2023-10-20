import { Tooltip } from "@mui/material"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../../../App"
import DialogComponent from "../../dialog-component/DialogComponenent"
import './EditDataButtons.scss'

interface EditDataButtonsProps {
    target: string,
    data: string
    onDelete: (id: string) => void,
    id?: string,
    isAdminPage?: boolean
}

function EditDataButtons({ target, data, onDelete, id, isAdminPage }: EditDataButtonsProps) {
    const [openAlert, setOpenAlert] = useState(false)
    const context = useContext(userContext)
    const navigation = useNavigate()

    function closeAlert() {
        setOpenAlert(false)
    }

    function onNavigate() {
        navigation(`/${target}/edit`)
    }

    function handleDelete() {
        if (id) {
            onDelete(id)
            setOpenAlert(false)
        }
    }
    return (
        <>
            {
                context?.user?.isAdmin &&
                <>
                    <div className={`edit-data-buttons${isAdminPage ? '--admin' : ''}`}>
                        <Tooltip
                            arrow
                            title={`Edit ${data}`}
                        >
                            <button
                                onClick={onNavigate}
                                className="btn custom-button-fill"
                            >
                                <i className="bi bi-pencil-square"></i>
                            </button>
                        </Tooltip>
                        <Tooltip
                            arrow
                            title={`Delete ${data}`}
                        >
                            <button
                                onClick={() => setOpenAlert(true)}
                                className="btn custom-button-fill"
                            >
                                <i className="bi bi-trash-fill"></i>
                            </button>
                        </Tooltip>
                    </div>
                    <DialogComponent
                        title="Are you sure you want to continue?"
                        text={<p>This action is permanently <br /> without an option to restore it.</p>}
                        open={openAlert}
                        handleClose={closeAlert}
                        handleClick={handleDelete}
                        id={id ? id : ''}
                        action="AGREE"
                    />
                </>

            }
        </>
    );
}

export default EditDataButtons;