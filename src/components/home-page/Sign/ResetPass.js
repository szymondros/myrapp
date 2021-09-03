import React, {useCallback} from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from "@hookform/resolvers/yup";
import Logo from "../elements/Logo";
import BackArrow from "../elements/BackArrow";
import Notification from "../../App/elements/Notification";
import app from "../../../base";
import {toast} from "react-toastify";

const ResetPass = () => {

    const validationSchema = yup.object().shape({
        email: yup.string()
            .required("To pole jest wymagane")
            .email("Adres e-mail jest nieprawidłowy"),
    });

    const {handleSubmit, register, formState: {errors}, getValues} = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = async (data, e) => {
        console.log(data);
        e.target.reset();
        const email = getValues("email");
        try {
            await app
                .auth()
                .sendPasswordResetEmail(email)
            successNotification();
        } catch (error) {
            errorNotification();
        }
    };


    const successNotification = () => {
        toast.success('Wysłano wiadomość e-mail z instrukcjami', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const errorNotification = () => {
        toast.error('Podany adres e-mail nie istnieje w bazie', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>

            <nav>
                <Notification/>
                <Logo/>
            </nav>
            <div className="sign-section wrapper">
                <BackArrow location={"/signin"}/>
                <div className="sign-text">
                    <h1>Zresetuj hasło</h1>
                    <span>Podaj adres e-mail aby zresetować hasło</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="sign-email">
                        <label htmlFor="email">Adres e-mail</label>
                        <input {...register("email")} />
                        <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"email"}/>
                    </div>
                    <div className="sign-btn-box">
                        <button type="submit" className="login-btn">Resetuj hasło</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ResetPass;