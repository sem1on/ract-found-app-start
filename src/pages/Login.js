import React, { useContext } from 'react';

import { AuthContext } from '../Context/context';

import MyButton from '../Components/UI/button/MyButton';
import MyInput from '../Components/UI/input/MyInput';


const Login = () => {

    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = (e) => {
        e.preventDefault();
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div className='login'>
            <h3>Страница для логина</h3>
            <form onSubmit={login}>
                <MyInput type='text' placeholder='Введите логин'/>
                <MyInput type='password' placeholder='Введите пароль'/>
                <MyButton>Ввойти</MyButton>
            </form>
        </div>
    );
};

export default Login;