import React, { useState, useEffect, useCallback, useContext } from "react";
import moment from "moment";
import "moment/locale/pt-br"; 
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"; 
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./Components-Calendario.css";
import EventModal from "./ModalEvent/EventModal";
import Adicionar from "./adicionar/Adicionar";
import CustomTollbar from "./CustomCalendar/CustomTollBar";
import FiltroProg from "./Filtro/FiltroProg";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios';
import { AuthContext } from "../../context/AuthContext"; 

// URL base da API de programação
const API_URL = "https://tcc-projeto.onrender.com/programacao";

// Configuração do Drag and Drop
const DragAndDropCalendar = withDragAndDrop(Calendar);

// Define o locale global
moment.locale("pt-br");

// Localizer do React Big Calendar
const localizer = momentLocalizer(moment);

function Calendario() {
    const { currentUser, logout } = useContext(AuthContext); 
    const [eventos, setEventos] = useState([]); 
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [eventosFiltrados, setEventosFiltrados] = useState([]);

    // Função para buscar os eventos da API
    const fetchEvents = useCallback(async () => {
        try {
            const res = await axios.get(API_URL);
            
            // Mapeia os dados da API para o formato esperado pelo calendário
            const mappedEvents = res.data.map(prog => ({
                ...prog,
                // As datas já vêm como objetos Date/Timestamp do controller
                start: new Date(prog.start),
                end: new Date(prog.end),
                // Mapeia 'cor' e 'status' do DB para 'color' e 'tipo' do frontend
                color: prog.cor, 
                tipo: prog.status,
            }));

            setEventos(mappedEvents);
            setEventosFiltrados(mappedEvents);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
        }
    }, []);

    useEffect(() => {
        fetchEvents();
    }, [fetchEvents]);

    // Define a cor de cada evento
    const eventStyle = (event) => ({
        style: {
            // Usa o campo 'color' que vem do DB com o código Hex
            backgroundColor: event.color, 
        },
    });

    // Mover e Redimensionar eventos (Update na API)
    const moverEventos = async ({ event, start, end }) => {
        // Regra de Permissão: SÓ se for o criador (checa no frontend e backend)
        if (!currentUser || event.id_usuario !== currentUser.id) {
            alert("Você só pode mover/redimensionar programações que você mesmo criou.");
            fetchEvents(); 
            return;
        }

        const updatedEvent = {
            ...event,
            // Formato para o MySQL
            start: moment(start).format('YYYY-MM-DD HH:mm:ss'), 
            end: moment(end).format('YYYY-MM-DD HH:mm:ss'),     
            // ID para verificação de permissão no Backend, essencial para o PUT/DELETE
            id_usuario_logado: currentUser.id, 
        };
        
        try {
            await axios.put(`${API_URL}/${event.id}`, updatedEvent);
            fetchEvents(); // Recarrega os eventos para refletir as mudanças do DB
        } catch (error) {
            alert(error.response?.data || "Erro de permissão ou conexão ao atualizar evento.");
            fetchEvents(); // Recarrega em caso de erro para reverter alterações visuais
        }
    };

    // Abrir modal de evento
    const handleEventClick = (evento) => setEventoSelecionado(evento);

    // Fechar modal de evento
    const handleEventClose = () => setEventoSelecionado(null);

    // Adicionar novo evento (Create na API)
    const handleAdicionar = async (novoEvento) => {
        // Regra de Permissão: SÓ se estiver logado
        if (!currentUser) {
            alert("Apenas Admins logados podem adicionar programações.");
            return;
        }

        try {
            // Prepara o payload: O Backend injeta a COR e o TIPO do Admin
            const payload = {
                title: novoEvento.title,
                start: moment(novoEvento.start).format('YYYY-MM-DD HH:mm:ss'),
                end: moment(novoEvento.end).format('YYYY-MM-DD HH:mm:ss'),
                local: novoEvento.local,
                id_usuario_logado: currentUser.id, // ID para o Backend injetar atributos
            };

            await axios.post(API_URL, payload);
            fetchEvents(); 
        } catch (error) {
            alert(error.response?.data || "Erro ao adicionar programação.");
        }
    };

    // Deletar evento (Delete na API)
    const handleEventDelete = async (eventId) => {
        console.log("ID recebido para deletar:", eventId);
        // Regra de Permissão: SÓ se estiver logado (e a API checa se é o criador)
        if (!currentUser) {
            alert("Apenas Admins logados podem deletar programações.");
            setEventoSelecionado(null);
            return;
        }
        
        try {
            const payload = { id_usuario_logado: currentUser.id }; 
            await axios.delete(`${API_URL}/${eventId}`, { data: payload }); 
            fetchEvents();
        } catch (error) {
            alert(error.response?.data || "Erro de permissão ou conexão ao deletar.");
        }
        setEventoSelecionado(null);
    };

    // Atualizar evento (Update na API)
    const handleEventUpdate = async (updatedEvent) => {
        // Regra de Permissão: SÓ se for o criador (checa no frontend e backend)
        if (!currentUser || updatedEvent.id_usuario !== currentUser.id) {
             alert("Você só pode editar programações que você mesmo criou.");
             setEventoSelecionado(null);
             return;
        }
        
        try {
            // Prepara o payload. O backend irá usar o id_usuario_logado para re-injetar a cor e tipo corretos.
            const payload = {
                title: updatedEvent.title,
                start: moment(updatedEvent.start).format('YYYY-MM-DD HH:mm:ss'),
                end: moment(updatedEvent.end).format('YYYY-MM-DD HH:mm:ss'),
                local: updatedEvent.local,
                id_usuario_logado: currentUser.id, 
            };

            await axios.put(`${API_URL}/${updatedEvent.id}`, payload);
            fetchEvents(); 
        } catch (error) {
            alert(error.response?.data || "Erro de permissão ou conexão ao atualizar.");
        }
        setEventoSelecionado(null);
    };

    // Filtrar eventos 
    const handleSetSelecionarProg = (progSelecionadas) => setEventosFiltrados(progSelecionadas);

    const isLoggedIn = !!currentUser;
    // Checa se o evento selecionado é o do usuário logado (Regra: CRUD Próprio)
    const canModifyEvent = eventoSelecionado && currentUser && eventoSelecionado.id_usuario === currentUser.id;

    return (
        <div className="tela">
            <div className="toolbar p-4">
                <Link to="/">
                    <button className="btn-voltar"><FaArrowLeft /></button>
                </Link>

                {/* Bloco de Login/Logout/Info */}
                <div style={{ marginTop: '20px', marginBottom: '20px', padding: '15px', backgroundColor: '#072614', color: 'white', borderRadius: '8px' }}>
                    {isLoggedIn ? (
                        <>
                            <p style={{ fontWeight: 'bold' }}>Logado como:</p>
                            <p>{currentUser.nome} ({currentUser.tipo})</p>
                            <button 
                                className="btn btn-secondary mt-2 w-100" 
                                onClick={logout} 
                                style={{ backgroundColor: '#dc3545', border: 'none' }}
                            >
                                Sair
                            </button>
                        </>
                    ) : (
                        <>
                            <p style={{ fontWeight: 'bold' }}>Acesso exclusivo para Administradores</p>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <button className="btn btn-success w-100 mt-2">Fazer Login</button>
                            </Link>
                        </>
                    )}
                </div>
                
                {/* O formulário Adicionar SÓ aparece se o Admin estiver logado */}
                {isLoggedIn && (
                    <Adicionar 
                        onAdicionar={handleAdicionar} 
                        programacoes={eventos} // <-- PASSANDO A LISTA PARA CHECAGEM DE CONFLITO
                    /> 
                )}
                <FiltroProg programacoes={eventos} SelecionarProgramacoes={handleSetSelecionarProg} />
            </div>

            <div className="calendario">
                <DragAndDropCalendar
                    defaultDate={moment().toDate()}
                    defaultView="month"
                    events={eventosFiltrados}
                    localizer={localizer}
                    resizable={canModifyEvent} 
                    draggableAccessor={(event) => isLoggedIn && event.id_usuario === currentUser?.id} 
                    onEventDrop={moverEventos}
                    onEventResize={moverEventos}
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyle}
                    components={{
                        toolbar: CustomTollbar,
                    }}
                    className="calendar"
                    views={["month", "week", "day"]}
                />
            </div>

            {eventoSelecionado && (
                <EventModal
                    evento={eventoSelecionado}
                    onClose={handleEventClose}
                    onDelete={() => handleEventDelete(eventoSelecionado.id)}
                    onUpdate={handleEventUpdate}
                    canEditOrDelete={canModifyEvent} // Permissão para Editar/Deletar
                    isLoggedIn={isLoggedIn} // Se estiver logado (para visualização de detalhes)
                />
            )}
        </div>
    );
}

export default Calendario;