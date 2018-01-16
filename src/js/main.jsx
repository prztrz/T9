import React from "react";
import ReactDOM from 'react-dom';
import {Header} from './components/header.jsx'
import {Content} from './components/content.jsx'
require('../css/app.scss');

class Main extends React.Component {
    render(){
        return(
            <div>
                <Header />
                <Content />
            </div>
        );
    }
}


document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <Main />,
        document.getElementById('app')
    );
})