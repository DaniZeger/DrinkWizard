import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import CountryCodeSelect from "../../../components/forms/country-code-select/CountryCodeSelcet"
import trash from '../../../img/trash3-fill.svg'
import FormsButtons from "../../../components/forms/form-buttons/FormButtons"
import FormInput from "../../../components/forms/form-input/FormInput"
import FormLayout from "../../../components/forms/form-layout/FormLayout"
import FormTextarea from "../../../components/forms/form-textarea/FormTextarea"
import MainHeader from "../../../components/main-header/MainHeader"
import { formsRequireValidate } from "../../../helpers/Validateion"
import useWindowWidth from "../../../hooks/useWindowWidth"
import { GALLERY } from "../../../types/BarType"
import { barsApi } from "../../../api/barsApit"


const bgImage = "https://img.freepik.com/free-photo/single-glass-dry-martini-restaurat-wooden-table-luxury-vintage-interior_482257-19889.jpg?w=1380&t=st=1691832431~exp=1691833031~hmac=47771c25b765752cddd4e4e64b0748c5c534c98c10ce5f5d82cbdd77e8acc99e"

export const headerProps = {
    image: bgImage,
    colorOverly: 'rgba(255,255,255,1) 2%, rgba(255,255,255,0) 100%',
    bgPosition: 'center'
}

function AddBarPage() {
    const width = useWindowWidth()
    const navigation = useNavigate()
    const [barName, setBarName] = useState('')
    const [barNameError, setBarNameError] = useState('')
    const [description, setDescription] = useState('')
    const [countryCode, setCountryCode] = useState('')
    const [countryCodeError, setCountryCodeError] = useState('')
    const [phone, setPhone] = useState('')
    const [phoneError, setPhoneError] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [addressError, setAddressError] = useState('')
    const [website, setWebsite] = useState('')
    const [mainImageUrl, setMainImageUrl] = useState('')
    const [mainImageAlt, setMainImageAlt] = useState('')
    const [gallery, setGallery] = useState<Array<GALLERY>>([])
    const [galleryImageUrl, setGalleryImageUrl] = useState('')
    const [galleryImageAlt, setGalleryImageAlt] = useState('')
    const [galleryImageAltError, setGalleryImageAltError] = useState('')
    const [message, setMessage] = useState('')

    const handleAddImage = () => {
        if (galleryImageUrl !== "" && galleryImageAlt !== "") {
            if (galleryImageAlt === "") {
                setGalleryImageAltError('Please add text to this image')
            } else {
                const newImage = {
                    imageUrl: galleryImageUrl,
                    imageAlt: galleryImageAlt
                }
                setGallery([...gallery, newImage])

                setGalleryImageUrl('')
                setGalleryImageAlt('')
            }
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...gallery];
        updatedImages.splice(index, 1);
        setGallery(updatedImages);
    };

    const newBar = {
        barName: barName,
        description: description,
        country_code: countryCode,
        phone: phone,
        email: email,
        address: address,
        website: website,
        mainImageUrl: mainImageUrl,
        mainImageAlt: mainImageAlt,
        gallery: gallery
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        if (!formsRequireValidate(barName)) {
            setBarNameError('Name is required')
            return
        }
        if (!formsRequireValidate(countryCode) || !formsRequireValidate(phone)) {
            setCountryCodeError('Phone is required')
            setPhoneError('Phone is required')
            return
        }
        if (!formsRequireValidate(address)) {
            setAddressError('Address is required')
            return
        }

        setBarNameError('')
        setCountryCodeError('')
        setPhoneError('')
        setAddressError('')

        barsApi.addBar(newBar)
            .then(() => {
                toast.success('Bar data upload successfully', {
                    onClose: () => {
                        setTimeout(() => {
                            navigation('/bars')
                        }, 3000)
                    }
                })
            })
            .catch((err) => {
                setMessage(err.message)
                toast.error(message)
                return
            })
    }

    function handleReset() {
        setBarName('')
        setDescription('')
        setCountryCode('')
        setPhone('')
        setEmail('')
        setWebsite('')
        setMainImageUrl('')
        setMainImageAlt('')
        setGallery([])
        setGalleryImageUrl('')
        setGalleryImageAlt('')
    }
    return (
        <>
            <MainHeader
                title="Add Bar"
                background={headerProps}
            />

            <FormLayout
                onReset={handleReset}
                onSubmit={handleSubmit}
            >
                <FormInput
                    color="black"
                    label="name"
                    labelTitle="Bar Name"
                    placeHolder="Bar Name"
                    value={barName}
                    onChange={(e) => setBarName(e.target.value)}
                    width="100%"
                    error={barNameError}
                    require
                />
                <FormTextarea
                    value={description}
                    setValue={setDescription}
                />
                <div className={`w-100 d-flex justify-content-between`}>
                    <CountryCodeSelect
                        color="black"
                        error={countryCodeError}
                        value={countryCode}
                        setValue={setCountryCode}
                        require
                    />
                    <FormInput
                        width={width > 700 ? '175%' : '98%'}
                        color="black"
                        label="phone"
                        labelTitle="Phone"
                        placeHolder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={phoneError}
                        require
                    />
                </div>
                <FormInput
                    color="black"
                    label="email"
                    labelTitle="Email"
                    placeHolder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    width="100%"
                />
                <FormInput
                    color="black"
                    label="address"
                    labelTitle="Address"
                    placeHolder="Some street 00, City, Country, zip"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    width="100%"
                    error={addressError}
                    require
                />
                <FormInput
                    color="black"
                    label="website"
                    labelTitle="Website"
                    placeHolder="Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    width="100%"
                />
                <FormInput
                    width='100%'
                    color='black'
                    label='mainImageUrl'
                    labelTitle='Main image url'
                    value={mainImageUrl}
                    onChange={(e) => setMainImageUrl(e.target.value)}
                    placeHolder='Main image url'
                />
                <FormInput
                    width='100%'
                    color='black'
                    label='mainImageAlt'
                    labelTitle='Main image alt'
                    value={mainImageAlt}
                    onChange={(e) => setMainImageAlt(e.target.value)}
                    placeHolder='Main image alt'
                />

                <div className="ms-2" style={{ border: '1px solid #D98841' }}>
                    <p className="text-decoration-underline m-2">Gallery Images:</p>

                    <FormInput
                        width='98%'
                        color='black'
                        label='imageUrl'
                        labelTitle='Gallery image url'
                        value={galleryImageUrl}
                        onChange={(e) => setGalleryImageUrl(e.target.value)}
                        placeHolder='Gallery image url'
                    />
                    <FormInput
                        width='98%'
                        color='black'
                        label='imageAlt'
                        labelTitle='Gallery image alt'
                        value={galleryImageAlt}
                        onChange={(e) => setGalleryImageAlt(e.target.value)}
                        placeHolder='Gallery image alt'
                        error={galleryImageAltError}
                    />
                    <button
                        onClick={handleAddImage}
                        type="button"
                        className="btn custom-btn-outline m-2 py-0">
                        Add image
                    </button>
                    <div className="ms-2 d-flex flex-wrap">
                        {
                            gallery.map((img, index) =>
                                <img
                                    style={{ cursor: `url(${trash}), auto` }}
                                    onClick={() => handleRemoveImage(index)}
                                    src={img.imageUrl}
                                    width={200}
                                    className="img-thumbnail"
                                    alt={img.imageUrl}
                                    key={index}
                                />
                            )
                        }

                    </div>
                    <small className="ms-2 text-secondary" >*Click on image to remove</small>
                </div>
                <p className="text-danger">{message}</p>
                <FormsButtons
                    cancelTarget="/bars"
                    textAction="Add Bar"
                />
            </FormLayout>

        </>
    );
}

export default AddBarPage;