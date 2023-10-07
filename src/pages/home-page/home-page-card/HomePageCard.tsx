import { useNavigate } from 'react-router-dom';
import './HomePageCard.scss'

interface HomePageCardProps {
    imageUrl: string,
    imageAlt: string,
    imageHeight?: number,
    title: string
    target: string
}

function HomePageCard({
    imageUrl,
    imageAlt,
    imageHeight = 130,
    title,
    target
}: HomePageCardProps) {
    const navigation = useNavigate()

    function onNavigate() {
        navigation(`/${target}`)
    }
    return (
        <>
            <div className="home-page-card" onClick={onNavigate}>
                <img
                    src={imageUrl}
                    alt={imageAlt}
                    height={imageHeight}
                />
                <h1 className="home-page-card__title">
                    {title.toUpperCase()}
                </h1>
            </div>
        </>
    );
}

export default HomePageCard;