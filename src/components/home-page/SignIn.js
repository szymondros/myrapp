import Logo from "./Logo";
import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from "@hookform/resolvers/yup";

const SignIn = () => {

    const validationSchema = yup.object().shape({
        email: yup.string()
            .required("To pole jest wymagane")
            .email("Adres e-mail jest nieprawidłowy"),
        password: yup.string()
            .required("To pole jest wymagane")
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
            <div className="sign-in-section wrapper">
                <div className="sign-in-text">
                    <h1>Zaloguj się</h1>
                    <span>Jeżeli nie masz jeszcze konta zarejestruj się</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="login-email">
                        <label htmlFor="email">Adres e-mail</label>
                        <input {...register("email")} />
                        <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"email"}/>
                    </div>
                    <div className="login-password">
                        <label htmlFor="password">Hasło</label>
                        <input type="password" {...register("password")} />
                        <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"password"}/>
                        {/*Error na dane logowania*/}
                    </div>
                    <div className="login-btn-section">
                        <button type="submit">Zaloguj</button>
                        <button>Zarejestruj się</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignIn;