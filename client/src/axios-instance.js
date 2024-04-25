import axios from 'axios';
export const instance = axios.create({
    Headers: {Authorization: JSON.parse(localStorage.getItem("token"))}
});