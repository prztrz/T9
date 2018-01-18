import React from 'react';

class TextConventerOutput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            output: this.props.output,
            numericInput: this.props.numericInput
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.state.output !== nextProps.output){
            this.setState({
                output: nextProps.output
            })
        }

        if (this.state.numericInput !== nextProps.numericInput)
            this.setState({
                numericInput: nextProps.numericInput
            }, () => {
                this.textArea.selectionStart = this.cursorPos
            })
    }

    getSpaces = () => {
       //returns array with 0, all indexes of "0" in numeric input" and length on numeric input 
       let input = this.state.numericInput;
       const spaces = [0]; 
       for (let i=0; i<input.length; i++){
            if (input[i]==="0") {
                spaces.push(i)
            }
       }
       spaces.push(input.length);
       return spaces;
    }

    handleKeyDown = e => {
        if (e.key === "ArrowLeft") {
            this.handleArrowLeft(e);
        }

        if (e.key === "ArrowRight") {
            this.handleArrowright(e);
        }
        
        if (e.key.match(/[0-9]/)) {
            this.handleInput(e)
        }

        if (e.key==="Backspace" || e.key==="Delete") {
            this.handleDelete(e)
        }
    }

    handleDelete = e => {
        const params = this.getOutputParams(e)
        const outputIndex = params.output;
        const position = params.pos
        this.props.narrowNumericInput(e.key, this.textArea.selectionStart, this.textArea.selectionEnd, outputIndex)
        //set cursor position after handling deleting (position-1 if Backspace and position if Delete)
        let posAfterDel = e.key==="Delete"
    }

    handleArrowLeft = e => {
        let cursorPos = e.target.selectionStart;
        const spaces = this.getSpaces().filter(pos => pos<cursorPos);
        cursorPos = spaces[spaces.length-1];

        this.textArea.selectionStart=cursorPos;
        this.props.setCursorPosition(cursorPos);
    }

    handleArrowright = e => {
        let cursorPos = e.target.selectionStart;
        const spaces = this.getSpaces().filter(pos => pos>cursorPos);
        cursorPos = spaces[0]-1 

        this.textArea.selectionStart=cursorPos;
        this.props.setCursorPosition(cursorPos);
    }


    handleInput = e => {
        const params = this.getOutputParams(e);
        const cursorPos = params.pos;
        const outputIndex = params.output;

        console.log('curpos', cursorPos, outputIndex)
        this.props.expandNumericInput(e.key, cursorPos,outputIndex)
        //set cursor position after input is handled on the textArea i.e. cursor position + 1
        this.props.setCursorPosition(cursorPos+1);
    }

    getOutputParams = e => {
        // returns object with cursor position (pos prop) and index of current input in splittedNumericInput array (output prop)
        let cursorPos = e.target.selectionStart
        const spaces = this.getSpaces();
        let outputIndex = spaces.indexOf(cursorPos)

        if(outputIndex === -1){
            const reducedSpaces = spaces.map((pos,i) => {
                    return {
                        pos: pos,
                        i: i
                    }
                }).filter(obj => obj.pos > cursorPos)
            cursorPos = reducedSpaces[0].pos
            outputIndex = reducedSpaces[0].i
        }
        
        (outputIndex > 0 && e.key !== "0")&& outputIndex--;
        return {
            pos: cursorPos,
            output: outputIndex
        }
    }
    
    render(){
        return(
            <div className="textConventer__output">
                <div className="textConventer__inputGroup">
                    <textarea  
                        name="textConventer__input" 
                        className="textConventer__input" 
                        id="textConventer__input" 
                        value={this.state.output.length > 0 ? this.state.output.reduce((prev,curr) => `${prev} ${curr}`) : ''}
                        onKeyDown={this.handleKeyDown}
                        onClick={this.handleClick}
                        ref={t => this.textArea = t}
                    />
                </div>
            </div>
        );
    }
}

export {TextConventerOutput}