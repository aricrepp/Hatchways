import axios from 'axios';

export const axiosCall = () => {
    return axios.create({
        baseURL: 'https://api.hatchways.io/assessment/students'
    });
};