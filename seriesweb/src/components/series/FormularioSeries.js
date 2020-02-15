import React, { Component } from 'react';
// import { super } from '@babel/types';

class FormularioSeries extends Component {

    constructor(){
        super()
       
    }

    // metodo generico para chamar os valores
    inputHandler = (e) => {
        // console.log(e.target.name)
        //pegando o atributo name dentro do target, pegando o valor atual do value
        const {name, value} = e.target
        //atualizar com o valor que o usuario digitou
        // this.setState({[name]: value})
        this.props.inputHandler(name, value)
    }

    enviaDados = (e) => {
        e.preventDefault()
        //acessando uma função do props
        this.props.enviaDados(this.state)
        //renderizando todos os campos vazios
        this.setState(this.stateInicial)
        // console.log(this.state.nome)
    }

    render(){
        const {serie} = this.props
        return (
            <div className="card mt-5">
                <div className="card-header">
                    Cadastro de Séries
                </div>
                <div className="card-body">
                    <form method="post" onSubmit={this.enviaDados}>
                        <div className="form-group">
                            <label htmlFor='nome'>Nome</label>
                            <input className="form-control mb-2" type="text" id='nome' name='nome' 
                            value={serie.nome}
                            onChange={this.inputHandler}
                            />
                            <label htmlFor='lancamento'>Ano de lançamento</label>
                            <input className="form-control" type="text" id='lancamento' name='lancamento'
                            value={serie.lancamento}
                            onChange={this.inputHandler}
                            />
                            <label htmlFor='temporadas'>Temporadas</label>
                            <input className="form-control" type="text" id='temporadas' name='temporadas'
                            value={serie.temporadas}
                            onChange={this.inputHandler}
                            />
                            <label htmlFor='sinopse'>Sinopse</label>
                            <textarea className="form-control" id='sinopse' name='sinopse'
                            value={serie.sinopse}
                            onChange={this.inputHandler}></textarea>
                            {/* mt seria a margin top, mb a margin bottom e assim por diante */}
                            <button className="btn btn-success form-control mt-3" type="submit">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        )
        
    }
}

export default FormularioSeries;
