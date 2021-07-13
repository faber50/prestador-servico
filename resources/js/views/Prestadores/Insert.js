import React, { Component } from 'react';
import Template from '../../components/Template';
import Loader from '../../components/Loader';
import { send_form } from '../../services/api';
import InputMask from 'react-input-mask';

export default class List extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loader : false,
            title : this.props.page.title,
            fields : {},
            csrf_token : this.props.page.csrf_token,
            servicos : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.state.fields[event.target.name] = event.target.value;
        this.setState({fields : this.state.fields});
    }

    handleSubmit(event, typeAction) {
        try
        {
            this.state.fields['typeAction'] = typeAction;
            send_form(event.target.action, this.state.fields, event.target.method, this.state.csrf_token, (status) => {this.setLoader(status)});
        }
        catch(ex)
        {
            console.log(ex);
        }

        event.preventDefault();
    }

    setLoader(status){
        this.setState({loader : status})
    }

    componentDidMount(){
        const {servicos} = this.props.page;
        if(servicos){
            this.setState({servicos});
        }
    }

    render(){
        return(
            <Template {...this.props} title={this.state.title}>

                {this.state.loader ?
                    <Loader />
                : null}

                <div className="boxCenter">
                    <h2 className="title">{this.state.title}</h2>
                    <div className="boxForm">
                        <form action="/prestadores/send" method="post" onSubmit={(e) => this.handleSubmit(e,'insert')}>
                            <div className="row">
                                <div className="col col-xs-12 col-sm-12 col-md-12">
                                    <label>Nome</label>
                                    <div className="field">
                                        <input type="text" id="nome" name="nome" onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-xs-12 col-sm-12 col-md-12">
                                    <label>E-mail</label>
                                    <div className="field">
                                        <input type="email" id="email" name="email" onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-xs-12 col-sm-12 col-md-12">
                                    <label>Telefone</label>
                                    <div className="field">
                                        <InputMask mask="+55 (99) 9999-9999" maskChar="" id="telefone" name="telefone" onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-xs-12 col-sm-12 col-md-12">
                                    <label>Idade</label>
                                    <div className="field">
                                        <InputMask mask="99" maskChar="" id="idade" name="idade" onChange={this.handleChange} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-xs-12 col-sm-12 col-md-12">
                                    <label>Serviço</label>
                                    <div className="field">
                                        <select id="idServico" name="idServico" onChange={this.handleChange}>
                                            <option value={0}>Selecione</option>
                                            {this.state.servicos ? this.state.servicos.map((servico,index)=>
                                                <option key={index} value={servico.id}>{servico.nome}</option>
                                            ) : null}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col col-xs-12 col-sm-12 col-md-12">
                                    <button type="submit" className="button">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </Template>
        )
    }
}
