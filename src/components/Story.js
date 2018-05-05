import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'reactstrap';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePhrases } from '../actions/phrasesActions';

class Story extends Component {
  constructor(props) {
    super(props);
    this.state = { sentenceCounter: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.word);
    this.setState({ word: '' });
    document.getElementById("word-input").focus();
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { story } = this.props;
    const { sentenceCounter } = this.state;
    const gifs = story[sentenceCounter].searchedTerms.gif;
    const terms = story[sentenceCounter].searchedTerms.term;
    for (let i = 0; i < gifs.length; i++) {
      const gifImg =
        gifs[i] ?
        (
          <img
            src={gifs[i].images.fixed_height.url}
            title={terms[i]}
            alt={terms[i]}
          />
        ) : (
          <span>{terms[i]}</span>
        );
      ReactDOM.render(gifImg, document.getElementById(`term${i}`));
    }
  }

  render() {
    const { story } = this.props;
    const { sentenceCounter } = this.state;
    const sentence = story[sentenceCounter].sentence;
    const button = sentenceCounter < story.length-1 ? (
      <Button id="start-button" color="danger" onClick={(e) => this.setState({ sentenceCounter: sentenceCounter+1 })}>Next Line</Button>
    ) : (
      <Button id="start-button" color="danger">Play Again?</Button>
    );

    return (
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="story-display" dangerouslySetInnerHTML={{__html: sentence}} />
          { button }
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

export default connect(mapStateToProps, mapActionsToProps)(Story);
