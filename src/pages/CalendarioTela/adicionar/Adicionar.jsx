import React, {useState} from 'react'
import { Button, Form, Row, Col, Collapse } from 'react-bootstrap'
import moment from "moment"; 

// Recebe a lista de programações existentes como prop
function Adicionar({onAdicionar, programacoes}){ 
    const [novoEvento, setNovoEvento] = useState({
        title: '',
        start: '',
        end: '',
        color: '',
        tipo: '',
        local: '',
    });
    const [expanded, setExpanded] = useState(false);
    
    //funcao que muda a programação
    const handleChange = (e) => {
        const {name, value} = e.target;
        setNovoEvento({...novoEvento, [name]:value});
    }
    
    // Função para resetar o formulário
    const resetForm = () => {
        setNovoEvento({
            title: '',
            start: '',
            end: '',
            color: '',
            tipo: '',
            local: '',
        });
    };

    // Função para checar se já existe uma programação com a mesma data/hora de início e local
    const checkForConflict = (newStartDate, newLocal) => {
        // Formata a data/hora para comparação exata (ignorando segundos)
        const compareTime = moment(newStartDate).format('YYYY-MM-DD HH:mm');
        
        const conflict = programacoes.find(prog => {
            
            // Compara o local (case-insensitive)
            const isSameLocal = prog.local && prog.local.toLowerCase() === newLocal.toLowerCase();
            
            // Compara a data e hora de início exata
            const progCompareTime = moment(prog.start).format('YYYY-MM-DD HH:mm');

            return isSameLocal && (progCompareTime === compareTime);
        });
        
        return !!conflict;
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { title, start, end, local } = novoEvento;
        
        // garante que os campos obrigatórios estão preenchido
        if (!title || !start || !end || !local){
            alert('Por favor, preencha todos os campos obrigatórios (Título, Início, Término e Local).');
            return;
        }

        const startDate = new Date(start);
        const endDate = new Date(end);

        if(startDate >= endDate){
            alert('A data de início deve ser anterior à data de término');
            return;
        }
        
        // Checagem de Conflito das programações
        const hasConflict = checkForConflict(startDate, local);

        const addEvent = () => {
            onAdicionar({
                ...novoEvento, 
                start: startDate,
                end: endDate,
            });
            resetForm();
        }

        if (hasConflict) {
            //  Alerta de Confirmação
            const isConfirmed = window.confirm(
                "Já existem programações com essas especificações (mesma data/hora e local).\n" + 
                "Deseja adicionar a programação mesmo assim?"
            );

            if (isConfirmed) {
                addEvent(); // Adiciona se confirmado
            }
            // Se clicar em Cancelar, ele permanece no formulário.
            return; 
        }
        
        addEvent();
    }

    return(
        
        <div className="CardAdicionarProg" style={{paddingTop: '10%'}}>
            <div className="adicionar p-3 rounded border border-white" style={{backgroundColor: '#e9ecef'}}>
                <h3 className="corTexto"style={{color: 'var(--gray-dark)'}}>Adicionar Programação</h3>
                <Form onSubmit ={handleSubmit}>
                    <Form.Group controlId ="formBasicTitle">
                        <Form.Label>Nome da Programação</Form.Label>
                        <Form.Control type="text" placeholder="Digite o nome" name="title" value={novoEvento.title} onChange={handleChange}/>
                        
                    </Form.Group>

                    <Row>
                        <Col xs={6}>
                            <Form.Group controlId="formBasicStart">
                                <Form.Label>Início</Form.Label>
                                <Form.Control type="datetime-local" name="start" value={novoEvento.start} onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formBasicEnd">
                                <Form.Label>Término</Form.Label>
                                <Form.Control type="datetime-local" name="end" value={novoEvento.end} onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Row> 
                        <Col xs={12}>
                             <Form.Group controlId='formBasicLocal' className="mt-2">
                                <Form.Label>Local</Form.Label>
                                <Form.Control type='text' placeholder='Digite o Local' name='local' value={novoEvento.local} onChange={handleChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button
                        variant='success'
                        type='submit'
                        style={{marginTop:'10px', marginRight: '10px'}}
                        disabled={!novoEvento.title || !novoEvento.start || !novoEvento.end || !novoEvento.local}>
                        Salvar
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Adicionar