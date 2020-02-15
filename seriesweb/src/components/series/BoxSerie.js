import React, { Component } from 'react';
import FormularioSeries from './FormularioSeries';
import TabelaSeries from './TabelaSeries';

class BoxSeries extends Component{

     //construtor
  constructor(){
    super()
    this.novaSerie = {
        nome: '',
        lancamento: '',
        temporadas: '',
        sinopse: ''
    }
    this.state = {
      series: [],
      serie: this.novaSerie
    }
  }

  //auterando dados de um componente interno
  async componentDidMount(){
    let resposta = await fetch('http://localhost:3000/series') 
    const series = await resposta.json()
    // console.log(series)
    this.setState({series: series})

  }

  enviaDados = async () => {    
    console.log('enviando dados....')
    let { serie } = this.state
    const method = serie.id ? 'PUT' : 'POST'
    const params = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(serie)
           
    }
    const urlParam = serie.id || ''
    try{ 
        const retorno = await fetch('http://localhost:3000/series/' + urlParam, params)
        console.log('enviado com sucesso!!!')
        serie = await retorno.json()
        if(retorno.status === 201){
            this.setState({
                //recebendo a serie 
                series: [...this.state.series, serie], 
                //atualizando a serie para o estado inicial
                serie: this.novaSerie
            })
        }
        
        if(retorno.status === 200){
            return this.setState({
              series: this.state.series.map(s => s.id == serie.id ? serie : s ),
              serie: this.novaSerie
            })
        }
    }catch(erro){
        console.log(erro)
    }
  }

  //recebendo o id na hora de deletar
    deleta = async (id) => {
        // console.log(id)
        const seriesAtual = this.state.series
        const params = { 
            method: 'DELETE',

        }
        const retorno = await fetch('http://localhost:3000/series/' + id, params)
        if(retorno.status === 204){
            this.setState({
                // percorrendo as series atraves do filtro
                series: seriesAtual.filter((serie) => {
                    return serie.id !== id
                })
            })
        }
    }

    inputHandler = (name, value) => {
        //pegando o que tem na serie, e alterando para um novo valor (ou atualizando)
        this.setState({serie: {...this.state.serie, [name]: value}})
        // console.log(this.state.serie)
    }

    //pegando a serie q esta recebendo e dando um state nela, para assim trazer ela para o formulario
    consulta = (serie) => {
        this.setState({serie: serie})
    }

    render(){
        return(
            // o react sempre retorna um elemento unico, portanto deve ter algo segurando ele, por ex a div
            <div className="container">
                <div className="row">
                <div className="col-md-4">
                    <FormularioSeries
                        serie={this.state.serie} 
                        enviaDados={this.enviaDados}
                        inputHandler={this.inputHandler}
                    />
                </div>
                <div className="col-md-8">
                    {/* passando uma propriedade na qual a tabela terá acesso a lista de series/ as series */}
                    <TabelaSeries series={this.state.series} deleta={this.deleta} consulta={this.consulta}/>

                </div>
                </div>
            </div>
        )
    }
}

export default BoxSeries;

 /* podemos passar uma propriedade 
    <TabelaSeries teste = 'isto é uma propriedade' que esta na TabelaSeries   
    
    
    props -> passar metodos ou funções de um para o outro, ele da acesso
*/

// substituindo o nome do campo pelo o que esta no banco
// serie.ano_lancamento = serie.lancamento
// delete serie.lancamento
