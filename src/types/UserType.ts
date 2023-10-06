export interface USER {
    _id?: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    country_code?: string,
    phone?: string,
    address?: string,
    liked_posts?: {
        _id: string,
        title: string,
        subtitle: string
    }
    isAdmin?: boolean,
    password?: string,
    created_at?: Date,
    token?: string
}