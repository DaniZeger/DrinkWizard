import { NavLink } from "react-router-dom";
import { useDefaultImageUrl } from "../../../hooks/useDefaultImage";
import { useEffect } from "react";

interface Props {
    title: string,
    subtitle: string,
    imageUrl: string,
    imageAlt: string,
    date: string,
    id: string
}

function PostCard({ title, subtitle, imageUrl, imageAlt, date, id }: Props) {
    const { getDefaultImageUrl, setCustomImageUrl } = useDefaultImageUrl();

    useEffect(() => {
        setCustomImageUrl(imageUrl)
    }, [])

    return (
        <div className="card rounded-0" style={{ maxWidth: "540px" }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={getDefaultImageUrl()} style={{ height: '100%' }} className="img-fluid" alt={imageAlt} />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 style={{ color: '#59220E' }} className="card-title">{title.toUpperCase()}</h5>
                        <p className="card-text">{subtitle}.</p>
                        <p className="card-text" ><small style={{ color: '#BF6836' }}>Created at: {date}</small>  </p>
                        <NavLink style={{ color: '#59220E' }} to={`/post/${id}`}>Read more...</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostCard;