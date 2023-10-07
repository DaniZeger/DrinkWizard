import axios from 'axios'
import { BAR } from '../types/BarType'
import { getAll, getOne, postData, putData, deleteData } from './api'
import { contentType, URL } from './apiHeaders'

const endpoint = 'bars'

export const barsApi = {
    getBars: () => getAll<BAR>(endpoint),
    getBarById: (id: string) => getOne<BAR>(id, endpoint),
    addBar: (bar: BAR) => postData<BAR>(bar, endpoint),
    editBar: (id: string, bar: BAR) => putData<BAR>(id, bar, endpoint),
    deleteBar: (id: string) => deleteData<BAR>(id, endpoint),

    reteBar: async (id: string, val: string,): Promise<BAR> => {
        const data = await axios({
            method: 'POST',
            url: `${URL}bars/rate/${id}`,
            headers: contentType,
            data: val
        })

        return data.data

    }
}