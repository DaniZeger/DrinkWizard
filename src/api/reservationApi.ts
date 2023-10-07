import { RESERVATION } from "../types/ReservationType"
import { postData } from "./api"

const endpoint = 'reservations'

export const reservationApi = {
    addReservation: (reservation: RESERVATION) => postData<RESERVATION>(reservation, endpoint)
}