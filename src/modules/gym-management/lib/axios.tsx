import axios from 'axios';

const api = axios.create({
    baseURL: "https://netherita-gymnasium-service-d8hvgjameybudsh3.canadacentral-01.azurewebsites.net/api",
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;