const axios = require('axios');
import Swal from 'sweetalert2';

export const api = async function post(REQUEST, DATA = {}, METHOD = 'POST', csrf_token){
    const url_request = REQUEST;

    const settings = {
        method: METHOD,
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json',
            'X-CSRF-TOKEN' : csrf_token
        },
        body: JSON.stringify(DATA)
    };

    const data = await fetch(url_request, settings)
    .then(response => response.json())
    .then(response => {
        return response;
    })
    .catch(e => {
        return e;
    });

    return data;
};

export const send_form = function send_form(action, fields, method, csrf_token, setLoader = () => {}, callSuccess = () => {}){
    if(fields.typeAction){
        setLoader(true);
        api(action,fields,method, csrf_token).then((success) => {
            callSuccess(success);
            if(success.status)
            {

                if(success.msg)
                {
                    Swal.fire({
                        icon: 'success',
                        title : success.msg,
                        showConfirmButton: false,
                        timer: 1500
                    }).then((result) => {
                        if(success.redirect){
                            window.location.href = success.redirect;
                        }
                        if(success.reload){
                            document.location.reload(true);
                        }
                    });
                }
                else
                {
                    if(success.redirect)
                    {
                        window.location.href = success.redirect;
                    }
                    if(success.reload)
                    {
                        document.location.reload(true);
                    }
                }
            }
            else if(success.errors)
            {
                var listErrors = '';
                $.each( success.errors, function( key, value ) {
                    listErrors += '- '+value+'\n';
                });
                Swal.fire(listErrors);
            }
            else
            {
                Swal.fire(success.msg);
            }
            setLoader(false);
        }).catch((error) => {
            console.log(error);
            setLoader(false);
            Swal.fire('Ops, ocorreu um erro ao tentar enviar as informações 1');
        });
    }else{
        console.log('error');
        Swal.fire('Ops, ocorreu um erro ao tentar enviar as informações 2');
    }
}
