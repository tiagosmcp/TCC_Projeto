import React, {useEffect, useState} from 'react'
import {Form} from 'react-bootstrap'

function FiltroProg({programacoes,SelecionarProgramacoes}){
    const tiposProg = [... new Set(programacoes.map(programacao => programacao.tipo))].filter(tipo=> tipo!=='');

    const [tiposSelecionados, setTiposSelecionados] = useState([]);

    const toggleTipo = (tipo) =>{
        if(tiposSelecionados.includes(tipo)){
            setTiposSelecionados(tiposSelecionados.filter(t => t !== tipo));
        } else {
            setTiposSelecionados([...tiposSelecionados, tipo]);
        }
    };

    useEffect(()=> {
        if(tiposSelecionados.length === 0 ){
            SelecionarProgramacoes(programacoes);
        } else {
            const eventosFiltrados = programacoes.filter(programacao => tiposSelecionados.includes(programacao.tipo));
            SelecionarProgramacoes(eventosFiltrados);
        }
    },[tiposSelecionados, programacoes, SelecionarProgramacoes]);

    return(
        tiposProg.length > 0 &&(
            <div className="p-3 rounded border border-white mt-3" style={{backgroundColor: '#e9ecef', color: '#212529'}}>
                <div className = 'ps-1' style={{maxHeight:'25vh', overflowY: 'auto'}}> 
                    {tiposProg.map(tipo =>(
                            <Form.Check
                            key={tipo}
                            label={tipo}
                            checked={tiposSelecionados.includes(tipo)}
                            onChange={()=>toggleTipo(tipo)}
                            className='mr-3 mb-3'/>
                        ))}
                </div>
                <button className="btn btn-secondary w-100 mt-3" onClick={()=>setTiposSelecionados([])}>Limpar Filtro</button>
            </div>
        )
    )
}

export default FiltroProg;