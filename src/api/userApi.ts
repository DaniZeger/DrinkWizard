import axios from "axios"
import { USER } from "../types/UserType"
import { getAll, postData } from "./api"
import { URL, contentType } from "./apiHeaders"

const endpoint = 'users'

export const userApi = {
    getUsers: () => getAll<USER>(endpoint),

    logIn: (user: USER) => postData<USER>(user, `${endpoint}/log-in`),

    signUp: async (user: USER): Promise<USER> => {
        const data = await axios({
            method: 'POST',
            url: `${URL}users/sign-up`,
            headers: contentType,
            data: user
        })
        if (data.status === 400) {
            throw new Error('User already registered.')
        }
        return data.data
    }

}