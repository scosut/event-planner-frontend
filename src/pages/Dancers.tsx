import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useState, type MouseEvent } from 'react';
import { Link } from 'react-router';
import { getRange, chunkData, slowFetch } from '../util';
import { fetchDancers, deleteDancer } from '../api/dancers';
import Spinner from '../components/Spinner';
import { type Dancer } from '../type';

const Dancers = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState<number>(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ['dancers'],
        queryFn: () => slowFetch(fetchDancers),
    });

    const { mutate } = useMutation({
        mutationFn: deleteDancer,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dancers'],
            });
        },
    });

    const handleDelete = (dancer: Dancer) => {
        const prompt = window.confirm(
            `Are you sure you want to delete ${dancer.firstName} ${dancer.lastName}? Click OK to confirm or CANCEL to abort.`,
        );

        if (prompt) {
            mutate(dancer);
        }
    };

    const handleClick = (e: MouseEvent<HTMLAnchorElement>, num: number) => {
        e.preventDefault();
        setPage(num);
    };

    if (isLoading) return <Spinner />;

    if (error) return <p>{`An error has occurred: ${error.message}.`}</p>;

    if (data) {
        const recordsPerPage = 10;
        const pageCount = Math.ceil(data.length / recordsPerPage);
        const range = getRange(pageCount);
        const dancerChunks = chunkData(data, recordsPerPage);

        return (
            <section id="dashboard">
                <div className="dashboard-content">
                    <h3>Dancer List</h3>
                    <Link to="/dancers/add">
                        <i className="fas fa-user-plus" title="add"></i>
                    </Link>
                    {range.map((num) => (
                        <table
                            id={`page-${num}`}
                            key={num}
                            style={{ display: page !== num ? 'none' : 'table' }}
                        >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Seat</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dancerChunks[page - 1].map((dancer) => (
                                    <tr key={dancer._id}>
                                        <td>{`${dancer.firstName} ${dancer.lastName}`}</td>
                                        <td>
                                            {dancer.table && `T${dancer.table}`}{' '}
                                            {dancer.seat && `S${dancer.seat}`}
                                        </td>
                                        <td>
                                            <Link
                                                to={`/dancers/edit/${dancer._id}`}
                                            >
                                                <i
                                                    className="fas fa-pencil-alt"
                                                    title="edit"
                                                ></i>
                                            </Link>
                                            <button
                                                className="btn-delete"
                                                onClick={() =>
                                                    handleDelete(dancer)
                                                }
                                            >
                                                <i
                                                    className="far fa-trash-alt"
                                                    title="delete"
                                                ></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ))}

                    {pageCount > 1 && (
                        <ul className="dashboard-pages">
                            {range.map((num) => (
                                <li key={num}>
                                    <a
                                        className={page === num ? 'active' : ''}
                                        onClick={(e) => handleClick(e, num)}
                                    >
                                        {num}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="flex-grow-1"></div>
            </section>
        );
    }
};

export default Dancers;
