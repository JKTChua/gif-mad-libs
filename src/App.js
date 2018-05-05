import React, { Component } from 'react';
import { Button } from 'reactstrap';
import logo from './logo.svg';
import './App.css';
import storiesArray from './stories';

import Prompt from './components/Prompt';
import Story from './components/Story';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      started: false,
      finished: false,
      wordCount: 0,
      allWordsCount: 12,
      type: '',
      title: '',
      story: {},
      sentenceIndex: 0,
      termCounter: 0,
      username: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.submitWord = this.submitWord.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleStart(e) {
    e.preventDefault();

    const { username } = this.state;
    if (username) {
      this.selectRandomStory();
      this.setState({ started: true });
    }
  }

  submitWord(w) {
    var w = w || 'blank';
    if (w) {
      const { sentenceIndex, story, wordCount, termCounter } = this.state;
      story[sentenceIndex].searchedTerms.term.push(w);
      const queryURL = `https://api.giphy.com/v1/gifs/search?q=${w}&api_key=4Mzya536rzpSplNr9u7ihGTLd6ujV1SQ&rating=pg-13&limit=12`

      fetch(queryURL)
      .then(res => res.json())
      .then((res) => {
        const giphyResults = res.data;
        const randomGif = giphyResults[Math.floor(Math.random() * giphyResults.length)];
        story[sentenceIndex].searchedTerms.gif.push(randomGif);
        this.setState({
          wordCount: wordCount+1,
          termCounter: termCounter+1,
        });
        this.loopTermsToSearchForInput();
      });
    }
  }

  loopTermsToSearchForInput() {
    const { sentenceIndex, story, termCounter, wordCount, allWordsCount } = this.state;

    if (wordCount >= allWordsCount) {
      this.setState({
        finished: true,
      });
      return;
    }

    const searchTerms = story[sentenceIndex].termsToSearch;

    if (termCounter < searchTerms.length) {
      this.setState({
        type: searchTerms[termCounter]
      });
    } else if (termCounter >= searchTerms.length) {
      this.setState({
        sentenceIndex: sentenceIndex+1,
        termCounter: 0,
      });
      this.loopTermsToSearchForInput();
    }
  }

  selectRandomStory() {
    const {title, story} = storiesArray[Math.floor(Math.random() * storiesArray.length)];

    let allWordsCount = 0;
    for (let i = 0; i < story.length; i++) {
      allWordsCount = story[i].termsToSearch.length + allWordsCount;
    }
    this.setState({
      title,
      allWordsCount,
      story,
      type: story[0].termsToSearch[0],
    });
  }

  render() {
    const {
      username,
      allWordsCount,
      wordCount,
      title,
      story,
      type,
      started,
      finished } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">EGad libs</h1>
        </header>
        { ! started &&
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-6">
                <form name="form" onSubmit={this.handleStart}>
                  <div className="justify-content-center">
                    <label htmlFor="username" id="author-question">What's your name?</label>
                    <input
                      id="username"
                      type="text"
                      className="form-control"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                      autoFocus
                    />
                  </div>
                  <Button id="start-button" color="danger">Get Started</Button>
                </form>
              </div>
            </div>
          </div>
        }
        {started && ! finished &&
          <div className="container">
            <Prompt
              wordCount={wordCount}
              allWordsCount={allWordsCount}
              type={type}
              onSubmit={this.submitWord}
            />
          </div>
        }
        {started && finished &&
          <div className="container">
            <h1 id="story-title">{title}</h1>
            <h3 id="story-author"> by {username}</h3>
            <Story story={story} />
          </div>
        }
      </div>
    );
  }
}

export default App;
