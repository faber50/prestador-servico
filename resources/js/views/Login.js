import React, { Component } from 'react';
import Template from '../components/Template';
import Loader from '../components/Loader';
import { send_form } from '../services/api';

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loader : false,
            title : this.props.page.title,
            fields : {},
            csrf_token : this.props.page.csrf_token
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

    render(){
        return(
            <Template {...this.props} title={this.state.title} is_login={true} alignMain={'center'}>

                {this.state.loader ?
                    <Loader />
                : null}

                <form action="/usuarios/send" method="post" onSubmit={(e) => this.handleSubmit(e,'login')}>
                    <div className="row">
                        <div className="col col-xs-12 col-sm-12 col-md-12">
                            <label>E-mail</label>
                            <div className="field">
                                <input type="text" id="email" name="email" onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xs-12 col-sm-12 col-md-12">
                            <label>Senha</label>
                            <div className="field">
                                <input type="password" id="password" name="password" onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-xs-12 col-sm-12 col-md-12">
                            <button type="submit" className="button">Login</button>
                        </div>
                    </div>
                </form>

            </Template>
        )
    }
}
