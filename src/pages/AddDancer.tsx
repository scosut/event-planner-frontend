import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { addDancer } from '../api/dancers';
import { type Dancer, type FormData } from '../type';
import Form from '../components/Form';

const AddDancer = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: addDancer,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dancers'],
            });
            navigate('/dancers');
        },
    });

    const submitForm = async (data: FormData) => {
        const dancer: Dancer = {
            firstName: data.firstName,
            lastName: data.lastName,
        };
        mutate(dancer);
    };

    return (
        <Form
            caption="Add"
            heading="Add"
            instructions="enter a new"
            submitForm={submitForm}
        />
    );
};

export default AddDancer;
