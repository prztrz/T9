import React from 'react';

class TextConventerOutput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            output: this.props.output
        }
    }

    handleChange = e => {
        this.props.updateNumericInput(e.key)
    }
    render(){
        return(
            <div className="textConventer__output">
                <div className="textConventer__inputGroup">
                    <textarea  
                        name="textConventer__input" 
                        className="textConventer__input" 
                        id="textConventer__input" 
                        value={this.state.output}
                        onKeyDown={this.handleChange}
                    />
                </div>
            </div>
        );
    }
}

export {TextConventerOutput}