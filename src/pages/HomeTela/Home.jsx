import React from "react";
import './Home.css'
import { Link } from "react-router-dom";

// Social Media Icons as SVG components
const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4
      49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12
      0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2
      0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    <path d="M9 10a3 3 0 0 1 6 0c0 2-3 3-3 3" />
    <path d="M9 17h.01" />
  </svg>
);

function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div>
              <img src="/images/ipb-logo.png" alt="Igreja Presbiteriana do Brasil" className="logo" />
            </div>
            <nav>
              <Link to="/calendario" className="nav-button">Programações</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img src="/images/church-hero.png" alt="Igreja Presbiteriana do Brasil" className="hero-image" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h2 className="hero-title">Bem-vindos à Nossa Casa</h2>
          <p className="hero-subtitle">
            Uma comunidade de fé, esperança e amor, onde todos são acolhidos para crescer espiritualmente e servir ao próximo.
          </p>
          <button className="hero-button">Junte-se a Nós</button>
        </div>
      </section>

      {/* História Section */}
      <section className="historia">
        <div className="container">
          <div className="historia-grid">
            <div className="historia-content">
              <h3>Nossa História</h3>
              <div>
                <p className="historia-text">
                  A Igreja Presbiteriana do Brasil tem suas raízes profundas na tradição reformada, chegando ao nosso país no século XIX através de missionários dedicados que trouxeram a mensagem do Evangelho.
                </p>
                <p className="historia-text">
                  Ao longo de mais de 150 anos, nossa denominação tem crescido e se fortalecido, mantendo sempre os princípios bíblicos como fundamento de nossa fé e prática. Somos uma igreja que valoriza a Palavra de Deus, a oração e o serviço cristão.
                </p>
                <p className="historia-text">
                  Hoje, somos uma família de milhares de igrejas espalhadas por todo o Brasil, unidas pela mesma fé e compromisso de levar o amor de Cristo a todas as pessoas, transformando vidas e comunidades.
                </p>
              </div>
              <button className="historia-button">Saiba Mais</button>
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
              <img src="/images/ipb-logo.png" alt="Igreja Presbiteriana do Brasil" className="footer-logo" />
              <p className="footer-description">
                Uma denominação comprometida com a Palavra de Deus e o serviço cristão.
              </p>
            </div>

            <div>
              <h5>Links Importantes</h5>
              <ul className="footer-links">
                <li><a href="#">Sobre Nós</a></li>
                <li><a href="#">Programações</a></li>
                <li><a href="#">Ministérios</a></li>
                <li><a href="#">Contato</a></li>
              </ul>
            </div>

            <div>
              <h5>Redes Sociais</h5>
              <div className="social-icons">
                <a href="#" className="social-icon"><InstagramIcon /></a>
                <a href="#" className="social-icon"><FacebookIcon /></a>
                <a href="#" className="social-icon"><YoutubeIcon /></a>
                <a href="#" className="social-icon"><WhatsAppIcon /></a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 Igreja Presbiteriana do Brasil. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
