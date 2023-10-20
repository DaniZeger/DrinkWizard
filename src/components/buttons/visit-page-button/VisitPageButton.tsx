import { NavLink } from "react-router-dom";
import './VisitPageButton.scss'

interface VisitPageButtonProps {
    target: string,
    id: string
}

function VisitPageButton({ id, target }: VisitPageButtonProps) {
    return (
        <NavLink
            className='visit-page'
            to={`/${target}/${id}`}
            title={`Visit ${target}`}
            target="_blank"
        >
            <i className="bi bi-box-arrow-up-right"></i>
        </NavLink>
    );
}

export default VisitPageButton;