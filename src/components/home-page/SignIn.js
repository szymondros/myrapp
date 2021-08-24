import Logo from "./Logo";
import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from "@hookform/resolvers/yup";
import {Link} from "react-router-dom";
import BackArrow from "./BackArrow";

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
            <div className="sign-section wrapper">
                <BackArrow location={"/"} />
                <div className="sign-text">
                    <h1>Zaloguj się</h1>
                    <span>Jeżeli nie masz jeszcze konta zarejestruj się</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="sign-email">
                        <label htmlFor="email">Adres e-mail</label>
                        <input {...register("email")} />
                        <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"email"}/>
                    </div>
                    <div className="sign-password">
                        <label htmlFor="password">Hasło</label>
                        <input type="password" {...register("password")} />
                        <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"password"}/>
                        {/*Error na dane logowania*/}
                    </div>
                    <div className="sign-btn-box">
                        <button type="submit" className="login-btn">Zaloguj</button>
                        <Link to="/signup">
                            <button className="register-btn">Zarejestruj się</button>
                        </Link>
                        <div className="resetpass-box">
                            <p>Nie pamiętasz swojego hasła?</p>
                            <Link to="/reset-pass">Zresetuj je.</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignIn;