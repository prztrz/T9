import React from 'react';
import {TextConventer} from './textConventer.jsx'
class Content extends React.Component {
    render(){
        return(
            <main className="sectionMain">
                <TextConventer />
            </main>
        );
    }
}

export {Content}