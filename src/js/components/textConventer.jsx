import React from "react";
import {TextConventerOutput} from './TextConventerOutput.jsx'
import Trie from './../classes/trie';
import words from 'an-array-of-english-words';

class TextConventer extends React.Component {
    constructor(props){
        super(props);
        this.trie = new Trie(words)
        this.state = {
            output: [],
            numericInput: '',
            splittedNumericInput: [],
            suggestions: []
        }
    }

    updateNumericInput = key => {
        if (key.match(/[0-9]/)) {
            this.setState({
                numericInput: this.state.numericInput+key,
                splittedNumericInput: (this.state.numericInput+key).split("0")
            }, this.updateOutput)
        }
    }

    getSuggestions = () => {
        const lastInput = this.state.splittedNumericInput[this.state.splittedNumericInput.length -1];
        return this.trie.getExpansions(lastInput);
    }

    updateOutput = () => {
        const input = this.state.numericInput;
        const splitted = this.state.splittedNumericInput;
        const lastInput = splitted[splitted.length -1];
        const suggestions = this.getSuggestions();
        const output = this.state.output.slice();
        if (splitted.length > 0) {
            let currentOutput
                currentOutput = suggestions[0] || (output[splitted.length-1] + lastInput[lastInput.length-1]) || '';
            output[splitted.length-1] = currentOutput;
        }

       
        this.setState({
            output: output,
            suggestions: suggestions
        })
    }

    render(){
        console.log(this.state.suggestions)
        return(
            <div className="textConventer">
                <TextConventerOutput output={this.state.output} updateNumericInput={this.updateNumericInput}/>
                {/* <TextConventerContoller /> */}
            </div>
        );
    }
}

export {TextConventer}