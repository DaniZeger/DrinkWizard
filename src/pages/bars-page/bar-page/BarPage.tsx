import { ImageList, ImageListItem } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import useAverageCalculator from "../../../hooks/useAverageCalculator"
import useRatingIcon from "../../../hooks/useRatingIcon"
import useWindowWidth from "../../../hooks/useWindowWidth"
import { BAR } from "../../../types/BarType"
import EditDataButtons from "../../../components/buttons/edit-data-buttons/EditDataButtons"
import { barsApi } from "../../../api/barsApit"
import './BarPage.scss'
import { useDefaultImageUrl } from "../../../hooks/useDefaultImage"

function BarPage() {
    const navigation = useNavigate()
    const width = useWindowWidth()
    const { id } = useParams()
    const [bar, setBar] = useState<BAR>()
    const { numbers, calculateAverage } = useAverageCalculator(bar?.rating ? bar.rating : [])
    const ratingIcon = useRatingIcon(+calculateAverage())
    const [rate, setRate] = useState(0)
    const [afterRate, setAfterRate] = useState(false)
    const { getDefaultImageUrl, setCustomImageUrl } = useDefaultImageUrl();

    const sectionBg = `linear-gradient(0deg, rgba(0,0,0,1) 2%, rgba(0,0,0,0.72) 50%, rgba(0,0,0,1) 98%), url(${bar?.mainImageUrl})`

    function handleOpenImage(url: string) {
        window.open(url, '_blank')
    }

    useEffect(() => {
        if (!id) return
        barsApi.getBarById(id)
            .then(json => {
                setBar(json)
                setCustomImageUrl(json.mainImageUrl as string)
            })
            .catch(err => {
                console.log(err.message);
                if (err.response && err.response.status === 404) {
                    navigation('/404')
                }
            })
    }, [])

    function handleRateValue(val: number) {
        setRate(val)

    }

    let data = JSON.stringify({
        "rating": rate
    });

    function handleRateSubmit() {
        if (!id) return
        barsApi.reteBar(id, data)
            .then(() => {
                setAfterRate(true)
                barsApi.getBarById(id)
                    .then(json => {
                        setBar(json)
                    })
            })
    }

    function onDelete(id: string) {
        barsApi.deleteBar(id)
            .then(() => {
                toast.success('Bar data deleted successfully', {
                    onClose: () => {
                        setTimeout(() => {
                            navigation(`/bars`)
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
        <div className="bar-page">
            <header className="bar-page__header">
                {
                    width > 700 &&
                    <div className="bar-page__header__image">
                        <img width={width > 900 ? 450 : 250} src={getDefaultImageUrl()} alt={bar?.mainImageAlt ? bar?.mainImageAlt : 'No image'} />
                    </div>
                }
                <div className="ms-5">
                    <h1 className="bar-page__header__title">{bar?.barName?.toUpperCase()}</h1>
                    <h4 className="bar-page__header__text">{bar?.description}</h4>
                    {
                        bar?.rating &&
                        <p style={{ color: '#BF6836' }}>
                            Rating: {calculateAverage()} &nbsp;
                            <i className={`bi bi-emoji-${ratingIcon}`}></i>
                            <span className={bar.rating.length > 0 ? '' : 'text-danger'} style={{ fontSize: '11px' }}>
                                &nbsp; {bar.rating.length} votes
                            </span>
                        </p>
                    }
                    <button
                        onClick={() => navigation('/reservations/add')}
                        className="btn custom-button-fill"
                    >
                        Book a Table Now <i className="bi bi-caret-right-fill"></i>
                    </button>
                </div>
                <div style={{ alignSelf: 'flex-start' }}>
                    <EditDataButtons
                        onDelete={onDelete}
                        id={id}
                        data="bar"
                        target={bar?._id ? `bar/${bar?._id}` : '/404'}
                    />
                </div>
            </header>
            <section className="bar-page__section" style={{ backgroundImage: sectionBg }}>
                <div className="bar-page__section__container">
                    <ul className="bar-page__section__details">
                        <li className="my-3">
                            <i className="bi bi-geo-alt-fill me-4"></i>
                            {bar?.address}
                        </li>
                        <li className="my-3">
                            <a
                                aria-disabled={width > 650}
                                style={{ color: 'white', textDecoration: 'none' }}
                                href={`tel:${bar?.country_code}${bar?.phone}`}>
                                <i className="bi bi-telephone-fill me-4"></i>
                                {bar?.country_code} {bar?.phone}
                            </a>
                        </li>
                        <li className="my-3">
                            <i className="bi bi-box-arrow-up-left me-4"></i>
                            {
                                bar?.website &&
                                <a style={{ color: 'white' }} href={bar?.website} target="_blank">
                                    {bar.website}
                                </a>
                            }
                            {
                                !bar?.website &&
                                <span>N/A</span>
                            }
                        </li>
                        <li className="my-3">
                            <i className="bi bi-envelope-fill me-4"></i>
                            {
                                bar?.email &&
                                <a style={{ color: 'white' }} href={`mailto:${bar.email}`} target="_blank">
                                    {bar.email}
                                </a>
                            }
                            {
                                !bar?.email &&
                                <span>N/A</span>
                            }
                        </li>
                    </ul>
                    {
                        bar?.gallery && bar?.gallery?.length > 0 &&
                        <ImageList sx={{ width: 500, height: bar.gallery.length > 6 ? 450 : 225 }} cols={3} rowHeight={164}>
                            {bar.gallery.map((image, index) => (
                                <ImageListItem key={index}>
                                    <img
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleOpenImage(image.imageUrl)}
                                        src={`${image.imageUrl}?w=164&h=164&fit=crop&auto=format`}
                                        srcSet={`${image.imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                        alt={image.imageAlt}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    }
                </div>
                <div className="bar-page__section__rating">
                    {
                        !afterRate &&
                        <>
                            <h2 className="bar-page__section__rating__title">Have you been there? we would like it if you'll rate it</h2>
                            <ul className="bar-page__section__rating__emojis">
                                <li
                                    onClick={() => handleRateValue(1)}
                                    className="mx-3">
                                    <i style={{ color: rate === 1 ? '#D98841' : 'white' }} className="bi bi-emoji-angry"></i>
                                </li>
                                <li
                                    onClick={() => handleRateValue(2)}
                                    className="mx-3">
                                    <i style={{ color: rate === 2 ? '#D98841' : 'white' }} className="bi bi-emoji-frown"></i>
                                </li>
                                <li
                                    onClick={() => handleRateValue(3)}
                                    className="mx-3">
                                    <i style={{ color: rate === 3 ? '#D98841' : 'white' }} className="bi bi-emoji-neutral"></i>
                                </li>
                                <li
                                    onClick={() => handleRateValue(4)}
                                    className="mx-3">
                                    <i style={{ color: rate === 4 ? '#D98841' : 'white' }} className="bi bi-emoji-smile"></i>
                                </li>
                                <li
                                    onClick={() => handleRateValue(5)}
                                    className="mx-3">
                                    <i style={{ color: rate === 5 ? '#D98841' : 'white' }} className="bi bi-emoji-laughing"></i>
                                </li>
                            </ul>
                            <button onClick={handleRateSubmit} className="btn custom-button-fill">Rate</button>
                        </>
                    }
                    {
                        afterRate &&
                        <h2 className="bar-page__section__rating__title">Thanks for rating!</h2>
                    }
                </div>
            </section>
        </div>
    );
}

export default BarPage;