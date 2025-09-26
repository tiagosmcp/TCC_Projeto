import React, {useState} from 'react';
import './Login.css';
import ipbLogo from '../../assets/imagens/ipbLogo.png';
import {FaUser, FaLock, FaArrowLeft} from 'react-icons/fa';
import { Link } from "react-router-dom";


const Login = () =>{
    return(
        <div className='cardLogin'>
            <form action=''>
               {/* <div className="logoLogin">
                    <img src={ipbLogo}/>
                </div>*/}
            </form>
            <div className='input'>
                <input type='text' placeholder='Usuário' required/>
                <FaUser className='icon'/>
            </div>
            <div className='input'>
                <input type='password' placeholder='Senha' required/>
                <FaLock className='icon'/>
            </div>
            <div className='lembrarSenha'>
                <label><input type='checkbox'/>Guardar Senha</label>
            </div>

            <Link to="/">
                <button className='botoes'> <FaArrowLeft />  Voltar </button>
            </Link>
            <button type='submmit' className='botoes'>Entrar</button>
        </div>
    );    
};



export default Login;