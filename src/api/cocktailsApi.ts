import { COCKTAIL } from '../types/CocktailType'
import { getAll, getOne, postData, putData, deleteData } from './api'

const endpoint = 'cocktails'

export const cocktailsApi = {
    getCocktails: () => getAll<COCKTAIL>(endpoint),
    getCocktailById: (id: string) => getOne<COCKTAIL>(id, endpoint),
    addCocktail: (cocktail: COCKTAIL) => postData<COCKTAIL>(cocktail, endpoint),
    editCocktail: (id: string, cocktail: COCKTAIL) => putData<COCKTAIL>(id, cocktail, endpoint),
    deleteCocktail: (id: string) => deleteData<COCKTAIL>(id, endpoint)
}