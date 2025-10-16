import React, {useState} from 'react'
import { Button, Form, Row, Col, Collapse } from 'react-bootstrap'

function Adicionar({onAdicionar}){
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

    //função que expande pra adicionar uma programação
    const handleToggleExpanded = (e) => {
        e.stopPropagation();
        setExpanded(!expanded)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //verifica se tem titulo start e end E O LOCAL (pois agora é obrigatório)
        if(novoEvento.title && novoEvento.start && novoEvento.end && novoEvento.local){
            const startDate = new Date(novoEvento.start);
            const endDate = new Date(novoEvento.end);

            //verifica se a data de inicio é menor que a de fim
            if(startDate >= endDate){
                alert('A data de início deve ser anterior à data de término');
                return;
            }

            onAdicionar({...novoEvento, 
                start: startDate,
                end: endDate,
            });
            setNovoEvento({
                title: '',
                start: '',
                end: '',
                color: '',
                tipo: '',
                local: '',
            })
        }
        
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
                    
                    {/* NOVO: CAMPO LOCAL AGORA ESTÁ EM SUA PRÓPRIA ROW (SEMPRE VISÍVEL) */}
                    <Row> 
                        <Col xs={12}>
                             <Form.Group controlId='formBasicLocal' className="mt-2"> {/* Adicionado mt-2 para espaçamento */}
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
export default Adicionar;