export interface POST {
    _id?: string,
    title?: string,
    subtitle?: string,
    text?: string | TrustedHTML,
    imageUrl?: string,
    imageAlt?: string,
    likes?: number,
    dislikes?: number,
    author?: string,
    created_at?: Date
    updated_at?: Date
}