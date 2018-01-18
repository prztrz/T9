import React from 'react';
import {Suggestion} from './suggestion.jsx'

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
        const suggestions = this.state.suggestions.map((suggestion,i) => <Suggestion text={suggestion} key={i} index={i} isActive={i === this.state.activeSuggestion} switchOutput={this.props.switchOutput}/>)
        return(
            <div className="textConventer__suggestions">
                {suggestions}
            </div>
        );
    }
}

export {TextConventerSuggestions}