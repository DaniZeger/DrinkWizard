import { ReactNode } from "react";
import './AccordionItem.scss'

interface ItemHeaderProps {
    children: ReactNode
}

function ItemHeader({ children }: ItemHeaderProps) {
    return (
        <ul className="accordion-item__header">
            {children}
        </ul>
    );
}

export default ItemHeader;