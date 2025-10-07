import React, { useState } from "react";
import moment from "moment";
import "moment/locale/pt-br"; // importa o locale pt-BR
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"; 
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./Components-Calendario.css";
import eventosPadrao from "./eventosPadrao";
import EventModal from "./ModalEvent/EventModal";
import Adicionar from "./adicionar/Adicionar";
import CustomTollbar from "./CustomCalendar/CustomTollBar";
import FiltroProg from "./Filtro/FiltroProg";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


// Configuração do Drag and Drop
const DragAndDropCalendar = withDragAndDrop(Calendar);

// Define o locale global
moment.locale("pt-br");

// Localizer do React Big Calendar
const localizer = momentLocalizer(moment);

function Calendario() {
    const [eventos, setEventos] = useState(eventosPadrao);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [eventosFiltrados, setEventosFiltrados] = useState(eventosPadrao);

    // Define a cor de cada evento
    const eventStyle = (event) => ({
        style: {
            backgroundColor: event.color,
        },
    });

    // Mover eventos ao arrastar
    const moverEventos = ({ event, start, end }) => {
        const updatedEvents = eventos.map(ev =>
            ev.id === event.id ? { ...ev, start: new Date(start), end: new Date(end) } : ev
        );
        setEventos(updatedEvents);
    };

    // Abrir modal de evento
    const handleEventClick = (evento) => setEventoSelecionado(evento);

    // Fechar modal de evento
    const handleEventClose = () => setEventoSelecionado(null);

    // Adicionar novo evento
    const handleAdicionar = (novoEvento) => {
        setEventos([...eventos, { ...novoEvento, id: eventos.length + 1 }]);
    };

    // Deletar evento
    const handleEventDelete = (eventId) => {
        const updatedEvents = eventos.filter(ev => ev.id !== eventId);
        setEventos(updatedEvents);
        setEventoSelecionado(null);
    };

    // Atualizar evento
    const handleEventUpdate = (updatedEvent) => {
        const updatedEvents = eventos.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev);
        setEventos(updatedEvents);
        setEventoSelecionado(null);
    };

    // Filtrar eventos
    const handleSetSelecionarProg = (progSelecionadas) => setEventosFiltrados(progSelecionadas);

    return (
        <div className="tela">
            <div className="toolbar p-4">
                <Link to="/">
                    <button className="btn-voltar"><FaArrowLeft /></button>
                </Link>
                <Adicionar onAdicionar={handleAdicionar} />
                <FiltroProg programacoes={eventos} SelecionarProgramacoes={handleSetSelecionarProg} />
            </div>

            <div className="calendario">
                <DragAndDropCalendar
                    defaultDate={moment().toDate()}
                    defaultView="month"
                    events={eventosFiltrados}
                    localizer={localizer}
                    resizable
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
                    onDelete={handleEventDelete}
                    onUpdate={handleEventUpdate}
                />
            )}
        </div>
    );
}

export default Calendario;