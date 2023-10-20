import { ReactNode } from "react";
import './AccordionItem.scss'

interface AccordionItemProps {
    children: ReactNode
}

function AccordionItem({ children }: AccordionItemProps) {
    return (
        <div className="accordion-item__scroll">
            {children}
        </div>
    );
}

export default AccordionItem;