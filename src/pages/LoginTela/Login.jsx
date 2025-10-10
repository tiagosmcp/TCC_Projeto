import React, {useState, useContext} from 'react';
import './Login.css';
import ipbLogo from '../../assets/imagens/ipbLogo.png';
import {FaUser, FaLock, FaArrowLeft} from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom"; 
import { AuthContext } from "../../context/AuthContext";


const Login = () =>{
    const [inputs, setInputs] = useState({
        nome: "", 
        senha: "", 
    });
    const [err, setErr] = useState(null);
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); 

    // Captura as mudanças nos campos do formulário
    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Lida com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(null); 

        try {
            // Chama a função de login do contexto
            await login(inputs);
            
            // Redireciona para o calendário após o login
            navigate("/calendario");
        } catch (error) {
            // Exibe a mensagem de erro da API (se houver) ou uma genérica
            const errorMessage = error.response?.data || "Erro de conexão. Verifique o servidor da API.";
            setErr(errorMessage);
            console.error("Erro no login:", error);
        }
    };
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