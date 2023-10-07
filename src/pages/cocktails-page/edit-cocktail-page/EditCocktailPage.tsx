import { Tooltip } from "@mui/material"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import { cocktailsApi } from "../../../api/cocktailsApi"
import FormsButtons from "../../../components/forms/form-buttons/FormButtons"
import FormInput from "../../../components/forms/form-input/FormInput"
import FormLayout from "../../../components/forms/form-layout/FormLayout"
import FormTextarea from "../../../components/forms/form-textarea/FormTextarea"
import MainHeader from "../../../components/main-header/MainHeader"
import { formsRequireValidate } from "../../../helpers/Validateion"
import { COCKTAIL, INGREDIENT } from "../../../types/CocktailType"
import { headerProps } from "../add-cocktail-page/AddCocktailPage"
import './EditCocktailPage.scss'

function EditCocktailPage() {
    const navigation = useNavigate()
    const { id } = useParams()
    const [cocktail, setCocktail] = useState<COCKTAIL>()
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState('')
    const [description, setDescription] = useState('')
    const [imagUrl, setImagUrl] = useState('')
    const [imageAlt, setImageAlt] = useState('')
    const [ingredients, setIngredients] = useState<INGREDIENT[]>([])
    const [ingredientsError, setIngredientsError] = useState('')
    const [amount, setAmount] = useState('')
    const [ingredient, setIngredient] = useState('')
    const [ingredientError, setIngredientError] = useState('')
    const [garnish, setGarnish] = useState('')
    const [preparation, setPreparation] = useState('')
    const [preparationError, setPreparationError] = useState('')
    const [message, setMessage] = useState('')


    useEffect(() => {
        if (!id) return
        cocktailsApi.getCocktailById(id)
            .then(json => {
                setCocktail(json)
            })
            .catch(err => {
                console.log(err.message);
                if (err.response && err.response.status > 404) {
                    navigation('/404')
                }
            })
    }, [])

    useEffect(() => {
        console.log(cocktail);

        setTitle(cocktail?.title as string)
        setDescription(cocktail?.description as string)
        setImagUrl(cocktail?.imageUrl as string)
        setImageAlt(cocktail?.imageAlt as string)
        setIngredients(cocktail?.ingredients ? cocktail.ingredients : [])
        setGarnish(cocktail?.garnish as string)
        setPreparation(cocktail?.preparation as string)
    }, [cocktail])

    const handleAddIngredient = () => {
        if (ingredient === "") {
            setIngredientError('This is require')
        } else {
            const newIngredient = {
                amount: amount,
                ingredient: ingredient
            }
            setIngredients([...ingredients, newIngredient])

            setAmount('')
            setIngredient('')
            setIngredientError('')
        }
    };

    const handleRemoveIngredient = (index: number) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };

    const newCocktail: COCKTAIL = {
        title: title,
        description: description,
        imageUrl: imagUrl,
        imageAlt: imageAlt,
        ingredients: ingredients,
        preparation: preparation,
        garnish: garnish
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault()
        if (!formsRequireValidate(title)) {
            setTitleError('Title is required')
            return
        }
        if (!formsRequireValidate(preparation)) {
            setPreparationError('Please fill preparation')
            return
        }
        if (ingredients.length === 0) {
            setIngredientsError('You need to insert at least 1 ingredient')
            return
        }

        setTitleError('')
        setPreparationError('')
        setIngredientsError('')

        if (!id) return
        cocktailsApi.editCocktail(id, newCocktail)
            .then(() => {
                toast.success('Cocktail data updated successfully', {
                    onClose: () => {
                        setTimeout(() => {
                            navigation(`/cocktail/${id}`)
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
        setTitle('')
        setDescription('')
        setImagUrl('')
        setImageAlt('')
        setIngredients([])
        setGarnish('')
        setPreparation('')
    }

    return (
        <>
            <MainHeader
                title="Add Cocktail."
                background={headerProps}
            />

            <FormLayout
                onReset={handleReset}
                onSubmit={handleSubmit}
            >

                <FormInput
                    color="black"
                    label="title"
                    labelTitle="Title"
                    placeHolder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    width="100%"
                    error={titleError}
                    require
                />

                <FormTextarea
                    value={description}
                    setValue={setDescription}
                />

                <FormInput
                    width='100%'
                    color='black'
                    label='imagUrl'
                    labelTitle='Main image url'
                    value={imagUrl}
                    onChange={(e) => setImagUrl(e.target.value)}
                    placeHolder='Main image url'
                />
                <FormInput
                    width='100%'
                    color='black'
                    label='imageAlt'
                    labelTitle='Main image alt'
                    value={imageAlt}
                    onChange={(e) => setImageAlt(e.target.value)}
                    placeHolder='Main image alt'
                />

                <div className="edit-cocktail-page__ingredients">
                    <p className="edit-cocktail-page__ingredients__title">Ingredients:</p>
                    <div className="d-flex">
                        <FormInput
                            width='20%'
                            color='black'
                            label='amount'
                            labelTitle='Amount'
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeHolder='Amount'
                        />
                        <FormInput
                            width='75%'
                            color='black'
                            label='ingredient'
                            labelTitle='Ingredient Name'
                            value={ingredient}
                            onChange={(e) => setIngredient(e.target.value)}
                            placeHolder='Ingredient Name'
                            error={ingredientError}
                            require
                        />
                    </div>
                    <button
                        onClick={handleAddIngredient}
                        type="button"
                        style={{ height: '30px' }}
                        className="btn custom-button-outline edit-cocktail-page__ingredients__button">
                        Add Ingredient
                    </button>
                    <p className="text-danger ms-2">{ingredientsError}</p>
                    <ul className="list-group list-group-flush ms-2">
                        {
                            ingredients.map((ingredient, index) =>
                                <li className="list-group-item py-0 me-5">
                                    <i className="bi bi-dot"></i>
                                    <strong className="me-2">{ingredient.amount}</strong>
                                    {ingredient.ingredient}
                                    <Tooltip
                                        arrow
                                        title='Remove'
                                    >
                                        <button
                                            onClick={() => handleRemoveIngredient(index)}
                                            className="btn text-danger"
                                        >
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </Tooltip>
                                </li>
                            )
                        }

                    </ul>
                </div>

                <FormInput
                    width='100%'
                    color='black'
                    label='garnish'
                    labelTitle='Garnish'
                    value={garnish}
                    onChange={(e) => setGarnish(e.target.value)}
                    placeHolder='Garnish'
                />

                <FormTextarea
                    value={preparation}
                    setValue={setPreparation}
                    labelTitle="Preparation"
                    error={preparationError}
                    require
                />

                <p className="text-danger">{message}</p>
                <FormsButtons
                    cancelTarget="/cocktails"
                    textAction="Update Cocktail"
                />
            </FormLayout>
        </>
    );
}

export default EditCocktailPage;