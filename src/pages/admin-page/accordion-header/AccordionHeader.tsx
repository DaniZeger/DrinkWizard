import AddDataButton from "../../../components/buttons/add-data-button/AddDataButton";
import './AccordionHeader.scss'

interface AccordionHeaderProps {
    collectionName: string,
    handleOpen: () => void,
    isOpen: boolean,
    collectionLength: number,
}

function AccordionHeader({ collectionName, handleOpen, isOpen, collectionLength }: AccordionHeaderProps) {

    return (
        <ul className="accordion-header">
            <li
                onClick={handleOpen}
                style={{ width: '5%' }}
            >
                <i className={`bi bi-caret-${isOpen ? 'up' : 'down'}-fill`}></i>
            </li>
            <li style={{ width: '40%' }}>{collectionName}</li>
            <li style={{ width: '40%' }}>{collectionLength}</li>
            <li style={{ width: '15%' }}>
                <AddDataButton
                    isAdminPage
                    action="Add Data"
                    target={collectionName === 'Posts' ? 'blog' : collectionName.toLowerCase()}
                    addUser={collectionName === 'Users' ? true : false}
                />
            </li>
        </ul>
    );
}

export default AccordionHeader;