import React, { useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"; //calendario dragAndDrop tem mais funcionalidades como mover e alterar
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "./Components-Calendario.css";
import eventosPadrao from "./eventosPadrao";
import EventModal from "./EventModal";
import Adicionar from "./adicionar/Adicionar";

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
            <div className="toolbar p-4">
                <Adicionar/>
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
                    eventPropGetter={eventStyle} //chama a const que altera a cor dos eventos
                    components={{//reescrever o toolbar
                        toolbar: CustomTollbar,
                    }}
                    className="calendar" //nome que chama no css o calendario
                />
            </div>

            {eventoSelecionado && (
                <EventModal evento={eventoSelecionado} onCLose={handleEventClose}/>
            )}
        </div>
    );
}

const CustomTollbar = ({label, onView, onNavigate, views}) =>{
    const [itemText, setItemText] = useState('month');

    return(
        <div className="toolbar-container">
            <h1 className='mesAno'>{label}</h1>

        <div className="dirtop">
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    {itemText}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {views.map((view, index)=> (
                        <div key={index}>
                            <li>
                                <button className="dropdown-item" onClick={()=>onView(view)+ setItemText(view)}>{view}</button>
                            </li>
                            {index === 2 && <hr className="dropdown-divider"></hr>}
                        </div>
                    ))}
                </ul>
            </div>

            <div className="toolbar-navegation" style={{marginLeft: '15px'}}>
                <button className="btn btn-secondary btn-ls mr-2 border-0" onClick={()=>onNavigate('TODAY')}>Hoje</button>
                <button className="btn btn-sm mr-2 text-secondary" onClick={()=>onNavigate('PREV')} style={{marginLeft: '15px'}}><i class="bi bi-caret-left"></i></button>
                <button className="btn btn-sm mr-2 text-secondary" onClick={()=>onNavigate('NEXT')}><i class="bi bi-caret-right"></i></button>
            </div>



        </div>
        </div>

    )
} 

export default Calendario;
