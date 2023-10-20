import { useEffect, useState } from "react";
import { cocktailsApi } from "../../../api/cocktailsApi";
import { COCKTAIL } from "../../../types/CocktailType";
import AccordionHeader from "../accordion-header/AccordionHeader";
import ItemHeader from "../accordion-item/ItemHeader";
import AccordionItem from "../accordion-item/AccordionItem";
import AccordionTable from "../accordion-item/AccordionTable";
import VisitPageButton from "../../../components/buttons/visit-page-button/VisitPageButton";
import EditDataButtons from "../../../components/buttons/edit-data-buttons/EditDataButtons";
import { formatDate } from "../../../helpers/Formatter";

function CocktailsSection() {
    const [cocktails, setCocktails] = useState<COCKTAIL[]>()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        cocktailsApi.getCocktails()
            .then(json => setCocktails(json))
    }, [])

    function deleteCocktail(id: string) {
        cocktailsApi.deleteCocktail(id)
            .then(json =>
                cocktailsApi.getCocktails()
                    .then(json => setCocktails(json))
            )
    }

    return (
        <>
            <AccordionHeader
                collectionName='Cocktails'
                collectionLength={cocktails ? cocktails.length : 0}
                handleOpen={() => setIsOpen(!isOpen)}
                isOpen={isOpen}
            />
            {
                isOpen &&
                <div className="cocktails-section">
                    <ItemHeader>
                        <li style={{ width: '3%' }}>#</li>
                        <li style={{ width: '50%' }}>Title</li>
                        <li style={{ width: '17.25%' }}>Ingredients</li>
                        <li style={{ width: '17.25%' }}>Created at</li>
                        <li style={{ width: '12.5%', textAlign: 'center' }}>Actions</li>
                    </ItemHeader>
                    <AccordionItem>
                        {
                            cocktails &&
                            cocktails.map((cocktail, index) =>
                                <AccordionTable>
                                    <li style={{ width: '3%' }}>{index + 1}</li>
                                    <li style={{ width: '57%' }}>
                                        {cocktail.title}
                                        <VisitPageButton
                                            id={cocktail._id ? cocktail._id : ''}
                                            target='post'
                                        />
                                    </li>
                                    <li style={{ width: '17.25%' }}>{cocktail.ingredients?.length}</li>
                                    <li style={{ width: '17.25%' }}>{formatDate(cocktail.created_at)}</li>

                                    <li style={{ width: '12.5%', textAlign: 'center' }}>
                                        <EditDataButtons
                                            isAdminPage
                                            data='cocktail'
                                            target={cocktail?._id ? `cocktail/${cocktail._id}` : '/404'}
                                            id={cocktail._id}
                                            onDelete={deleteCocktail}
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

export default CocktailsSection;