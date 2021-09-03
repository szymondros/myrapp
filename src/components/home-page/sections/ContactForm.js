import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from "@hookform/resolvers/yup";
import {toast} from "react-toastify";
import Notification from "../../App/elements/Notification";

const ContactForm = () => {

    const validationSchema = yup.object().shape({
        firstName: yup.string()
            .required("To pole jest wymagane")
            .min(3, "Imię musi składać się z minimum 3 liter")
            .matches(/^[a-z ,.'-]+$/i, "Imię musi składać się z samych liter"),
        email: yup.string()
            .required("To pole jest wymagane")
            .email("Adres e-mail jest nieprawidłowy"),
        subject: yup.string()
            .required("To pole jest wymagane"),
        textarea: yup.string()
            .required("To pole jest wymagane")
            .min(6, "Wiadomość musi składać się z minimum 6 znaków")
    });

    const {handleSubmit, register, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });
    const onSubmit = (data, e) => {
        console.log(data);
        e.target.reset();
        successNotification();
    }

    const successNotification = () => {
        toast.success('Wiadomość została wysłana', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <div className="wrapper form-section" id="form">
            <div className="formsection-text">
                <h1>Formularz kontaktowy</h1>
                <span>Zazwyczaj odpowiadamy w ciągu 24h</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-name">
                    <label htmlFor="firstName">Imię</label>
                    <input {...register('firstName')} />
                    <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"firstName"}/>
                </div>
                <div className="form-email">
                    <label htmlFor="email">E-mail</label>
                    <input {...register("email")} />
                    <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"email"}/>
                </div>
                <div className="form-subject">
                    <label htmlFor="subject">Temat</label>
                    <input {...register("subject")} />
                    <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"subject"}/>
                </div>
                <div className="form-textarea">
                    <label htmlFor="textarea">Wiadomość</label>
                    <textarea {...register("textarea")} />
                    <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name="textarea"/>
                </div>
                <button type="submit">Wyślij</button>
            </form>

        </div>
    );
};

export default ContactForm;