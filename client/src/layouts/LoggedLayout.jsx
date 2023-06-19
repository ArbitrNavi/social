import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const LoggedLayout = () => {
    const {token} = useSelector((state) => state.user)


    if (!token) {
        return <Navigate to={`/login`} />
    }


    return (
        <div>
            <Outlet />
        </div>
    );
};

export default LoggedLayout;