import { useState, useEffect } from "react"
import { } from "../../api/postsApi"
import { defaultImageUrl } from "../../helpers/Validateion"
import AddDataButton from "../../components/buttons/add-data-button/AddDataButton"
import MainHeader from "../../components/main-header/MainHeader"
import { BAR } from "../../types/BarType"
import { barsApi } from "../../api/barsApit"
import BarCard from "./bar-card/BarCard"
import './BarsPage.scss'

const bgImage = "https://img.freepik.com/free-photo/bartender-making-delicious-cocktail_23-2149093594.jpg?w=1380&t=st=1691527129~exp=1691527729~hmac=7ab90785f782e623e89aefdd95ee2e83fd25092f5463047ae3ba7345c4405300"

const headerProps = {
    image: bgImage,
    colorOverly: 'rgba(0,0,0,1) 2%, rgba(0,0,0,0) 100%',
    bgPosition: 'top 70% center'
}

function BarsPage() {
    const [barsList, setBarsList] = useState<Array<BAR>>([])

    useEffect(() => {
        barsApi.getBars()
            .then(json => {
                setBarsList(json)
            })
    }, [])

    return (
        <>
            <MainHeader
                title="Bars"
                background={headerProps}
            />
            <AddDataButton target="bars" action="Add Bar" />

            <section className='bars-page__section'>
                {
                    barsList.map(bar =>
                        <BarCard
                            name={bar.barName ? bar.barName?.toUpperCase() : ''}
                            description={bar.description ? bar.description : 'This bar has no description :('}
                            imageUrl={defaultImageUrl(bar.mainImageUrl ? bar.mainImageUrl : '')}
                            imageAlt={bar.mainImageAlt ? bar.mainImageAlt : 'No image'}
                            rating={bar.rating ? bar.rating : []}
                            ratingLength={bar.rating ? bar.rating?.length : 0}
                            id={bar._id ? bar._id : ''}
                        />
                    )
                }

            </section>
        </>

    );
}

export default BarsPage;