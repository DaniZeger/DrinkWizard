import cocktailPic from '../../img/cocktail (1).png'
import barDrawn from '../../img/bar100.png'
import favIcon from '../../img/fav.png'
import Logo from "../../components/logo/Logo";
import HomePageCard from "./home-page-card/HomePageCard";
import './HomePage.scss'
import useWindowWidth from '../../hooks/useWindowWidth';

function HomePage() {
    const width = useWindowWidth()
    return (
        <>
            <div className="home-page">
                <header className="home-page__header">
                    <Logo layout="horizontal" height={width > 700 ? '170px' : '100px'} />
                    <h1 className="home-page__header__title">Your Ultimate Cocktail Companion</h1>
                </header>
                <section className="home-page__section">
                    <h1 className="home-page__section__title">How would you like to start your day?</h1>
                    <div className='home-page__section__cards'>
                        <HomePageCard
                            imageUrl={favIcon}
                            imageAlt='Some image'
                            title='Read our cocktail blog'
                            imageHeight={90}
                            target='blog'
                        />
                        <HomePageCard
                            imageUrl={cocktailPic}
                            imageAlt='Some image'
                            title='Get some cocktail recipe'
                            target='cocktails'
                        />
                        <HomePageCard
                            imageUrl={barDrawn}
                            imageAlt='Some image'
                            title='Visit spacial bars'
                            target='bars'
                        />
                    </div>
                </section>
            </div>
        </>
    );
}

export default HomePage;