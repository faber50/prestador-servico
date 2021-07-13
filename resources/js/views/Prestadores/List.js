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
            prestadores : [],
            csrf_token : this.props.page.csrf_token
        };
    }

    setLoader(status){
        this.setState({loader : status})
    }

    componentDidMount(){
        const { prestadores } = this.props.page;
        if(prestadores && prestadores.data){
            this.setState({prestadores : prestadores.data});
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
                send_form('/prestadores/send', {
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
                        <a href="/prestadores/insert" className="button">Adicionar</a>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>#id</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Idade</th>
                                <th>Serviço</th>
                                <th width={210}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.prestadores.length ? this.state.prestadores.map((prestador,index) =>
                                <tr key={index}>
                                    <td>#{prestador.id}</td>
                                    <td>{prestador.nome}</td>
                                    <td>{prestador.email}</td>
                                    <td>{prestador.telefone}</td>
                                    <td>{prestador.idade}</td>
                                    <td>{prestador.servico.nome}</td>
                                    <td>
                                        <a href={`/prestadores/update/${prestador.id}`} className="button">Editar</a>
                                        <a onClick={() => this.remove(prestador.id)} className="button">Excluir</a>
                                    </td>
                                </tr>
                            ) : <tr><td colSpan={7}>Nenhum registro encontrado</td></tr>}
                        </tbody>
                    </table>
                </div>

            </Template>
        )
    }
}
