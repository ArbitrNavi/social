import React from 'react';
import s from "./Navbar.module.scss";
import {useSelector} from "react-redux";

const Navbar = () => {
    const {avatar} = useSelector((state) => state.user.user)

    return (
        <div className={s.Navbar}>
            <div className="container">
                <div className={s.Navbar_container}>
                    <div>
                        <div className={s.logo}>
                            LineSOCIAL
                        </div>
                        <div>
                            <input type="text" placeholder="Найти"/>
                        </div>
                    </div>
                    <div>
                        <div className={s.avatar}>
                            <img src={`${import.meta.env.VITE_BASE_API_URL}/${avatar}`} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;