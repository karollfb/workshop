import React, { Component } from 'react';
import './TabelaSeries.css';

const ListaSeries = (props) => {
    return(
        <div className="card-body card-body-flex">
            {props.series.map(serie => {
                return(
                // precisa da chave e do id para ele renderizar as series
                <div className="card card-serie" key={serie.id}>
                    <div className="card-header">
                        <h5 className="card-title">{serie.nome}</h5>
                        <h6 className="card-title text-muted mb-8">{serie.lancamento}</h6>
                    </div>
                    <div className="card-body">
                        <img src="/logo192.png" className="card-img"/>
                    </div>
                    <div className="card-footer">
                        {serie.temporadas}
                        {/* caso o numero de series seja maior que 1 deverá ser mostrado 
                            nos dados 'temporadaS' (no plural), caso contrario apenas 'temporada' (no singular)
                        */}
                        {serie.temporadas > 1 ? ' temporadas' : ' temporada'}
                        <br/>
						<a href="#">Sinopse</a>
                        <br/>
                        <div className="text-center mt-1">
                            <button 
                                className="btn btn-outline-danger btn-sm mr-2 p-1" 
                                onClick={()=> {
                                    if(window.confirm('Confirma a exclusão?'))
                                    props.deleta(serie.id)
                                }}>
                                Delete
                            </button>
                            <button 
                                className="btn btn-outline-warning btn-sm p-1"
                                onClick={() => {
                                    if(window.confirm('Confirma a edição?'))
                                    props.consulta(serie)
                                }}>
                                Editar
                            </button>
                        </div>
                    </div>
                </div>
                )
            })} 
        </div>
        
    )
}

class TabelaSeries extends Component{
    
    render(){

        // passando a funçao deleta como parametro junto de series
        const {series, deleta, consulta} = this.props

        return(
            <div className="card mt-5">
                <div className="card-header">
                    <h5 className="text-center">Lista de Séries</h5>
                </div>
                    <ListaSeries series={series} deleta={deleta} consulta={consulta}/>
            </div>
        )
    }
}

export default TabelaSeries;
