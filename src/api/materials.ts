import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchCards = async (): Promise<ArrayBuffer> => {
    const res = await api.get('/materials/cards', {
        responseType: 'arraybuffer',
    });
    return res.data;
};

export const fetchChart = async (): Promise<ArrayBuffer> => {
    const res = await api.get('/materials/chart', {
        responseType: 'arraybuffer',
    });
    return res.data;
};

export const fetchTents = async (): Promise<ArrayBuffer> => {
    const res = await api.get('/materials/tents', {
        responseType: 'arraybuffer',
    });
    return res.data;
};
