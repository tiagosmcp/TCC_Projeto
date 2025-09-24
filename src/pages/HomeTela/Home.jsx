import React, {useState} from 'react';
import { FaInstagram, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import './Home.css';
import { Link } from "react-router-dom";
import ipbLogo from '../../assets/imagens/ipbLogo.png';
import ipbLogoFooter from '../../assets/imagens/ipbLogoFooter.png';
import IgrejaFundo from '../../assets/imagens/igrejaFundo.png';
//import LadodoTexto from '../../assets/imagens/ladodoTexto.png';






function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div>
              <img src={ipbLogo}  className="logo"/>
            </div>
            <nav>
              <Link to="/calendario">
                <button className="btn-programacoes">Programações</button> 
              </Link>
            </nav>
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
      <section className="historia">
        <div className="container">
          <div className="historia-grid">
            <div className="historia-content">
              <h3>Sobre nós</h3>
              <div>
                <p className="historia-text">
                  Somos uma igreja cristã reformada comprometida com o Evangelho de Jesus Cristo. Somos uma igreja bíblica porque cremos que a Palavra de Deus é a única regra de fé e prática.
                </p>
                <p className="historia-text">
                  Organizada em 2003 como igreja Presbiteriana Alvorada, dando continuidade a linda história da Igreja Presbiteriana do Brasil em Carmo do Paranaíba.
                </p>
              </div>
            </div>
            <div className="historia-image-container">
              <img
                src="/historic-church-congregation-gathering-in-worship.png"
                alt="Congregação histórica da IPB"
                className="historia-image"
              />
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
