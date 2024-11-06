import axios from 'axios';

const apiFake = axios.create({
    baseURL: 'https://api.escuelajs.co/api/v1', // Replace with your API base URL
    headers: { 'Content-Type': 'application/json' }
});

module.exports = apiFake;