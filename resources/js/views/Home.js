import React, { Component } from 'react';
import Template from '../components/Template';
import Loader from '../components/Loader';
import { send_form } from '../services/api';

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loader : false,
            title : this.props.page.title
        };
    }

    setLoader(status){
        this.setState({loader : status})
    }

    render(){
        return(
            <Template {...this.props} title={this.state.title} alignMain={'center'}>

                {this.state.loader ?
                    <Loader />
                : null}

                <h2 className="titleHome">Bem vindo ao sistema de prestadores de serviços</h2>

            </Template>
        )
    }
}
