import axios from "axios"
import { USER } from "../types/UserType"
import { deleteData, getAll, getOne, postData, putData } from "./api"
import { URL, contentType } from "./apiHeaders"

const endpoint = 'users'

export const userApi = {
    getUsers: () => getAll<USER>(endpoint),
    getUserById: (id: string) => getOne<USER>(id, endpoint),
    deleteUser: (id: string) => deleteData<USER>(id, endpoint),
    editUser: (id: string, user: USER) => putData(id, user, endpoint),

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