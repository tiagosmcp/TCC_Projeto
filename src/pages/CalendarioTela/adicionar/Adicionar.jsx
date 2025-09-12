import React, {useState} from 'react'
import { Button, From, Row, Collapse } from 'react-bootstrap'

function Adicionar({onAdicionar}){
    const [novoEvento, setNovoEvento] = useState({
        title: '',
        start: '',
        end: '',
        desc: '',
        color: '',
        tipo: '',
        local: '',
    });
    const [expanded, setExpanded] = useState(false);

    //funcao que muda a programação
    const handleChange = (e) => {
        const {nome, value} = e.target;
        setNovoEvento({...novoEvento, [nome]:value});
    }

    //função que expande pra adicionar uma programação
    const handleToggleExpanded = (e) => {
        e.stopPropagation();
        setExpanded(!expanded)
    }

    const handleSubmit = (e) => {
         e.preventDefault();   
    }

    return(
        <div className="adicionar p-3 rounded border border-white">
            <h3>Adicionar Programação</h3>
            <From onSubmit ={handleSubmit}>
                <From.Group controlId ="formBasicTitle">
                    <From.Label>Título da Programação</From.Label>
                    <From.Control type="text" placeholder="Digite o Título" name="title" value={novoEvento.title} onChange={handleChange}/>
                    
                </From.Group>
            </From>
        </div>
    )
}
export default Adicionar