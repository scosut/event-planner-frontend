import { type Dancer } from './type';

export const getDancer = (
    assigned: Dancer[],
    tableNum: number,
    seatNum: number,
) => {
    return (
        assigned.find(
            (dancer) => dancer.table === tableNum && dancer.seat === seatNum,
        ) ?? {
            _id: null,
            firstName: null,
            lastName: null,
            table: null,
            seat: null,
        }
    );
};

export const getRange = (amount: number) => {
    return [...Array(amount).keys()].map((i) => i + 1);
};

export const chunkData = (data: Dancer[], chunkSize: number) => {
    const arr = [];

    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        arr.push(chunk);
    }

    return arr;
};

export const slowFetch = async (fetchFn: Function) => {
    const [data] = await Promise.all([
        fetchFn(),
        new Promise((resolve) => setTimeout(resolve, 500)),
    ]);
    return data;
};
