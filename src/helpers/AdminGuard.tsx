import { ReactNode, useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../App";

interface Props {
    children: ReactNode
}

function AdminGuard({ children }: Props) {
    const user = useContext(userContext)
    function isNotAdmin(): boolean {
        return !user?.user?.isAdmin || false
    }

    return isNotAdmin() ? (
        <Navigate
            to="/"
            replace={true}
        />
    ) : (
        <>{children}</>
    );
}

export default AdminGuard;