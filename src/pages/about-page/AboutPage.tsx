import { useState, useEffect } from "react";
import { aboutPageSections } from "./AboutPageSections";
import useWindowWidth from "../../hooks/useWindowWidth";
import MainHeader from "../../components/main-header/MainHeader";
import AboutPageCard from "./about-page-card/AboutPageCard";
import Logo from "../../components/logo/Logo";
import './AboutPage.scss'

const bgImage = 'https://img.freepik.com/free-photo/blend-cocktail-glasses-with-ice-lime_23-2149384426.jpg?w=1380&t=st=1690825964~exp=1690826564~hmac=ca6ab59efe23744c3d54bbf3f2f383528a196f70b8af8b1d92ec9cb7fbfb0f4c'

const headerProps = {
    image: bgImage,
    colorOverly: 'rgba(0,0,0,1) 2%, rgba(0,0,0,0) 100%',
    bgPosition: 'top 80% center'
}

function AboutPage() {
    const content = aboutPageSections
    const width = useWindowWidth()

    return (
        <>
            <MainHeader
                background={headerProps}
                title="About Us." />
            <div className="about-page">
                <div
                    style={{ flexDirection: width > 700 ? 'row' : 'column-reverse' }}
                    className="about-page__header"
                >
                    <div className={width > 700 ? '' : 'about-page__header__title'}>
                        <h3>
                            Welcome to DrinkWizard - Your Ultimate Cocktail Companion
                        </h3>
                        <p className="about-page__header__text">
                            Are you a cocktail enthusiast searching for the perfect drink recipes, trendy bars, and the finest bar supplies? Look no further! DrinkWizard is the one-stop app for all things cocktail-related, catering to both seasoned mixologists and curious beginners alike.
                        </p>
                    </div>
                    <div>
                        <Logo
                            layout={width < 700 ? 'horizontal' : 'vertical'}
                            height={width > 700 ? "250px" : '150px'}
                        />
                    </div>
                </div>
            </div>
            <div className="about-page__section">
                {
                    content.map((section, index) =>
                        <AboutPageCard
                            key={index}
                            title={section.title}
                            text={section.text}
                            imageSrc={section.imageSrc}
                            imageAlt={section.imageAlt}
                            imageWidth={section.width}
                        />
                    )
                }
            </div>
            <h1 className="about-page__footer">
                Cheers to good times and great drinks!
            </h1>
        </>
    );
}

export default AboutPage;
