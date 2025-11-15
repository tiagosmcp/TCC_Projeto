import React, { useState } from "react";


const CustomTollbar = ({label, onView, onNavigate, views}) =>{
    // Mapeamento de tradução das views
    const viewTranslations = {
        'month': 'Mês',
        'week': 'Semana',
        'day': 'Dia',
    };
    
    // Função utilitária para traduzir o nome da view
    const translateView = (view) => viewTranslations[view] || view;

    const initialView = views.includes('month') ? 'month' : views[0] || 'month';
    const [itemText, setItemText] = useState(translateView(initialView));

    // Função para alterar a visualização, chamando onView com o nome em inglês
    // e atualizando o texto exibido para o nome em português.
    const handleViewChange = (view) => {
        onView(view);
        setItemText(translateView(view));
    };
    
    //  componente para renderizar botões de visualização
    const renderViewButtons = () => (
        <div className="toolbar-view-buttons">
            {views.map((view, index) => (
                <button
                    key={index}
                    className="btn btn-sm text-secondary btn-view"
                    onClick={() => handleViewChange(view)}
                >
                    {translateView(view)}
                </button>
            ))}
        </div>
    );

    return(
            <div className="toolbar-container">
                <h6 className='mesAno'>{label}</h6>

                <div className="dirtop">
                    
                    {/* DROP DOWN - VISÍVEL APENAS NO DESKTOP */}
                    <div className="dropdown desktop-view-selector">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            {itemText}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            {views.map((view, index)=> (
                                <div key={index}>
                                    <li>
                                        {/* Chama handleViewChange para usar o nome em inglês internamente e exibir em português */}
                                        <button className="dropdown-item" onClick={()=>handleViewChange(view)}>{translateView(view)}</button>
                                    </li>
                                </div>
                            ))} 
                        </ul>
                    </div>

                    {/* Botões de visualização para Mobile */}
                    <div className="mobile-view-selector">
                         {renderViewButtons()}
                    </div>
                    
                    <div className="toolbar-navegation">
                        <button className="btn btn-sm mr-2 text-secondary btn-prev" onClick={()=>onNavigate('PREV')}><i className='bi bi-caret-left'></i></button>
                        <button className="btn btn-sm mr-2 text-secondary btn-next" onClick={()=>onNavigate('NEXT')}><i className='bi bi-caret-right'></i></button>
                    </div>
                </div>

            </div>
    )
}

export default CustomTollbar;