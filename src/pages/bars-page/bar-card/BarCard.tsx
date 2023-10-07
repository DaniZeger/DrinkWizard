import { useNavigate } from "react-router-dom";
import useAverageCalculator from "../../../hooks/useAverageCalculator";
import useRatingIcon from "../../../hooks/useRatingIcon";
import { useDefaultImageUrl } from "../../../hooks/useDefaultImage";
import { useEffect } from "react";
import '../../../styles/_buttons.scss'

interface BarCardProps {
    name: string,
    description: string,
    imageUrl: string,
    imageAlt: string,
    rating: number[],
    ratingLength: number,
    id: string
}

function BarCard({
    name,
    description,
    imageUrl,
    imageAlt,
    rating,
    ratingLength,
    id
}: BarCardProps) {
    const { numbers, calculateAverage } = useAverageCalculator(rating)
    const ratingIcon = useRatingIcon(+calculateAverage())
    const { getDefaultImageUrl, setCustomImageUrl } = useDefaultImageUrl();
    const navigation = useNavigate()

    function onClick(id: string) {
        navigation(`/bar/${id}`)
    }

    useEffect(() => {
        setCustomImageUrl(imageUrl)
    }, [])


    return (
        <div className="card" style={{ width: "18rem" }}>
            <img src={getDefaultImageUrl()} className="card-img-top" alt={imageAlt ? imageAlt : 'No Image'} />
            <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text">
                    <small style={{ color: '#BF6836' }}>
                        Rating: {calculateAverage()} &nbsp;
                        <i className={`bi bi-emoji-${ratingIcon}`}></i>
                        <span className={ratingLength > 0 ? '' : 'text-danger'} style={{ fontSize: '11px' }}>
                            &nbsp; {ratingLength} votes
                        </span>
                    </small>
                </p>
                <button onClick={() => onClick(id)} className="btn custom-button-fill">Visit Bar</button>
            </div>
        </div>
    );
}

export default BarCard;