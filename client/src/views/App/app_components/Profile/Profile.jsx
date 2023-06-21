import React from 'react';
import s from "./Profile.module.scss";
import {useSelector} from "react-redux";

const Profile = () => {
    const {name, avatar, bg_profile} = useSelector((state) => state.user.user)

    return (
        <div className="components_container">
            <div className={s.Profile}>
                <div style={{
                    backgroundImage: `${import.meta.env.VITE_BASE_API_URL}/${bg_profile}`
                }} className={s.bg_profile}>
                    <div className={s.userInfo}>
                        <div>
                            <div className={s.userAvatar}>
                                <img src={`${import.meta.env.VITE_BASE_API_URL}/${avatar}`} alt=""/>
                            </div>
                            <p className={s.userName}>
                                {name}
                            </p>
                        </div>
                        <div className={s.editProfile}>
                            <button>
                                Редактировать профиль
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;