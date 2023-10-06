import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import { ReactNode } from "react";

interface DialogComponentProps {
    handleClick: (id: string) => void;
    handleClose: () => void;
    id?: string;
    open: boolean,
    children?: ReactNode
    title: string,
    text?: ReactNode,
    action: string
}

function DialogComponent({
    handleClose,
    handleClick,
    id,
    open,
    children,
    title,
    text,
    action
}: DialogComponentProps) {

    function onClick() {
        if (id) {
            handleClick(id)
        }
    }

    const onClose = () => {
        handleClose()
    };
    return (<>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            {children}
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="error" onClick={onClick} autoFocus>
                    {action}
                </Button>
            </DialogActions>
        </Dialog>
    </>);
}

export default DialogComponent;