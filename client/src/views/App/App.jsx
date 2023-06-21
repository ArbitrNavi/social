import React, {useEffect, useState} from 'react';
import s from './App.module.scss';
import axiosClient from '../../axiosClient.js';
import {setUser} from '../../store/features/userSlice.jsx';
import {useDispatch} from 'react-redux';
import Navbar from './app_components/Navbar/Navbar.jsx';
import Loading from './app_components/Loading/Loading.jsx';
import Sidebar from './app_components/Sidebar/Sidebar.jsx';
import {Outlet} from 'react-router-dom';

const App = () => {
    const [loading, setLoading] = useState(false);
    const dispatcher = useDispatch();

    useEffect(() => {


        axiosClient
            .get('/user')
            .then(({data}) => {
                dispatcher(setUser(data));
                setLoading(true);
            })
            .catch((err) => {
            console.log(err)
        });


    }, []);

    return (
        <>
            <div className={s.App}>
                {loading ? (
                    <>
                        <Navbar/>
                        <div className='container'>
                            <div className={s.content}>
                                <Sidebar/>
                                <Outlet/>
                            </div>
                        </div>
                    </>
                ) : (
                    <Loading/>
                )}
            </div>
        </>
    );
};

export default App;
