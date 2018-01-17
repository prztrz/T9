import React from "react";
import {TextConventerOutput} from './TextConventerOutput.jsx'

class TextConventer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            output: [],
            numericInput: '',
            suggestions: []
        }
    }

    updateNumericInput = key => {
        if (key.match(/[0-9]/)) {
            this.setState({
                numericInput: this.state.numericInput+key
            })
        }
    }

    render(){
        console.log(this.state.numericInput)
        return(
            <div className="textConventer">
                <TextConventerOutput output={this.state.output} updateNumericInput={this.updateNumericInput}/>
                {/* <TextConventerContoller /> */}
            </div>
        );
    }
}

export {TextConventer}