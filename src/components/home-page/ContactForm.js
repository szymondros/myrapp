import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from "@hookform/resolvers/yup";

const ContactForm = () => {

    const validationSchema = yup.object().shape({
        firstName: yup.string().required("Required").min(2, "za krótkie"),
        email: yup.string().required("Required").email("Mail jest niepoprawny")
    });

    const {handleSubmit, register, formState: {errors}} = useForm({mode: "onBlur", resolver: yupResolver(validationSchema)});
    const onSubmit = () => {
        console.log(errors);
    };

    return (
        <div className={"wrapper form-section"} id="form">
            <h1>Formularz kontaktowy</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-name">
                    <label htmlFor="firstName">Imię</label>
                    <input {...register('firstName',)} />
                    <ErrorMessage as={<div className={"error-message"}/> } errors={errors} name={"firstName"} />
                </div>
                <div className="form-email">
                    <label htmlFor="email">E-mail</label>
                    <input {...register("email")} />
                    <ErrorMessage as={<div className={"error-message"}/> } errors={errors} name={"email"} />
                </div>
                <button type="submit">wyślij</button>
            </form>

        </div>
    );
};

export default ContactForm;