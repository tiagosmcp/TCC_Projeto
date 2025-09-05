import React from "react";
import './Components-Calendario.css'


const EventModal = ({evento, onCLose}) => {
    return(
        <div className="modal">
            <div className="modal-content">
                <h2>{evento.title}</h2>
                <p>{evento.desc}</p>
                <p>Início: {evento.start.toLocaleString()}</p>
                <p>Fim: {evento.end.toLocaleString()}</p>
                <button onClick={onCLose}>Fechar</button>
            </div>
        </div>
    )
}

export default EventModal;


