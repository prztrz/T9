import React from "react";
import {TextConventerOutput} from './textConventerOutput.jsx'
import {TextConventerControler} from './textConventerControler.jsx'
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
            currentInputIndex: 0,
            suggestions: [],
            activeSuggestion: 0
        }
    }
   
    expandNumericInput = (key, pos, currentInput) => {
        let input = this.state.numericInput;
        if (pos >= input.length) {
            input += key;
        } else {
            input = `${input.substr(0,pos)}${key}${input.substr(pos)}`
        }
        this.setState({
            numericInput: input,
            splittedNumericInput: input.split("0"),
            currentInputIndex: currentInput
        }, this.updateOutput)
    }

    narrowNumericInput = (key, start, end, currentInput) => {
        let input = this.state.numericInput;
        if (start !== end) {
            input = input.substr(0,start) + input.substr(end)
        } else {
            if (key==="Backspace") {
                input = input.substr(0,start-1) + input.substr(start);
            }

            if (key==="Delete") {
                input = input.substr(0,start) + input.substr(start+1);
            }
        }
        this.setState({
            numericInput: input,
            splittedNumericInput: input.split("0"),
            currentInputIndex: currentInput
        }, () => {
            this.updateOutput(true)
        })
    }

    getSuggestions = input => {
        return this.trie.getExpansions(input);
    }

    updateOutput = (isDeleting) => {
        const inputIndex = this.state.currentInputIndex;
        const input = this.state.numericInput;
        const splitted = this.state.splittedNumericInput;
        const currentInput = splitted[inputIndex];
        const output = this.state.output.slice();
        const suggestions = currentInput === undefined ? [] : this.getSuggestions(currentInput);

        if (!currentInput && isDeleting) {
            output.pop();
        } else {
            if (input.length > 0) {
                let currentOutput = suggestions[0] || (output[inputIndex] + currentInput[currentInput.length-1]) || '';
                output[inputIndex] = currentOutput;
                if (isDeleting && output[inputIndex + 1] === "") {
                    output.pop();
                }
            } else {
                output.length = 0;
            }
        }
        this.setState({
            output: output,
            suggestions: suggestions,
            activeSuggestion: 0
        })
    }

    switchOutput = (text, suggestionIndex) => {
        const inputIndex = this.state.currentInputIndex;
        const output = this.state.output.slice();
        output[inputIndex] = text;
        this.setState({
            output: output,
            activeSuggestion: suggestionIndex,
        })
    }

    render(){
        return(
            <div className="textConventer">
                <TextConventerOutput numericInput={this.state.numericInput} output={this.state.output} expandNumericInput={this.expandNumericInput} narrowNumericInput={this.narrowNumericInput}/>
                <TextConventerControler suggestions={this.state.suggestions} activeSuggestion={this.state.activeSuggestion} switchOutput={this.switchOutput}/>
            </div>
        );
    }
}

export {TextConventer}