import axios from 'axios';
import { type Dancer } from '../type';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchDancers = async (): Promise<Dancer[]> => {
    const res = await api.get('/dancers');
    return res.data;
};

export const fetchDancer = async (
    dancerId: string | undefined,
): Promise<Dancer> => {
    const res = await api.get(`/dancers/${dancerId}`);
    return res.data;
};

export const addDancer = async (dancer: Dancer): Promise<Dancer> => {
    const res = await api.post('/dancers', dancer);
    return res.data;
};

export const updateDancer = async (dancer: Dancer): Promise<Dancer> => {
    const res = await api.patch(`/dancers/${dancer._id}`, dancer);
    return res.data;
};

export const deleteDancer = async (dancer: Dancer): Promise<void> => {
    await api.delete(`/dancers/${dancer._id}`);
};

export const assignSeat = async ({
    id,
    table,
    seat,
}: {
    id: string;
    table: number;
    seat: number;
}): Promise<Dancer> => {
    const res = await api.patch(`/dancers/${id}/assign`, { id, table, seat });
    return res.data;
};

export const unassignSeat = async ({ id }: { id: string }): Promise<Dancer> => {
    const res = await api.patch(`/dancers/${id}/unassign`, { id });
    return res.data;
};
