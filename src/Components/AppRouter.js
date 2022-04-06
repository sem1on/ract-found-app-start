import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import About from '../pages/About';
import Posts from '../pages/Posts';
import Error from '../pages/Error';

import '../Styles/App.css';
import PostIdPage from '../pages/PostIdPage';
import Login from '../pages/Login';
import { AuthContext } from '../Context/context';
import Loader from './UI/loader/Loader';

const AppRouter = () => {

    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        return <Loader/>
    }
    
    return (
        isAuth
            ?
            <Routes>
                <Route path='/about' element={<About/>}/>
                <Route path='/posts' element={<Posts/>}/>
                <Route path='/posts/:id' element={<PostIdPage/>}/>
                <Route path='/error' element={<Error/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/posts" replace />}
                />
            </Routes>
            :
            <Routes>
                <Route path='/login' element={<Login/>}/>
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes> 
    )
};

export default AppRouter;