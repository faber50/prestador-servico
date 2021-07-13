import { App } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'
import $ from 'jquery';
window.jQuery = $;
window.$ = $;
global.jQuery = $;

const app = document.getElementById('app')

render(
    <App
        initialPage={JSON.parse(app.dataset.page)}
        resolveComponent={name => require(`./views/${name}`).default}
    />,
    app
)
