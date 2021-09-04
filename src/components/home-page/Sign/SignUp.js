import React, {useState, useMemo, useCallback, useEffect} from 'react';
import Logo from "../elements/Logo";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from "@hookform/resolvers/yup";
import ReactTooltip from 'react-tooltip';
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import BackArrow from "../elements/BackArrow";
import app from "../../../base";
import {withRouter} from "react-router-dom";
import Notification from "../../App/elements/Notification";
import successNotification from "../../../functions/successNotification";
import errorNotification from "../../../functions/errorNotification";


const SignUp = ({history}) => {

    const [passwordVisible, setPasswordVisible] = useState(false);

    const validationSchema = yup.object().shape({
        email: yup.string()
            .required("To pole jest wymagane")
            .email("Adres e-mail jest nieprawidłowy"),
        password: yup.string()
            .required("To pole jest wymagane")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Hasło musi składać się z minimum 8 znaków, zawierać małą i dużą literę oraz znak specjalny",
            ),
        repeat: yup.string()
            .required("To pole jest wymagane")
            .oneOf([yup.ref('password'), null], "Hasła muszą być jednakowe"),

    });

    const {handleSubmit, register, formState: {errors}, setValue, getValues} = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const handleSignUp = useCallback(async event => {
            const email = getValues("email");
            const password = getValues("password");
            try {
                await app
                    .auth()
                    .createUserWithEmailAndPassword(email, password);
                successNotification("Gratulacje! Zarejestrowałeś się");
                history.push("/myapp");
            } catch (error) {
                errorNotification(error);
            }
        }, [history]
    );

    useMemo(() => {
        fontawesome.library.add(faQuestionCircle, faEye, faEyeSlash);
    }, []);


    const clickHandler = () => {
        setPasswordVisible(prev => !prev);
    }

    return (
        <>
            <nav>
                <Logo/>
                <Notification/>
            </nav>
            <div className="sign-section wrapper">
                <div className="form-box">
                    <BackArrow location={"/signin"}/>
                    <div className="sign-text">
                        <h1>Zarejestruj się</h1>
                        <span>Uzyskaj dostęp do niesamowitych funkcjonalaności</span>
                    </div>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="sign-email">
                            <label htmlFor="email">Adres e-mail</label>
                            <input name="email" {...register("email")}
                                   onChange={e => setValue("email", e.target.value)}/>
                            <div className="error-msg-wrapper">
                                <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"email"}/>
                            </div>
                        </div>
                        <div className="sign-password">
                            <div className="label-tooltip-wrapper">
                                <label htmlFor="password">Hasło</label>
                                <p
                                    data-place="top"
                                    data-tip='Hasło musi zawierać: <br /><br />
                                - minimum 8 znaków <br />
                                - dużą literę <br />
                                - małą literę <br />
                                - znak specjalny'
                                    data-event="click"
                                    multiline="true"
                                >
                                    <FontAwesomeIcon icon="question-circle"/>
                                </p>
                                <ReactTooltip multiline={true} className="target-msg"/>
                            </div>
                            <div className="password-eye-wrapper">
                                <input name="password"
                                       type={passwordVisible ? 'text' : 'password'} {...register("password")}
                                       onChange={e => setValue("password", e.target.value)}/>
                                <FontAwesomeIcon onClick={clickHandler} icon={passwordVisible ? 'eye' : 'eye-slash'}/>
                            </div>
                            <div className="error-msg-wrapper">
                                <ErrorMessage as={<div className={"error-message"}/>} errors={errors}
                                              name={"password"}/>
                            </div>
                        </div>
                        <div className="sign-password">
                            <label htmlFor="password">Powtórz hasło</label>
                            <div className="password-eye-wrapper">
                                <input type={passwordVisible ? 'text' : 'password'} {...register("repeat")} />
                            </div>
                            <div className="error-msg-wrapper">
                                <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"repeat"}/>
                            </div>
                        </div>
                        <div className="sign-btn-box">
                            <button className="register-btn" type="submit">Zarejestruj się</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default withRouter(SignUp);