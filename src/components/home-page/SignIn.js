import Logo from "./Logo";
import React, {useEffect, useCallback, useContext} from 'react';
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from "@hookform/resolvers/yup";
import {Link} from "react-router-dom";
import BackArrow from "./BackArrow";
import app from "../../base";
import {AuthContext} from "../../Auth";
import {withRouter, Redirect} from "react-router-dom";

const SignIn = ( { history }) => {

    const validationSchema = yup.object().shape({
        email: yup.string()
            .required("To pole jest wymagane")
            .email("Adres e-mail jest nieprawidłowy"),
        password: yup.string()
            .required("To pole jest wymagane")
    });

    const {handleSubmit, register, formState: {errors}, setValue, getValues} = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const handleLogin = useCallback(
        async event => {
            // event.preventDefault();
            const email = getValues("email");
            const password = getValues("password");
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email, password);
                history.push("/myapp");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/myapp"/>;
    }

    return (
        <>
            <nav>
                <Logo/>
            </nav>
            <div className="sign-section wrapper">
                <BackArrow location={"/"}/>
                <div className="sign-text">
                    <h1>Zaloguj się</h1>
                    <span>Jeżeli nie masz jeszcze konta zarejestruj się</span>
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="sign-email">
                        <label htmlFor="email">Adres e-mail</label>
                        <input {...register("email")} onChange={e => setValue("email", e.target.value)} />
                        <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"email"}/>
                    </div>
                    <div className="sign-password">
                        <label htmlFor="password">Hasło</label>
                        <input type="password" {...register("password")} onChange={e => setValue("password", e.target.value)}/>
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

export default withRouter(SignIn);