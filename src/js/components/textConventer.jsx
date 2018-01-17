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

    expandNumericInput = key => {
        this.setState({
            numericInput: this.state.numericInput+key,
            splittedNumericInput: (this.state.numericInput+key).split("0")
        }, this.updateOutput)
    }

    narrowNumericInput = (key, start, end) => {
        let input = this.state.numericInput;
        if (start !== end) {
            
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
            let currentOutput = suggestions[0] || (output[splitted.length-1] + lastInput[lastInput.length-1]) || '';
            output[splitted.length-1] = currentOutput;
        }

       
        this.setState({
            output: output,
            suggestions: suggestions
        })
    }

    render(){
        return(
            <div className="textConventer">
                <TextConventerOutput numericInput={this.state.numericInput} output={this.state.output} expandNumericInput={this.expandNumericInput}/>
                {/* <TextConventerContoller /> */}
            </div>
        );
    }
}

export {TextConventer}