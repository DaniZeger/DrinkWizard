export interface GALLERY {
    _id?: string,
    imageUrl: string,
    imageAlt: string
}

export interface BAR {
    _id?: string,
    barName?: string,
    description?: string,
    country_code?: string,
    phone?: string,
    email?: string,
    address?: string,
    website?: string,
    mainImageUrl?: string,
    mainImageAlt?: string,
    gallery?: GALLERY[]
    rating?: number[],
    averageRating?: number
    created_at?: Date
}