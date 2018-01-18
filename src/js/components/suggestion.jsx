import React from 'react';

class Suggestion extends React.Component {
    handleClick = () => {
        this.props.switchOutput(this.props.text,this.props.index)
    }
    render(){
        return(
            <div className={`textConventer__suggestion${this.props.isActive ? '--active' : ''}`} onClick={this.handleClick}role="button" tabIndex="0">
                {this.props.text}
            </div>
        );
    }
}

export {Suggestion}