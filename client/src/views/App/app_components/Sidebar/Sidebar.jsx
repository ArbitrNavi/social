import React from 'react';
import s from "./Sidebar.module.scss"
import {Link} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className={s.Sidebar}>
            <ul>
                <li>
                    <Link to={`profile`}>Моя страница</Link>
                </li>
                <li>
                    <Link to={`news`}>Новости</Link>
                </li>
                <li>
                    <Link to={`messenger`}>Мессенджер</Link>
                </li>
                <li>
                    <Link to={`friends`}>Друзья</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;