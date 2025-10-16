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
    // Adicionei o estado de erro, caso a API negue o acesso (401)
    const [err, setErr] = useState(null); 
    
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); 

    // Captura as mudanças nos campos do formulário
    const handleChange = (e) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // Lida com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault(); // <-- ESSENCIAL: Impede o recarregamento padrão do navegador
        setErr(null); 

        try {
            // Chama a função de login do contexto (que usa o proxy)
            await login(inputs);
            
            // Redireciona para o calendário após o login (se for 200 OK)
            navigate("/calendario");
        } catch (error) {
            // Exibe a mensagem de erro da API (se for 401 ou 500)
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
                {/* CORREÇÃO: Adicionando o onSubmit aqui */}
                <form onSubmit={handleSubmit}> 
                    <div className='input'>
                        {/* CORREÇÃO: Binding para estado 'inputs' */}
                        <input 
                            type='text' 
                            placeholder='Usuário' 
                            name='nome' 
                            onChange={handleChange} 
                            value={inputs.nome}
                            required
                        />
                        <FaUser className='icon'/>
                    </div>
                    <div className='input'>
                        {/* CORREÇÃO: Binding para estado 'inputs' */}
                        <input 
                            type='password' 
                            placeholder='Senha' 
                            name='senha' 
                            onChange={handleChange} 
                            value={inputs.senha}
                            required
                        />
                        <FaLock className='icon'/>
                    </div>
                    
                    {/* Exibe o erro de login, se houver */}
                    {err && <p style={{ color: 'red', marginTop: '10px' }}>{err}</p>}

                    <div className='lembrarSenha'>
                        <label><input type='checkbox'/>Guardar Senha</label>
                    </div>

                    <div className="loginButtons">
                        <Link to="/">
                            <button className='botoes' type='button'> <FaArrowLeft />  Voltar </button>
                        </Link>
                        {/* Mantendo type='submit' */}
                        <button type='submit' className='botoes'>Entrar</button> 
                    </div>
                </form>
            </div>
        </div>

    );    
};


export default Login;