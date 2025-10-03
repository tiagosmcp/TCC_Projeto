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
                  Na Igreja Presbiteriana, a sarça ardente, representada pela figura ao lado, simboliza a presença e preservação de Deus em meio à perseguição e sofrimento da igreja,
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
            <h3 className="sociedadetitulo" id="sociedades">Sociedades</h3>
                  <p>A igreja conta com sociedades internas, organizadas por faixa etária e sexo para promover a integração e o 
                    desenvolvimento dos membros e visitantes, veja um pouco mais sobre cada uma logo abaixo!</p>
            {/* UCP */}
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

              {/* UPA */}
              <div className="sociedades-grid invert">
                <div className="sociedades-image-container">
                  <img src={upaLogo} className="sociedades-image"/>
                </div>
                <div className="sociedades-content">
                  <div>
                    <h3>UPA - União Presbiteriana de Adolescentes</h3> 
                    <p className="sociedades-text">
                      A UPA reúne adolescentes de 12 a 18 anos e tem como propósito promover atividades que incentivem a comunhão, 
                      o amadurecimento espiritual e o fortalecimento da identidade cristã.
                    </p>
                    <p className="sociedades-text">
                      “Ao Mestre sejamos fiéis, nas trevas sejamos luz, nas lutas sejamos fortes, servindo ao Senhor Jesus”.
                    </p>
                    <p className="sociedades-text">
                      A União Presbiteriana de Adolescentes foi criada em 1967, na Igreja Presbiteriana do Rio de Janeiro, quando a irmã Dorcas Araújo
                      Machado identificou a necessidade de oferecer programações específicas para os adolescentes que costumavam chegar antes dos cultos.
                      Com a aprovação do Conselho da igreja, surgiu a UPA. Em um dos salões, a irmã organizava atividades como evangelismo pessoal, apresentações teatrais, gincanas e momentos de louvor. A proposta rapidamente foi adotada por outras igrejas no Brasil.
                    </p>
                  </div>
                </div>
              </div>

              {/* UMP */}
              <div className="sociedades-grid">
                <div className="sociedades-content">
                  <div>
                    <h3>UMP - União de Mocidade Presbiteriana</h3> 
                    <p className="sociedades-text">
                      A União de Mocidade Presbiteriana é uma das sociedades internas da IPB, reunindo jovens entre 18 e 35 anos.
                      Seu propósito é promover o cuidado, a comunhão e o desenvolvimento espiritual da juventude, organizando atividades
                      tanto no âmbito da igreja local quanto em parceria com outras igrejas ao redor do país.
                    </p>
                    <p className="sociedades-text">
                      “Alegres na esperança, fortes na fé, dedicados no amor, unidos no trabalho”
                    </p>
                    <p className="sociedades-text">
                      Há registros de grupos de jovens atuando nas igrejas presbiterianas desde a década de 1930. A primeira UMP oficial foi
                      organizada na Igreja Presbiteriana do Rio de Janeiro, em 28 de agosto de 1934. Pouco tempo depois, em 1936, o Supremo Concílio
                      recomendou que os Conselhos das igrejas locais incentivassem a criação das Uniões de Mocidade Presbiteriana, reconhecendo oficialmente
                      o nome adotado pela UMP do Rio. Assim, a história da UMP é contada a partir da decisão do Supremo Concílio em julho de 1936.
                    </p>
                  </div>
                </div>
                <div className="sociedades-image-container">
                  <img src={umpLogo} className="sociedades-image"/>
                </div>
              </div>

              {/* SAF */}
              <div className="sociedades-grid invert">
                <div className="sociedades-image-container">
                  <img src={safLogo} className="sociedades-image"/>
                </div>
                <div className="sociedades-content">
                  <div>
                    <h3>SAF - Sociedade Auxiliadora Feminina</h3> 
                    <p className="sociedades-text">
                      A Sociedade Auxiliadora Feminina é o ministério das mulheres da igreja, que tem como propósito apoiar as atividades de cada igreja e congregação,
                      além de despertar nas mulheres a consciência de sua missão como integrantes do Corpo de Cristo.
                    </p>
                    <p className="sociedades-text">
                      “Sejamos verdadeiras auxiliadoras, irrepreensíveis na conduta, incansáveis na luta, firmes na fé e vitoriosas por Cristo Jesus.”
                    </p>
                  </div>
                </div>
              </div>

              {/* UPH */}
              <div className="sociedades-grid invert">
                <div className="sociedades-image-container">
                  <img src={uphLogo} className="sociedades-image"/>
                </div>
                <div className="sociedades-content">
                  <div>
                    <h3>UPH - União Presbiteriana de Homens</h3> 
                    <p className="sociedades-text">
                      A União Presbiteriana de Homens tem como propósito incentivar a comunhão, a vida devocional, 
                      o crescimento no conhecimento da Palavra e a participação ativa na vida da Igreja local, fortalecendo assim toda a comunidade.
                    </p>
                    <p className="sociedades-text">
                      Através da UPH, os homens cristãos encontram um espaço de convivência saudável e edificante, onde podem desenvolver sua espiritualidade por meio de estudos bíblicos, 
                      oração e palestras. Além disso, há momentos de aprendizado voltados para questões práticas do dia a dia, como o relacionamento no lar com esposa e filhos, o enfrentamento de tentações,
                      a administração das finanças e os desafios no ambiente de trabalho. Cursos e treinamentos também fazem parte das atividades, sempre com a finalidade de edificar a vida cristã e preparar homens para servir melhor ao Senhor e à igreja.
                    </p>
                  </div>
                </div>
              </div>
        </div>
      </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container footer-container">
            {/* Coluna esquerda */}
            <div className="footer-left">
              <img src={ipbLogoFooter} className="footer-logo" alt="IPB Logo" />
              <p className="footer-description">
                Uma denominação comprometida com a Palavra de Deus e o serviço cristão.
              </p>
            </div>

            {/* Coluna direita */}
            <div className="footer-right">
              <h5 className="footer-title">Redes Sociais</h5>
              <div className="social-icons">
                <a href="https://www.instagram.com/ipbalvoradacarmo" className="social-icon">
                  <FaInstagram size={22}/>
                </a>
                <a href="https://www.facebook.com/people/IPB-Alvorada-Carmo-do-Paranaiba/100080372426356/#" className="social-icon">
                  <FaFacebook size={22}/>
                </a>
                <a href="http://www.youtube.com/@ipresbiterianaalvoradacarmo" className="social-icon">
                  <FaYoutube size={22}/>
                </a>
                <a href="https://wa.me/553499386303" className="social-icon">
                  <FaWhatsapp size={22}/>
                </a>
              </div>
            </div>
          </div>

          {/* Linha inferior */}
          <div className="footer-bottom">
            <p>&copy; 2025 Igreja Presbiteriana Alvorada. Todos os direitos reservados.</p>
          </div>
        </footer>

    </div>
  );
}

export default Home;
