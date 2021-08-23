import React from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from "@hookform/resolvers/yup";
import Logo from "./Logo";
import BackArrow from "./BackArrow";

const ResetPass = () => {

    const validationSchema = yup.object().shape({
        email: yup.string()
            .required("To pole jest wymagane")
            .email("Adres e-mail jest nieprawidłowy"),
    });

    const {handleSubmit, register, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data, e) => {
        console.log(data);
        e.target.reset();
    }

    return (
        <>
            <nav>
                <Logo/>
            </nav>
            <div className="sign-section wrapper">
                <BackArrow location={"/signin"} />
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
                    <button type="submit" className="login-btn">Resetuj hasło</button>
                </form>
            </div>
        </>
    );
};

export default ResetPass;