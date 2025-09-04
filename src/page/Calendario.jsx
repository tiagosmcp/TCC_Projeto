import React, { useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import './components/Components-Calendario.css';

import eventosPadrao from './components/eventosPadrao';

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer =  momentLocalizer(moment);

function Calendario (){

    const [eventos, setEventos] = useState(eventosPadrao)

    return(
       <div>
        <DragAndDropCalendar
        defaultDate={moment().toDate()}
        defaultView='month'
        events={eventos}
        localizer = {localizer}
        resizable
        className='calendar'     
        />
       </div>
    )
}

export default Calendario;