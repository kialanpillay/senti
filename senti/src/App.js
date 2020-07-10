import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      response: [],
      classification: "",
      score: [],
      res: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleAnalysis = this.handleAnalysis.bind(this);
  }

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleAnalysis = () => {
    let params = {
      text: this.state.text,
    };

    let query = Object.keys(params)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
      .join("&");

    let url = "http://127.0.0.1:5000/senti/" + query;
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          response: result,
          res: true,
          score: result.score,
          classification: result.classification,
        });
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        console.log(this.state);
      });
  };

  render() {
    return (
      <div className="App">
        <header>
          <h6 id="footer">&copy; kialan pillay c/o alpha q labs</h6>
          <h1 id="brand">SENTI</h1>
          <h2 id="tag">blazingly fast sentiment analysis</h2>
        </header>

        <Container id="container">
          <div id="input">
            <InputGroup className="mb-3" size="lg">
              <FormControl
                placeholder="your text here"
                onChange={this.handleChange}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={() => this.handleAnalysis()}
                >
                  analyse
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <h4 id="result" hidden={!this.state.res}>
            naive bayes indicates that your text is{" "}
            {this.state.classification.toLowerCase()}
          </h4>
          <h4 id="result" hidden={!this.state.res}>
            vader says the sentiment score is {this.state.score.compound}
          </h4>
        </Container>
      </div>
    );
  }
}
