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
        console.log(e.key,e.target.selectionStart, e.target.selectionEnd)
        if (e.key === "ArrowLeft") {
            this.handleArrowLeft(e);
        }

        if (e.key === "ArrowRight") {
            this.handleArrowright(e);
        }
        
        if (e.key.match(/[0-9]/)) {
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
            this.textArea.selectionStart = cursorPos;
            outputIndex--;
            console.log('curpos', cursorPos, outputIndex)
            this.props.expandNumericInput(e.key)
        }
    }

    handleArrowLeft = e => {
        let cursorPos = e.target.selectionStart;
        const spaces = this.getSpaces().filter(pos => pos<cursorPos);
        cursorPos = spaces[spaces.length-1];

        this.textArea.selectionStart=cursorPos;
    }

    handleArrowright = e => {
        let cursorPos = e.target.selectionStart;
        const spaces = this.getSpaces().filter(pos => pos>cursorPos);
        cursorPos = spaces[0]-1 //|| cursorPos-1

        this.textArea.selectionStart=cursorPos;
    }
    
    render(){
        console.log(this.state.output)
        return(
            <div className="textConventer__output">
                <div className="textConventer__inputGroup">
                    <textarea  
                        name="textConventer__input" 
                        className="textConventer__input" 
                        id="textConventer__input" 
                        value={this.state.output.length > 0 ? this.state.output.reduce((prev,curr) => `${prev} ${curr}`) : ''}
                        onKeyDown={this.handleKeyDown}
                        ref={t => this.textArea = t}
                    />
                </div>
            </div>
        );
    }
}

export {TextConventerOutput}