import React from 'react';

class TextConventerKeyboard extends React.Component {
    render(){
        return(null);
    }
}

class Suggestion extends React.Component {
    handleClick = () => {
        console.log(this.props.index)
    }
    render(){
        return(
            <div className={`textConventer__suggestion${this.props.isActive && '--active'}`} onClick={this.handleClick}>
                {this.props.text}
            </div>
        );
    }
}

class TextConventerSuggestions extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            suggestions: this.props.suggestions,
            activeSuggestion: this.props.activeSuggestion
        }
    }

    componentWillReceiveProps(nextProps){
        if (this.state.suggestions !== nextProps.suggestions){
            this.setState({
                suggestions: nextProps.suggestions
            })
        }

        if (this.state.activeSuggestion !== nextProps.activeSuggestion) {
            this.setState({
                activeSuggestion: nextProps.activeSuggestion
            })
        }
    }
    render(){
        console.log('s',this.state.suggestions)
        const suggestions = this.state.suggestions.map((suggestion,i) => <Suggestion text={suggestion} key={i} index={i} isActive={i === this.state.activeSuggestion}/>)
        return(
            <div className="textConventer__suggestions">
                {suggestions}
            </div>
        );
    }
}

class TextConventerControler extends React.Component {
    render(){
        return(
            <div className="textConventer__control">
                <TextConventerKeyboard />
                <TextConventerSuggestions suggestions={this.props.suggestions} activeSuggestion={this.props.activeSuggestion}/>
            </div>
        );
    }
}

export {TextConventerControler}