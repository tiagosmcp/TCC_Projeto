import React, {useState} from 'react';
import { FaInstagram, FaFacebook, FaYoutube, FaWhatsapp, FaUserCircle} from 'react-icons/fa';
import './Home.css';
import { Link } from "react-router-dom";
import ipbLogo from '../../assets/imagens/ipbLogo.png';
import ipbLogoFooter from '../../assets/imagens/ipbLogoFooter.png';
import IgrejaFundo from '../../assets/imagens/igrejaFundo.png';
import ladodoTexto from '../../assets/imagens/ladodoTexto.png';
import ucpLogo from '../../assets/imagens/ucpLogo.png';
import upaLogo from '../../assets/imagens/upaLogo.png';
import umpLogo from '../../assets/imagens/umpLogo.png';
import safLogo from '../../assets/imagens/safLogo.png';
import uphLogo from '../../assets/imagens/uphLogo.png';


function Home() {

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="botoes-header" style={{ display: "flex", justifyContent: "center", gap: "1rem", flex: 1 }}>
            <div>
              <img src={ipbLogo}  className="logo"/>
            </div>

              <div className="botoes-header" style={{ display: "flex", justifyContent: "center", gap: "1rem", flex: 1 }}>
                 <a href="#localizacao">
                  <button className="botoes">Localização</button> 
                </a>
                <a href="#sobre-nos">
                  <button className="botoes">Sobre Nós</button> 
                </a>
                <a href="#sociedades">
                  <button className="botoes">Sociedades</button> 
                </a>
                <Link to="/calendario">
                  <button className="botoes">Programações</button> 
                </Link>
              </div>

              <Link to="/login"className="btn-login"> <FaUserCircle/> </Link>

          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img src={IgrejaFundo}  className="imagem-fundo"/>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2 className="hero-title">Bem-vindos à Nossa Casa</h2>
          <p className="hero-subtitle">
            Uma comunidade de fé, esperança e amor, onde todos são acolhidos para crescer espiritualmente e servir ao próximo.
          </p>
        </div>
      </section>

      {/* História Section */}
      <section className="meio">
        <div className="container">
          <div className="esquerda-grid" id="sobre-nos">
            <div className="esquerda-content">
              <h3>Sobre nós</h3>
              <div>
                <p className="esquerda-text">
                  Somos uma igreja cristã reformada comprometida com o Evangelho de Jesus Cristo. Somos uma igreja bíblica porque cremos que a Palavra de Deus é a
                  única regra de fé e prática.
                </p>
                <p className="esquerda-text">
                  Organizada em 2003 como igreja Presbiteriana Alvorada, dando continuidade a linda história da Igreja Presbiteriana do Brasil em Carmo do Paranaíba.
                </p>
                <p className="esquerda-text">
                  Na Igreja Presbiteriana, a sarça ardente, representada pela figura ao lado, simboliza a Presença e Preservação de Deus em meio à perseguição e sofrimento da igreja,
                  com base na história bíblica de Moisés no Monte Horebe. O fogo que arde sem consumir o arbusto representa a presença divina que sustenta 
                  e protege a igreja, permitindo que ela não seja destruída por provações, mas que continue a viver e florescer em meio a elas. 
                </p>  
              </div>
            </div>
            <div className="historia-image-container">
              <img src={ladodoTexto} className="historia-image"/>
            </div>
          </div>

          {/*Localizacao Section*/}
          <div className="direita-grid" id="localizacao">
              <div className="loc-maps-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.6317767058545!2d-46.31073698987374!3d-18.991862782121192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ae0f6bb80affd5%3A0x212a0ba90df73e92!2sIgreja%20Presbiteriana%20Alvorada!5e0!3m2!1spt-BR!2sbr!4v1758806835229!5m2!1spt-BR!2sbr"
                className='loc-image'
                loading='lazy'>
                </iframe>
              </div>
                <div className="bloco-texto-direita">
                  <h3>Localização</h3>
                  <div>
                    <p className="direita-text">
                      Estamos localizados na Rua Agusto Branquinho, nº 608, no bairro Niterói, em Carmo do Paranaíba. 
                      Nossa igreja está em uma região de fácil acesso, próxima a pontos de referência da cidade.
                      Venha nos visitar e conhecer nosso espaço, participar de nossos cultos e atividades!
                    </p>
                  </div>
                </div>
            </div>

            {/*Sociedades section */}
            <h3 className="sociedadetitulo" style={{color: '#3c3f40'}} id="sociedades">Sociedades</h3>
                  <p>A igreja conta com sociedades internas, organizadas por faixa etária e sexo para promover a integração e o 
                    desenvolvimento dos membros e visitantes, veja um pouco mais sobre cada uma logo abaixo!</p>
            <div className="sociedades-grid">
                <div className="sociedades-content">
                  <div>
                    <h3>UCP - União de Crianças Presbiterianas</h3> 
                    <p className="sociedades-text">
                      A UCP é uma sociedade interna da IPB voltada para reunir crianças entre 6 e 11 anos, 
                      oferecendo recursos e atividades que favoreçam seu crescimento espiritual, moral, intelectual e social.
                      As iniciativas promovidas pela UCP têm como principal objetivo ensinar o serviço cristão e desenvolver habilidades de liderança dentro do modelo
                      de governo da igreja.
                    </p>
                    <p className="sociedades-text">
                      “Batalhando por Cristo, lutando com amor, sou um soldado de nosso Senhor.”
                    </p>
                    <p className="sociedades-text">
                      Anunciar o evangelho, edificar vidas, socializar as crianças, incentivar práticas cristãs e modelar servos para obra de Deus.
                      Como a UCP não possui diretoria própria, a condução desta Força de Integração fica sob a responsabilidade da Secretaria Nacional do Trabalho da Infância - SNTI
                    </p>
                  </div>
                </div>
                <div className="sociedades-image-container">
                  <img src={ucpLogo} className="sociedades-image"/>
                </div>
                



            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <img src={ipbLogoFooter}  className="footer-logo"/>
              <p className="footer-description">
                Uma denominação comprometida com a Palavra de Deus e o serviço cristão.
              </p>
            </div>
            <div>
              <h5>Redes Sociais</h5>
              <div className="social-icons">
                <a href="https://www.instagram.com/ipbalvoradacarmo?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="social-icon"><FaInstagram size={24}/></a>
                <a href="https://www.facebook.com/people/IPB-Alvorada-Carmo-do-Paranaiba/100080372426356/#" className="social-icon"><FaFacebook size={24}/></a>
                <a href="http://www.youtube.com/@ipresbiterianaalvoradacarmo" className="social-icon"><FaYoutube size={24}/></a>
                <a href="#" className="social-icon"><FaWhatsapp size={24} /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Igreja Presbiteriana Alvorada. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
