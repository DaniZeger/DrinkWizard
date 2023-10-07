export type AREA = "Doesn't Matter" | "Bar" | "Outside" | "Inside"

export interface RESERVATION {
    fullName: string,
    country_code?: string,
    phone: string,
    email?: string,
    numberOfPeople: number,
    area: AREA,
    date: Date,
    time: string
}