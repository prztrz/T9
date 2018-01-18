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
        const position = params.pos-1 > 0 ? params.pos-1 : 0;
        this.props.narrowNumericInput(e.key, this.textArea.selectionStart, this.textArea.selectionEnd, outputIndex)
        this.props.setCursorPosition(position);
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
        this.props.setCursorPosition(cursorPos+1);
    }

    getOutputParams = e => {
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
        if (this.textArea)
        console.log(this.textArea.selectionStart || "xx");
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