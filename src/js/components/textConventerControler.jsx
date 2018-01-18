import React from 'react';
import {TextConventerSuggestions} from './textConventerSuggestions.jsx'
import {TextConventerKeyboard} from './textConventerKeyboard.jsx'


class TextConventerControler extends React.Component {
    render(){
        return(
            <div className="textConventer__control">
                <TextConventerKeyboard inputFromKeyboard={this.props.inputFromKeyboard}/>
                <TextConventerSuggestions suggestions={this.props.suggestions} activeSuggestion={this.props.activeSuggestion} switchOutput={this.props.switchOutput}/>
            </div>
        );
    }
}

export {TextConventerControler}