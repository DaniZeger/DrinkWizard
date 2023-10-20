import { ReactNode } from "react";
import './AccordionItem.scss'

interface AccordionTableProps {
    children: ReactNode
}

function AccordionTable({ children }: AccordionTableProps) {
    return (
        <ul className='accordion-item__table'>
            {children}
        </ul>
    );
}

export default AccordionTable;