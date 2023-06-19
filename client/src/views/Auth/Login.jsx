import React, {useState} from 'react';
import s from "./Auth.module.scss";
import {Link} from "react-router-dom";
import axiosClient from "../../axiosClient.js";
import {useDispatch} from "react-redux";
import {setToken, setUser} from "../../store/features/userSlice.jsx";

const Login = () => {
    const [allValues, setAllValues] = useState({
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState(null)
    const dispatcher = useDispatch();

    const handleChange = (e) => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
    }

    const onSubmit = (e) => {
        e.preventDefault()
        axiosClient
            .post("/login", allValues)
            .then(({data}) => {
                dispatcher(setUser(data.user))
                dispatcher(setToken(data.token))
            })
            .catch((err) => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
    }

    console.log(allValues)

    return (
        <div className={s.form}>
            {
                errors && (
                    <div className={s.modal}>
                        {
                            Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))
                        }
                    </div>
                )
            }
            <div className={s.formContainer}>
                <p>Авторизация</p>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        name="email"
                        value={allValues.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={allValues.password}
                        onChange={handleChange}
                        placeholder="Пароль"
                    />
                    <button>
                        Войти
                    </button>
                    <p className={s.link}>Не зарегестрированны? <Link to={`/register`}>Регистрация</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;