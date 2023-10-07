import { title } from "process";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { cocktailsApi } from "../../../api/cocktailsApi";
import { formatDate } from "../../../helpers/Formatter";
import { COCKTAIL } from "../../../types/CocktailType";
import EditDataButtons from "../../../components/buttons/edit-data-buttons/EditDataButtons";
import './CocktailPage.scss'
import { useDefaultImageUrl } from "../../../hooks/useDefaultImage";

function CocktailPage() {
    const navigation = useNavigate()
    const { id } = useParams()
    const [cocktail, setCocktail] = useState<COCKTAIL>()
    const { getDefaultImageUrl, setCustomImageUrl } = useDefaultImageUrl();

    useEffect(() => {
        if (!id) return
        cocktailsApi.getCocktailById(id)
            .then(json => {
                setCocktail(json)
                setCustomImageUrl(json.imageUrl as string)
            })
            .catch(err => {
                console.log(err.message);
                if (err.response && err.response.status > 399) {
                    navigation('/404')
                }
            })
    }, [])

    function onDelete(id: string) {
        if (!id) return
        cocktailsApi.deleteCocktail(id)
            .then(() => {
                toast.success('Cocktail data deleted successfully', {
                    onClose: () => {
                        setTimeout(() => {
                            navigation(`/cocktails`)
                        }, 3000)
                    }
                })
            })
            .catch((err) => {
                toast.error(err.message)
                return
            })
    }

    return (
        <>
            <div className="cocktail-page">
                <header className="cocktail-page__header">
                    <img
                        className="cocktail-page__header__image"
                        src={getDefaultImageUrl()}
                        alt={cocktail?.imageAlt ? cocktail?.imageAlt : 'No Image'}
                        width={350}
                    />
                    <div className="ms-3">
                        <div>
                            <h1 className="cocktail-page__header__title">
                                {cocktail?.title?.toUpperCase()}
                            </h1>
                            <EditDataButtons
                                data="cocktail"
                                onDelete={onDelete}
                                target={cocktail?._id ? `cocktail/${cocktail._id} ` : '/404'}
                                id={id}
                            />
                        </div>
                        <p>
                            {cocktail?.description}
                        </p>
                        <p style={{ color: '#D9AE89' }}>
                            Crated at: {formatDate(cocktail?.created_at)}
                        </p>
                    </div>
                </header>
                <section className="cocktail-page__section">

                    <ul className="list-group mx-2">
                        <li className="list-group-item fw-bold">
                            Ingredients:
                        </li>
                        {
                            cocktail?.ingredients?.map((ingredient, index) =>
                                <li className="list-group-item" key={index}>
                                    <strong>{ingredient.amount}</strong>
                                    {' '}
                                    <span>{ingredient.ingredient}</span>
                                </li>
                            )
                        }
                        <li className="list-group-item">
                            <strong>Garnish:</strong>
                            {' '}
                            {cocktail?.garnish}
                        </li>
                    </ul>
                    <p className="w-50 border border-1 rounded mx-2 p-3 my-0">
                        <strong> Preparation: </strong>
                        <br />
                        {cocktail?.preparation}
                    </p>
                </section>
            </div >
        </>
    );
}

export default CocktailPage;