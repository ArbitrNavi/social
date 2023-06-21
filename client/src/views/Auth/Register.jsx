import React, {useState} from 'react';
import s from "./Auth.module.scss";
import {Link} from "react-router-dom";
import noAvatar from "../../assets/noImageAvatar.png"
import axiosClient from "../../axiosClient.js";
import {useDispatch} from "react-redux";
import {setToken, setUser} from "../../store/features/userSlice.jsx";

const Register = () => {
    const [allValues, setAllValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        avatar: null
    })
    const [errors, setErrors] = useState(null)
    const [photoUrl, setPhotoUrl] = useState('');
    const dispatcher = useDispatch()

    const handleChange = (e) => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
    }

    function handlePhotoChange(event) {
        const file = event.target.files[0];
        setAllValues({...allValues, avatar: file})
        if (file) {
            const reader = new FileReader();
            reader.addEventListener('load', function() {
                setPhotoUrl(reader.result);
            });
            reader.readAsDataURL(file);
        }
    }

    const values = new FormData()

    Object.keys(allValues).forEach((key) => {
        values.append(key, allValues[key])
    })

    const onSubmit = (e) => {
        e.preventDefault()


        axiosClient
            .post("/register", values, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(({data}) => {
                console.log(data)
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

    console.log(errors)

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
                <p>Регистрация</p>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={allValues.name}
                        onChange={handleChange}
                        placeholder="Имя пользователя"
                    />
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
                    <input
                        type="password"
                        name="password_confirmation"
                        value={allValues.password_confirmation}
                        onChange={handleChange}
                        placeholder="Подтвердите пароль"
                    />
                    <label className={s.file}>
                        <div className={s.avatar}>
                            <img src={`${photoUrl ? photoUrl : noAvatar}`} alt=""/>
                        </div>
                        <p>Выбрать фото профиля</p>
                        <input
                            type="file"
                            onChange={handlePhotoChange}
                        />
                    </label>
                    <button>
                        Зарегистрироваться
                    </button>
                    <p className={s.link}>Уже зарегестрированны? <Link to={`/login`}>Войти</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Register;