import useWindowWidth from "../../../hooks/useWindowWidth";
import './AboutPageCard.scss'

interface AboutPageCardProps {
    title: string,
    text: string,
    imageSrc: string,
    imageAlt: string,
    imageWidth: number
}

function AboutPageCard({
    title,
    text,
    imageAlt,
    imageSrc,
    imageWidth
}: AboutPageCardProps) {
    const width = useWindowWidth()

    return (
        <>
            <section className="about-section">
                <div className='px-3'>
                    <h4 className="about-section__title">{title}</h4>
                    <p className="about-section__text">
                        {text}
                    </p>
                </div>
                {
                    width > 700 &&
                    <div className='px-3'>
                        <img src={imageSrc} alt={imageAlt} width={imageWidth} />
                    </div>
                }
            </section >
        </>
    );
}

export default AboutPageCard;