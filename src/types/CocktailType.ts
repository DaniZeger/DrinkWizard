export interface INGREDIENT {
    _id?: string,
    ingredient: string,
    amount: string
}

export interface COCKTAIL {
    _id?: string
    title?: string,
    description?: string,
    imageUrl?: string,
    imageAlt?: string,
    ingredients?: INGREDIENT[],
    preparation?: string,
    garnish: string,
    created_at?: Date
}