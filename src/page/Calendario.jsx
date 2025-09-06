import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"; //calendario dragAndDrop tem mais funcionalidades como mover e alterar
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./components/Components-Calendario.css";
import eventosPadrao from "./components/eventosPadrao";
import EventModal from "./components/EventModal";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

function Calendario() {
    const [eventos, setEventos] = useState(eventosPadrao); //chamando os eventos
    //variavel para abrir uma tela ao clicar em algum evento, inicia com null e ao fechar fica null tambem, quando der dois cliques entra dentro de eventoSelecionado
    const [eventoSelecionado, SeteEventoSelecionado] = useState(null);

    //entra no style de cada evento e seta a cor que ta nele
    const eventStyle = (event) => ({
        style: {
            backgroundColor: event.color,
        },
    });

    //altera a data de inicio e fim ao arrastar ela no calendario
    const moverEventos = (data) => {
        const { start, end } = data;
        //passa por cada evento verificando se a data selecionada existe nos eventos que ja existem
        const updateEvents = eventos.map((event) => {
            //retorna um evento com as datas corrigidas se forem iguais
            if (event.id === data.event.id) {
                return {
                    ...event,
                    start: new Date(start),
                    end: new Date(end),
                };
            }
            //retorna um evento sem alterações
            return event;
        });

        setEventos(updateEvents);
    };
    //funcoes de abrir e fechar "detalhes" de um evento
    const handleEventClick = (evento) => {
        SeteEventoSelecionado(evento);
    };

    const handleEventClose = () => {
        SeteEventoSelecionado(null);
    };

    return (
        <div className="tela">
            <div className="toolbar">
                <p>Ferramentas</p>
            </div>
            
            <div className="calendario">
                <DragAndDropCalendar
                    defaultDate={moment().toDate()} //deixza o dia atual de outra tonalidade
                    defaultView="month"
                    events={eventos}
                    localizer={localizer}
                    resizable
                    onEventDrop={moverEventos}
                    onEventResize={moverEventos}
                    onSelectEvent={handleEventClick} //chama a funçaõ de abrir evento ao dar duplo clique nele}
                    eventPropGeter={eventStyle} //chama a const que altera a cor dos eventos
                    className="calendar" //nome que chama no css o calendario
                />
            </div>

            {eventoSelecionado && (
                <EventModal
                    evento={eventoSelecionado}
                    onCLose={handleEventClose}
                />
            )}
        </div>
    );
}

export default Calendario;
