import axios, { AxiosResponse } from 'axios';
import { URL, contentType } from './apiHeaders'

async function getAll<T>(endpoint: string): Promise<T[]> {
    const response: AxiosResponse<T[]> = await axios.get(`${URL}${endpoint}`, {
        responseType: 'json',
    });

    return response.data;
}

async function getOne<T>(id: string, endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.get(`${URL}${endpoint}/${id}`, {
        responseType: 'json',
    });

    return response.data;
}

async function postData<T>(data: T, endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.post(
        `${URL}${endpoint}`,
        data,
        {
            headers: contentType
        }
    )

    return response.data
}

async function putData<T>(id: string, data: T, endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.put(
        `${URL}${endpoint}/${id}`,
        data,
        {
            headers: contentType
        }
    )

    return response.data
}

async function deleteData<T>(id: string, endpoint: string): Promise<T> {
    const response: AxiosResponse<T> = await axios.delete(
        `${URL}${endpoint}/${id}`,
        {
            headers: contentType
        }
    )

    return response.data
}

export { getAll, getOne, postData, putData, deleteData }