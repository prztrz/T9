import React from 'react';
import {TextConventerSuggestions} from './textConventerSuggestions.jsx'

class TextConventerKeyboard extends React.Component {
    render(){
        return(null);
    }
}


class TextConventerControler extends React.Component {
    render(){
        return(
            <div className="textConventer__control">
                <TextConventerKeyboard />
                <TextConventerSuggestions suggestions={this.props.suggestions} activeSuggestion={this.props.activeSuggestion} switchOutput={this.props.switchOutput}/>
            </div>
        );
    }
}

export {TextConventerControler}