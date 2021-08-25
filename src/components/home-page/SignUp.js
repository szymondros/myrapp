import React, {useState, useMemo, useCallback, useEffect} from 'react';
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
import app from "../../base";
import {withRouter} from "react-router-dom";


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

    const handleSignUp = useCallback(async (event, data) => {
        // event.preventDefault();
        // const { email, password } = event.target?.elements;
        // const email = event.target.email;
        // const password = event.target.name;
        console.log(getValues(data.email));

        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(data.email, data.password);
            history.push("/myapp");
        } catch (error) {
            alert(error);
        }
    }, [history]);

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
                <BackArrow location={"/signin"}/>
                <div className="sign-text">
                    <h1>Zarejestruj się</h1>
                    <span>Uzyskaj dostęp do niesamowitych funkcjonalaności</span>
                </div>
                <form onSubmit={handleSubmit(handleSignUp)}>
                    <div className="sign-email">
                        <label htmlFor="email">Adres e-mail</label>
                        <input name="email" {...register("email")} onChange={e => setValue("email", e.target.value)} />
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
                            <input onChange={e => setValue("password", e.target.value)} name="password"
                                   type={passwordVisible ? 'text' : 'password'} {...register("password")} />
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

export default withRouter(SignUp);