import { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { Fragment } from 'react/jsx-runtime';
import { fetchDancers, assignSeat, unassignSeat } from '../api/dancers';
import { getRange, getDancer, slowFetch } from '../util';
import { type Dancer } from '../type';
import Spinner from '../components/Spinner';

const Seating = () => {
    const queryClient = useQueryClient();

    const [option, setOption] = useState<string>('');

    const { data, isLoading, error } = useQuery({
        queryKey: ['dancers'],
        queryFn: () => slowFetch(fetchDancers),
    });

    useEffect(() => {
        if (data) {
            const firstUnassigned = data.find(
                (u: Dancer) => !u.table && !u.seat,
            );
            if (firstUnassigned && firstUnassigned._id) {
                setOption(firstUnassigned._id);
            }
        }
    }, [data]);

    const { mutate: assignMutation } = useMutation({
        mutationFn: assignSeat,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dancers'],
            });
        },
    });

    const { mutate: unassignMutation } = useMutation({
        mutationFn: unassignSeat,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dancers'],
            });
        },
    });

    const handleAssign = (
        id: string,
        table: number,
        seat: number,
        action: string,
    ) => {
        if (action === 'assign') {
            assignMutation({ id: id, table: table, seat: seat });
        }

        if (action === 'unassign') {
            unassignMutation({ id: id });
        }
    };

    if (isLoading) return <Spinner />;

    if (error) return <p>{`An error has occurred: ${error.message}.`}</p>;

    if (data) {
        const assigned = data.filter((a: Dancer) => a.table && a.seat);
        const unassigned = data.filter((u: Dancer) => !u.table && !u.seat);

        return (
            <section id="dashboard">
                <div className="dashboard-content">
                    <form id="list-form">
                        <h3>Assign Seats</h3>

                        <ul>
                            <li>
                                <label>
                                    <strong>Unassigned:</strong>
                                </label>
                            </li>
                            {unassigned.map((dancer: Dancer) => (
                                <li key={dancer._id}>
                                    <input
                                        type="radio"
                                        id={`rb-${dancer._id}`}
                                        name="participants"
                                        value={dancer._id?.toString()}
                                        onChange={(e) =>
                                            setOption(e.target.value)
                                        }
                                    />
                                    <label
                                        htmlFor={`rb-${dancer._id}`}
                                        className={`${dancer._id === option ? 'isChecked' : ''}`}
                                    >
                                        {dancer.firstName} {dancer.lastName}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </form>

                    <div id="tables">
                        {getRange(4).map((tableNum) => (
                            <div
                                key={tableNum}
                                id={`table-${tableNum}`}
                                className="table"
                            >
                                <div className="table-number">
                                    Table {tableNum}
                                </div>
                                {getRange(6).map((seatNum) => {
                                    const dancer = getDancer(
                                        assigned,
                                        tableNum,
                                        seatNum,
                                    );
                                    return (
                                        <Fragment key={seatNum}>
                                            <div
                                                className={`seat-number-${seatNum}`}
                                            >
                                                {seatNum}
                                            </div>
                                            <div
                                                className={`seat-${seatNum}`}
                                                title={
                                                    dancer._id
                                                        ? 'unassign'
                                                        : 'assign'
                                                }
                                            >
                                                <span>
                                                    <i
                                                        className={`fas ${dancer._id ? 'fa-minus-circle' : 'fa-plus-circle'}`}
                                                        onClick={() =>
                                                            handleAssign(
                                                                dancer._id
                                                                    ? dancer._id
                                                                    : option,
                                                                tableNum,
                                                                seatNum,
                                                                dancer._id
                                                                    ? 'unassign'
                                                                    : 'assign',
                                                            )
                                                        }
                                                    ></i>
                                                    {dancer._id &&
                                                        `${dancer.firstName} ${dancer.lastName}`}
                                                </span>
                                            </div>
                                        </Fragment>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-grow-1"></div>
            </section>
        );
    }
};

export default Seating;
