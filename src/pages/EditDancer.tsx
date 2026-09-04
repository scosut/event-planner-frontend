import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import { fetchDancer, updateDancer } from '../api/dancers';
import { type Dancer, type FormData } from '../type';
import Form from '../components/Form';
import Spinner from '../components/Spinner';
import { slowFetch } from '../util';

const EditDancer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['dancer', id],
        queryFn: () => slowFetch(() => fetchDancer(id)),
    });

    const { mutate } = useMutation({
        mutationFn: updateDancer,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dancer', id],
            });
            queryClient.invalidateQueries({
                queryKey: ['dancers'],
            });
            navigate('/dancers');
        },
    });

    const submitForm = async (data: FormData) => {
        const dancer: Dancer = {
            _id: id,
            firstName: data.firstName,
            lastName: data.lastName,
        };
        mutate(dancer);
    };

    if (isLoading) return <Spinner />;

    if (error) return <p>{`An error has occurred: ${error.message}.`}</p>;

    return (
        <Form
            caption="Update"
            heading="Edit"
            instructions="update an existing"
            dancer={data}
            submitForm={submitForm}
        />
    );
};

export default EditDancer;
