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
            usuarios : [],
            csrf_token : this.props.page.csrf_token
        };
    }

    setLoader(status){
        this.setState({loader : status})
    }

    componentDidMount(){
        const { usuarios } = this.props.page;
        if(usuarios){
            this.setState({usuarios});
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
                send_form('/usuarios/send', {
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
                        <a href="/usuarios/insert" className="button">Adicionar</a>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>#id</th>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th width={210}>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.usuarios.length ? this.state.usuarios.map((usuario,index) =>
                                <tr key={index}>
                                    <td>#{usuario.id}</td>
                                    <td>{usuario.name}</td>
                                    <td>{usuario.email}</td>
                                    <td>
                                        <a href={`/usuarios/update/${usuario.id}`} className="button">Editar</a>
                                        <a onClick={() => this.remove(usuario.id)} className="button">Excluir</a>
                                    </td>
                                </tr>
                            ) : <tr><td colSpan={4}>Nenhum registro encontrado</td></tr>}
                        </tbody>
                    </table>
                </div>

            </Template>
        )
    }
}
