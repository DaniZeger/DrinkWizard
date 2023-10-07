import { useNavigate } from "react-router-dom";
import { INGREDIENT } from "../../../types/CocktailType";
import './CocktailCard.scss'
import { useDefaultImageUrl } from "../../../hooks/useDefaultImage";
import { useEffect } from "react";

interface CocktailCardProps {
    title: string,
    description: string,
    ingredients: INGREDIENT[],
    imgUrl: string,
    imgAlt: string
    id: string
}

function CocktailCard({
    title,
    description,
    ingredients,
    imgUrl,
    imgAlt,
    id
}: CocktailCardProps) {
    const navigation = useNavigate()
    const { getDefaultImageUrl, setCustomImageUrl } = useDefaultImageUrl();

    function onclick(id: string) {
        navigation(`/cocktail/${id}`)
    }

    useEffect(() => {
        setCustomImageUrl(imgUrl)
    }, [])

    const maxChar = 120
    return (
        <div className="cocktail-card">
            <img
                src={getDefaultImageUrl()}
                alt={imgAlt ? imgAlt : 'No Image'}
            />
            <div className="cocktail-card__content">
                <h4>{title.toUpperCase()}</h4>
                <p
                    style={{ color: '#D98841' }}
                >
                    Number of ingredients: {ingredients.length}
                </p>
                <p>{description.slice(0, maxChar)}... {' '}
                    <span
                        className="cocktail-card__link"
                        onClick={() => onclick(id)}
                    >
                        read more
                    </span>
                </p>
            </div>
        </div>
    );
}

export default CocktailCard;