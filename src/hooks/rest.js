import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL

export const useRest = (path) => {

    const handleResponse = ({ data }) => {
        return data
    }

    return {
        list: (params) => axios.get(
            BASE_URL + path,
            { params }
        ).then(handleResponse),
        save: (item) => axios.post(
            BASE_URL + path,
            item
        ).then(handleResponse),
        nextId: () => axios.get(
            BASE_URL + path + '/nextId'
        ).then(handleResponse),
        del: (params) => axios.delete(
            BASE_URL + path,
            { params }
        ).then(handleResponse)
    }
}