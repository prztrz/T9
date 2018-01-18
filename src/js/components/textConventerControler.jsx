import React from 'react';
import {TextConventerSuggestions} from './textConventerSuggestions.jsx'

class TextConventerKeyboard extends React.Component {
    handleClick = e => {
        if (e.currentTarget.value.match(/[0-9]/))
        this.props.inputFromKeyboard(e.currentTarget.value)
    }
    render(){
        const smalls = ['','abc','def','ghi','jkl','mno','pqrs','tuv','wxyz','','space',''];
        const bigs = [1,2,3,4,5,6,7,8,9,"*",0,"#"];
        const btns = bigs.map((big,i) => <button className="textConventer__keyboardBtn" key={i} value={big} onClick={this.handleClick}>{big}<small>{smalls[i]}</small></button>)
        return(
            <div className="textConventer__keyboard">
                {btns}
            </div>
        );
    }
}


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