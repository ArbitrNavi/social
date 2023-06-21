import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const GuestLayout = () => {
    const {token} = useSelector((state) => state.user)

    if (token) {
        return <Navigate to={`/`}/>
    }

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default GuestLayout;