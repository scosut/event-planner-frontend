import type { SubmitHandler } from 'react-hook-form';

export type Dancer = {
    _id?: string | null;
    firstName: string | null;
    lastName: string | null;
    table?: number | null;
    seat?: number | null;
};

export type FormProps = {
    caption: string;
    heading: string;
    instructions: string;
    dancer?: Dancer;
    submitForm: SubmitHandler<FormData>;
};

export type SeatingProps = {
    selection: Dancer | null;
    assigned: Dancer[] | [];
    unassigned: Dancer[] | [];
};

export type FormData = {
    firstName: string;
    lastName: string;
};
