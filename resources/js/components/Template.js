import React, { Component } from 'react';

export default class Template extends Component{
    state = {
        title : this.props.title,
        site_name : 'Prestadores de Serviço'
    };

    componentDidMount(){
        document.title = `${this.state.title} - ${this.state.site_name}`;
    }

    render(){
        return(
            <div className="wrapper">
                 <header className={!this.props.is_login ? 'header interno' : 'header'}>
                    <div className="boxCenter">
                        <h1>{this.state.site_name}</h1>
                        {!this.props.is_login ? <Menu /> : null}
                    </div>
                </header>
                <div className={`main ${this.props.alignMain}`}>
                    {this.props.children}
                </div>
                <footer className="footer">
                    <div className="boxCenter">
                        <p>Copyright © 2021</p>
                    </div>
                </footer>
            </div>
        )
    }
}

export class Menu extends Component{
    render(){
        return(
            <ul className="menu">
                <li>
                    <a href="/prestadores">Prestadores</a>
                </li>
                <li>
                    <a href="/servicos">Serviços</a>
                </li>
                <li>
                    <a href="/usuarios">Usuários</a>
                </li>
                <li>
                    <a href="/logout">Sair</a>
                </li>
            </ul>
        )
    }
}
