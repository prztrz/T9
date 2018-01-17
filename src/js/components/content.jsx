import React from 'react';
import {TextConventer} from './textConventer.jsx'
class Content extends React.Component {
    render(){
        return(
            <main className="sectionMain">
                <div className="container">
                    <TextConventer />
                </div>
            </main>
        );
    }
}

export {Content}