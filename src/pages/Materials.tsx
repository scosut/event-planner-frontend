import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCards, fetchChart, fetchTents } from '../api/materials';
import { saveAs } from 'file-saver';

const Materials = () => {
    const materials = ['Place Cards', 'Seating Chart', 'Table Tents'];
    const [option, setOption] = useState('cards');
    const [buttonClicked, setButtonClicked] = useState(false);

    const { data, refetch } = useQuery({
        queryKey: ['materials'],
        queryFn: () => {
            if (option === 'chart') return fetchChart();
            if (option === 'tents') return fetchTents();
            return fetchCards();
        },
        refetchOnWindowFocus: false,
        enabled: false,
    });

    useEffect(() => {
        if (data && buttonClicked) {
            downloadPdf();
        }
    }, [data, buttonClicked]);

    const downloadPdf = () => {
        if (!data) {
            console.error('PDF data is not available');
            return;
        }

        try {
            const pdfBlob = new Blob([data], {
                type: 'application/pdf',
            });

            saveAs(pdfBlob, `${option}.pdf`);
        } catch (err) {
            console.log('Error opening PDF:', err);
        }
    };

    const handleClick = () => {
        setButtonClicked(true);
        refetch();
    };

    return (
        <section id="dashboard">
            <div className="dashboard-content no-margin">
                <form id="list-form">
                    <h3>Print Materials</h3>

                    <ul>
                        <li>
                            <label>
                                <strong>Materials:</strong>
                            </label>
                        </li>
                        {materials.map((material, idx) => (
                            <li key={idx}>
                                <input
                                    type="radio"
                                    id={`rb-${idx}`}
                                    name="materials"
                                    defaultChecked={idx === 0}
                                    value={material.toLowerCase().split(' ')[1]}
                                    onChange={(e) => setOption(e.target.value)}
                                />
                                <label htmlFor={`rb-${idx}`}>{material}</label>
                            </li>
                        ))}
                    </ul>

                    <button type="button" className="btn" onClick={handleClick}>
                        Download
                    </button>
                </form>
            </div>
            <div className="flex-grow-1"></div>
        </section>
    );
};

export default Materials;
