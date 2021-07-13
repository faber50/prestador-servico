import React, { Component } from 'react';
import Template from '../../components/Template';
import Loader from '../../components/Loader';
import { send_form } from '../../services/api';
import Swal from 'sweetalert2';

export default class List extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loader : false,
            title : this.props.page.title,
            servicos : [],
            csrf_token : this.props.page.csrf_token
        };
    }

    setLoader(status){
        this.setState({loader : status})
    }

    componentDidMount(){
        const { servicos } = this.props.page;
        if(servicos){
            this.setState({servicos});
        }
    }

    remove(id){
        Swal.fire({
            text: 'Deseja mesmo remover o item ?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#367fa9',
            confirmButtonText: 'Sim',
            cancelButtonColor: '#d73925',
            cancelButtonText: 'Não',
        }).then((result) => {
            if (result.value) {
                send_form('/servicos/send', {
                    typeAction: 'delete',
                    id: id
                }, 'post', this.state.csrf_token, (status) => {this.setLoader(status)});
            }
        });
    }

    render(){
        return(
            <Template {...this.props} title={this.state.title}>

                {this.state.loader ?
                    <Loader />
                : null}

                <div className="boxCenter">
                    <h2 className="title">{this.state.title}</h2>
                    <div className="buttons">
                        <a href="/servicos/insert" className="button">Adicionar</a>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>#id</th>
                                <th>Nome</th>
                                <th width={210}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.servicos.length ? this.state.servicos.map((servico,index) =>
                                <tr key={index}>
                                    <td>#{servico.id}</td>
                                    <td>{servico.nome}</td>
                                    <td>
                                        <a href={`/servicos/update/${servico.id}`} className="button">Editar</a>
                                        <a onClick={() => this.remove(servico.id)} className="button">Excluir</a>
                                    </td>
                                </tr>
                            ) : <tr><td colSpan={3}>Nenhum registro encontrado</td></tr>}
                        </tbody>
                    </table>
                </div>

            </Template>
        )
    }
}
