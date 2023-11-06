import './bootstrap.min.css';
import './App.css';
import EmotionTable from './EmotionTable.js';
import React from 'react';

class App extends React.Component {
  state = {
    innercomp: <textarea rows="4" cols="50" id="textinput" />,
    mode: "text",
    sentimentOutput: [],
  }

  renderOutput = (input_mode) => {
    let rows = 1;
    let mode = "url";
    if (input_mode === "text") {
      mode = "text";
      rows = 4;
    }
    this.setState({
      innercomp: <textarea rows={rows} cols="50" id="textinput" />,
      mode: mode,
      sentimentOutput: [],
    });
  }

  sendForSentimentAnalysis = () => {
    let url = ".";
    let mode = this.state.mode;
    url = url + "/" + mode + "/sentiment?" + mode + "=" + document.getElementById("textinput").value;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let output = data.label;
        this.setState({ sentimentOutput: output });
      })
      .catch((error) => {
        console.error("Error analyzing sentiment:", error);
      });
  };

  sendForEmotionAnalysis = () => {
    this.setState({ sentiment: false });
    let url = ".";
    let mode = this.state.mode;
    url = url + "/" + mode + "/emotion?" + mode + "=" + document.getElementById("textinput").value;

    fetch(url)
      .then((response) => {
        response.json()
          .then((data) => {
            this.setState({ sentimentOutput: <EmotionTable emotions={data} /> });
          });
      });
  }

  componentDidMount() {
    document.title = 'Sentiment Analyzer';
  }

  render() {
    return (
      <div className="App">
        <button className="btn btn-info" onClick={() => { this.renderOutput('text') }}>Text</button>
        <button className="btn btn-dark" onClick={() => { this.renderOutput('url') }}>URL</button>
        <br /><br />
        {this.state.innercomp}
        <br />
        <button className="btn-primary" onClick={this.sendForSentimentAnalysis}>Analyze Sentiment</button>
        <button className="btn-primary" onClick={this.sendForEmotionAnalysis}>Analyze Emotion</button>
        <br />
        <div style={{ color: this.state.sentimentOutput === "positive" ? "green" : this.state.sentimentOutput === "negative" ? "red" : this.state.sentimentOutput === "neutral" ? "yellow" : "black", fontSize: 20 }}>
          {this.state.sentimentOutput}
        </div>
      </div>
    );
  }
}

export default App;
