import React, { useState } from "react";
import { Modal, Button, Form, Collapse } from "react-bootstrap";
const EventModal = ({evento, onClose, onDelete, onUpdate}) => {
    const [editedEvent, setEditedEvent] = useState({...evento});
    const [collapsed, setCollapsed] = useState(true);

    //funcao de editar
    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setEditedEvent({...editedEvent,[name]:value});
    }

    const handleColorChange = (e) =>{
        setEditedEvent({...editedEvent, color:e.target.value});
    }

    const handleStartDateChange = (e) =>{
        const startDate = new Date(e.target.value);
        if(startDate <= editedEvent.end){
            setEditedEvent({...editedEvent, start:startDate});
        }
    }

    const handleEndDateChange = (e) =>{
        const endDate = new Date(e.target.value);
        if(endDate <= editedEvent.start){
            setEditedEvent({...editedEvent, end:endDate});
        }
    }
    //deletar id do evento
    const handleDelete = () =>{
        onDelete(evento.id);
    }
    const handleUpdate = () =>{
        onUpdate(editedEvent);
        onClose();
    }

    //funcao de ejustar horas pois as vzs o react interpreta que esta em outro fusohorario
    const ajustDate = (date) =>{
        const ajustedDate = new Date(date);
        ajustedDate.setHours(ajustedDate.getHours() - 3);
        return ajustedDate.toISOString().slice(0,-8);
    };



    return(
        <Modal show={true} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>{editedEvent.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group controlId="formTitle">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" name="title" value={editedEvent.title} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group controlId="formLocal">
                        <Form.Label>local</Form.Label>
                        <Form.Control type="text" name="local" value={editedEvent.local} onChange={handleInputChange}/>
                    </Form.Group>

                    <Collapse in={!collapsed}>
                        <div>
                        <Form.Group controlId="formInicio">
                            <Form.Label>Início</Form.Label>
                            <Form.Control type="datetime-local" name="start" value={ajustDate(editedEvent.start)} onChange={handleStartDateChange}/>
                        </Form.Group>

                        <Form.Group controlId="formFim">
                            <Form.Label>Fim</Form.Label>
                            <Form.Control type="datetime-local" name="end" value={ajustDate(editedEvent.end)} onChange={handleEndDateChange}/>
                        </Form.Group>

                        <Form.Group controlId="formColor">
                            <Form.Label>Cor</Form.Label>
                            <Form.Control type="color" name="color" value={editedEvent.color} onChange={handleColorChange}/>
                        </Form.Group>

                        <Form.Group controlId="formTipo">
                            <Form.Label>Tipo</Form.Label>
                            <Form.Control type="tipo" name="tipo" value={editedEvent.tipo} onChange={handleInputChange}/>
                        </Form.Group>
                        </div>
                    </Collapse>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                <Button variant='secondary' onClick = {()=> setCollapsed(!collapsed)}>
                    {!collapsed ? "Ocultar Detalhes" : "Mostrar Detalhes"}
                </Button>
                <Button variant='danger' onClick={handleDelete}>
                    Apagar
                </Button>
                <Button variant='primary' onClick={handleUpdate}>
                    Salvar Alterações
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EventModal;


