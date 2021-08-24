import React, {useState, useMemo} from 'react';
import Logo from "./Logo";
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage} from '@hookform/error-message';
import {yupResolver} from "@hookform/resolvers/yup";
import ReactTooltip from 'react-tooltip';
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash, faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import BackArrow from "./BackArrow";


const SignUp = () => {

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

    const {handleSubmit, register, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data, e) => {
        console.log(data);
        e.target.reset();
    }

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
            </nav>
            <div className="sign-section wrapper">
                <BackArrow location={"/signin"} />
                <div className="sign-text">
                    <h1>Zarejestruj się</h1>
                    <span>Uzyskaj dostęp do niesamowitych funkcjonalaności</span>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="sign-email">
                        <label htmlFor="email">Adres e-mail</label>
                        <input {...register("email")} />
                        <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"email"}/>
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
                            <input type={passwordVisible ? 'text' : 'password'} {...register("password")} />
                            <FontAwesomeIcon onClick={clickHandler} icon={passwordVisible ? 'eye' : 'eye-slash'}/>
                        </div>
                        <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"password"}/>
                        {/*Error na dane logowania*/}
                    </div>
                    <div className="sign-password">
                        <label htmlFor="password">Powtórz hasło</label>
                        <div className="password-eye-wrapper">
                            <input type={passwordVisible ? 'text' : 'password'} {...register("repeat")} />
                        </div>
                        <ErrorMessage as={<div className={"error-message"}/>} errors={errors} name={"repeat"}/>
                    </div>
                    <div className="sign-btn-box">
                        <button className="register-btn" type="submit">Zarejestruj się</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUp;