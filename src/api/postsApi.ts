import { getAll, getOne, postData, putData, deleteData } from './api'
import { POST } from '../types/PostType'

const endpoint = 'posts'

export const postsApi = {
    getPosts: () => getAll<POST>(endpoint),
    getPostById: (id: string) => getOne<POST>(id, endpoint),
    addPost: (post: POST) => postData<POST>(post, endpoint),
    editPost: (id: string, post: POST) => putData<POST>(id, post, endpoint),
    deletePost: (id: string) => deleteData<POST>(id, endpoint),
    likeDislike: (id: string, like: number, dislike: number) => {
        const endpoint = `posts/like-dislike`;
        const data = {
            likes: like,
            dislikes: dislike
        };
        return putData<POST>(id, data, endpoint)
    }
}