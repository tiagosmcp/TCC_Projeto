import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Collapse, Alert } from "react-bootstrap";
import moment from "moment";

// Adicionamos as novas props: canEditOrDelete e isLoggedIn
const EventModal = ({ evento, onClose, onDelete, onUpdate, canEditOrDelete, isLoggedIn }) => {
    // Inicializa o estado com os dados do evento. Usaremos 'editedEvent.status' e 'editedEvent.cor' para salvar na API
    const [editedEvent, setEditedEvent] = useState({
        ...evento,
        // Garante que o estado interno usa as chaves corretas que vêm da API (cor, status, id_usuario)
        tipo: evento.tipo || evento.status, 
        color: evento.color || evento.cor,
    });
    const [isEditing, setIsEditing] = useState(false); // Novo estado para controlar o modo de edição
    const [collapsed, setCollapsed] = useState(true);

    // Efeito para sincronizar os dados editáveis se o evento mudar (caso a permissão mude)
    useEffect(() => {
        setEditedEvent({
            ...evento,
            tipo: evento.tipo || evento.status,
            color: evento.color || evento.cor,
        });
        // Se o usuário não puder editar, forçamos o modo de visualização
        if (!canEditOrDelete) {
            setIsEditing(false);
        }
    }, [evento, canEditOrDelete]);

    // Função de edição (só permite mudar Título e Local)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedEvent({ ...editedEvent, [name]: value });
    }

    // Funções de data (mantidas, mas só usadas no modo de edição)
    const handleStartDateChange = (e) => {
        const startDate = new Date(e.target.value);
        setEditedEvent(prev => ({ 
            ...prev, 
            start: startDate, 
            // Garante que o fim não seja antes do início
            end: (startDate > prev.end) ? moment(startDate).add(1, 'hour').toDate() : prev.end 
        }));
    }

    const handleEndDateChange = (e) => {
        const endDate = new Date(e.target.value);
        setEditedEvent(prev => ({ 
            ...prev, 
            end: endDate,
            // Garante que o início não seja depois do fim
            start: (endDate < prev.start) ? moment(endDate).subtract(1, 'hour').toDate() : prev.start
        }));
    }

    // Função de ajuste de fuso horário (necessário para o input datetime-local)
    const ajustDate = (date) => {
        if (!date) return '';
        // Converte para ISO string e remove os segundos/millis e o Z (UTC)
        return moment(date).format('YYYY-MM-DDTHH:mm');
    };

    const handleSave = () => {
        // Envia o objeto editado de volta para o Calendario.jsx (que fará a chamada PUT)
        // O Calendario.jsx já tem o id_usuario_logado para a verificação de permissão no backend.
        if (editedEvent.title && editedEvent.start && editedEvent.end) {
            onUpdate(editedEvent);
        } else {
            alert("Título, Início e Fim são obrigatórios.");
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title style={{ color: editedEvent.color }}>{evento.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Alerta de permissão, se necessário */}
                {isLoggedIn && !canEditOrDelete && (
                    <Alert variant="info">
                        Você está visualizando esta programação. Apenas o Admin criador pode editar ou excluir.
                    </Alert>
                )}

                <Form>
                    <Form.Group controlId="formCriador" className="mb-3">
                        <Form.Label>Criador (Tipo)</Form.Label>
                        <Form.Control 
                            type="text" 
                            // Exibe o tipo e o nome do criador
                            value={`${editedEvent.tipo} - ${editedEvent.usuario_nome}`} 
                            disabled 
                        />
                    </Form.Group>
                    
                    <Form.Group controlId="formTitle" className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="title" 
                            value={editedEvent.title} 
                            onChange={handleInputChange} 
                            disabled={!canEditOrDelete} // Desabilita se não puder editar
                        />
                    </Form.Group>

                    <Form.Group controlId="formLocal" className="mb-3">
                        <Form.Label>Local</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="local" 
                            value={editedEvent.local || ''} 
                            onChange={handleInputChange}
                            disabled={!canEditOrDelete} // Desabilita se não puder editar
                        />
                    </Form.Group>

                    {/* Detalhes de Data e Cor (Sempre visíveis se não estiver recolhido ou se puder editar) */}
                    <Collapse in={!collapsed || canEditOrDelete}>
                        <div>
                            <Form.Group controlId="formInicio" className="mb-3">
                                <Form.Label>Início</Form.Label>
                                <Form.Control 
                                    type="datetime-local" 
                                    name="start" 
                                    value={ajustDate(editedEvent.start)} 
                                    onChange={handleStartDateChange}
                                    disabled={!canEditOrDelete} // Desabilita se não puder editar
                                />
                            </Form.Group>

                            <Form.Group controlId="formFim" className="mb-3">
                                <Form.Label>Término</Form.Label>
                                <Form.Control 
                                    type="datetime-local" 
                                    name="end" 
                                    value={ajustDate(editedEvent.end)} 
                                    onChange={handleEndDateChange}
                                    disabled={!canEditOrDelete} // Desabilita se não puder editar
                                />
                            </Form.Group>

                            <Form.Group controlId="formColor" className="mb-3">
                                <Form.Label>Cor</Form.Label>
                                <Form.Control 
                                    type="color" 
                                    name="color" 
                                    value={editedEvent.color} 
                                    // A cor e o tipo são injetados pelo backend e não devem ser alterados aqui, 
                                    // pois isso violaria a regra do criador. Apenas exibimos a cor atual.
                                    disabled 
                                />
                            </Form.Group>
                        </div>
                    </Collapse>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-between">
                
                {/* Botão para mostrar/ocultar detalhes extras */}
                <Button variant='secondary' onClick={() => setCollapsed(!collapsed)} disabled={canEditOrDelete}>
                    {collapsed ? "Mostrar Detalhes" : "Ocultar Detalhes"}
                </Button>

                {/* Botões de CRUD condicionados à permissão canEditOrDelete */}
                {canEditOrDelete && (
                    <>
                        <Button variant='danger' onClick={onDelete}>
                            Apagar
                        </Button>
                        <Button variant='primary' onClick={handleSave}>
                            Salvar Alterações
                        </Button>
                    </>
                )}

            </Modal.Footer>
        </Modal>
    );
}

export default EventModal;