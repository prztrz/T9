import React from 'react';

class TextConventerOutput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            output: this.props.output
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.state.output !== nextProps.output){
            this.setState({
                output: nextProps.output
            })
        }
    }

    handleInput = e => {
        console.log(e.key,e.target.selectionStart, e.target.selectionEnd)
        this.props.updateNumericInput(e.key)
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
                        onKeyDown={this.handleInput}
                    />
                </div>
            </div>
        );
    }
}

export {TextConventerOutput}