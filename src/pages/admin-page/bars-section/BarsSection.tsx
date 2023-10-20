import { useEffect, useState } from "react";
import { BAR } from "../../../types/BarType";
import { barsApi } from "../../../api/barsApit";
import AccordionHeader from "../accordion-header/AccordionHeader";
import ItemHeader from "../accordion-item/ItemHeader";
import AccordionItem from "../accordion-item/AccordionItem";
import AccordionTable from "../accordion-item/AccordionTable";
import VisitPageButton from "../../../components/buttons/visit-page-button/VisitPageButton";
import EditDataButtons from "../../../components/buttons/edit-data-buttons/EditDataButtons";

function BarSection() {
    const [bars, setBars] = useState<BAR[]>()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        barsApi.getBars()
            .then(json => setBars(json))
    }, [])

    function deleteBar(id: string) {
        barsApi.deleteBar(id)
            .then(() =>
                barsApi.getBars()
                    .then(json => setBars(json))
            )
    }
    return (
        <>
            <AccordionHeader
                collectionName='Bars'
                collectionLength={bars ? bars.length : 0}
                handleOpen={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
            />

            {
                isOpen &&
                <div className="bars-section">
                    <ItemHeader>
                        <li style={{ width: '3%' }}>#</li>
                        <li style={{ width: '20%' }}>Name</li>
                        <li style={{ width: '15%' }}>Phone</li>
                        <li style={{ width: '15%' }}>Email</li>
                        <li style={{ width: '20%' }}>Address</li>
                        <li style={{ width: '12.5%', textAlign: 'center' }}>Actions</li>
                    </ItemHeader>
                    <AccordionItem>
                        {
                            isOpen &&
                            bars?.map((bar, index) =>
                                <AccordionTable>
                                    <li style={{ width: '3%' }}>{index + 1}</li>
                                    <li style={{ width: '20%' }}>
                                        {bar.barName}
                                        <VisitPageButton
                                            id={bar._id ? bar._id : ''}
                                            target='bar'
                                        />
                                    </li>
                                    <li style={{ width: '15%' }}>{bar.country_code} {' '} {bar.phone}</li>
                                    <li style={{ width: '15%' }}>{bar.email}</li>
                                    <li style={{ width: '20%' }}>{bar.address}</li>
                                    <li style={{ width: '12.5%', textAlign: 'center' }}>
                                        <EditDataButtons
                                            isAdminPage
                                            data='post'
                                            target={bar?._id ? `bar/${bar._id}` : '/404'}
                                            id={bar._id}
                                            onDelete={deleteBar}
                                        />
                                    </li>
                                </AccordionTable>
                            )
                        }
                    </AccordionItem>

                </div>
            }
        </>
    );
}

export default BarSection;