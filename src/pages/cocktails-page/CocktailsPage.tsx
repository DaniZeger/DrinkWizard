import { useState, useEffect } from "react"
import { cocktailsApi } from "../../api/cocktailsApi"
import AddDataButton from "../../components/buttons/add-data-button/AddDataButton"
import MainHeader from "../../components/main-header/MainHeader"
import { COCKTAIL } from "../../types/CocktailType"
import CocktailCard from "./cocktail-card/CocktailCard"
import './CocktailsPage.scss'

const bgImage = "https://img.freepik.com/premium-photo/selection-three-kinds-gin-tonic-with-blackberries-with-orange-with-lime-mint-leaves-glasses-rustic-wooden-background_136595-9609.jpg?w=1380"

const headerProps = {
    image: bgImage,
    colorOverly: 'rgba(0,0,0,1) 2%, rgba(0,0,0,0) 100%',
    bgPosition: 'top 70% center'
}

function CocktailsPage() {
    const [cocktails, setCocktails] = useState<COCKTAIL[]>([])

    useEffect(() => {
        cocktailsApi.getCocktails()
            .then(json => {
                setCocktails(json)
            })
    }, [])


    return (
        <>
            <MainHeader
                title="Cocktails."
                background={headerProps}
            />
            <AddDataButton target="cocktails" action="Add Cocktail" />
            <section className="cocktails-page">
                <div className='cocktails-page__container'>
                    {
                        cocktails.map((cocktail, index) =>
                            <CocktailCard
                                key={index}
                                title={cocktail?.title as string}
                                description={cocktail.description as string}
                                imgUrl={cocktail.imageUrl as string}
                                imgAlt={cocktail.imageAlt as string}
                                ingredients={cocktail.ingredients ? cocktail.ingredients : []}
                                id={cocktail._id as string}
                            />
                        )
                    }
                </div>

            </section>
        </>
    );
}

export default CocktailsPage;