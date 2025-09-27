import React, {useState} from 'react';
import './Login.css';
import ipbLogo from '../../assets/imagens/ipbLogo.png';
import {FaUser, FaLock, FaArrowLeft} from 'react-icons/fa';
import { Link } from "react-router-dom";


const Login = () =>{
    return(
            <div className="loginPage">
                <div className='cardLogin'>
                    <div className="logoLogin">
                    <img src={ipbLogo} alt="Logo IPB"/>
                    </div>
                    <form>
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

                    <div className="loginButtons">
                        <Link to="/">
                            <button className='botoes'> <FaArrowLeft />  Voltar </button>
                        </Link>
                            <button type='submit' className='botoes'>Entrar</button>
                    </div>

                    </form>
                </div>
            </div>

    );    
};



export default Login;