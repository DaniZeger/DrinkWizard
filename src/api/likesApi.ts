import axios from "axios"
import { URL, contentType } from './apiHeaders'
import { USER } from "../types/UserType"

export const likesApi = {
    likePost: async (userId: string, postId: string): Promise<USER> => {
        const data = await axios({
            method: 'POST',
            url: `${URL}user-likes/user/${userId}/post/${postId}/like`,
            headers: contentType,
            data: {
                user_id: userId,
                post_id: postId
            }
        })

        return data.data
    },

    unlikePost: async (userId: string, postId: string): Promise<USER> => {
        const data = await axios({
            method: 'POST',
            url: `${URL}user-likes/user/${userId}/post/${postId}/unlike`,
            headers: contentType,
            data: {
                user_id: userId,
                post_id: postId
            }
        })

        return data.data
    }
}