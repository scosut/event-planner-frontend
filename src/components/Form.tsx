import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { type FormProps, type FormData } from '../type';

const Form = ({
    caption,
    heading,
    instructions,
    dancer,
    submitForm,
}: FormProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setFocus,
        reset,
    } = useForm<FormData>();

    useEffect(() => {
        setFocus('firstName');
    }, [setFocus]);

    useEffect(() => {
        if (dancer && dancer.firstName && dancer.lastName) {
            reset({
                firstName: dancer.firstName,
                lastName: dancer.lastName,
            });
        }
    }, []);

    return (
        <section id="form">
            <div className="form-group">
                <h3>{heading} Dancer</h3>
                <p>Complete this form to {instructions} dancer.</p>
            </div>

            <form onSubmit={handleSubmit(submitForm)}>
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        {...register('firstName', {
                            required: 'First name is required.',
                        })}
                    />
                    {errors.firstName && (
                        <p className="error">{errors.firstName.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        {...register('lastName', {
                            required: 'Last name is required.',
                        })}
                    />
                    {errors.lastName && (
                        <p className="error">{errors.lastName.message}</p>
                    )}
                </div>

                <div className="form-group">
                    <button type="submit" className="btn">
                        {caption}
                    </button>
                </div>
            </form>

            <div className="flex-grow-1"></div>
        </section>
    );
};

export default Form;
