import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePhrases } from '../actions/phrasesActions';

class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = { word: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onUpdatePhrases = this.onUpdatePhrases.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.word);
    this.setState({ word: '' });
    document.getElementById("word-input").focus();
  }

  onUpdatePhrases(e) {
    this.props.onUpdatePhrases({});
  }

  render() {
    const { word } = this.state;
    const { type, wordCount, allWordsCount } = this.props;
    return (
      <div className="row justify-content-center">
        <div className="col-6">
          <form onSubmit={this.handleSubmit}>
            <div className="justify-content-center">
              <label htmlFor="word-input" id="word-question" >WORD {wordCount+1} OF {allWordsCount+1}</label>
              <label htmlFor="word-input" id="term-question">{type}</label>
              <input
                id="word-input"
                name="word"
                type="text"
                value={word}
                onChange={this.handleChange}
                autoFocus
              />
            </div>
            <Button id="start-button" color="danger">Enter Next Word</Button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  phrases: state.phrases,
});

const mapActionsToProps = (dispatch, props) => (bindActionCreators({
  onUpdatePhrases: updatePhrases,
}));

export default connect(mapStateToProps, mapActionsToProps)(Prompt);
