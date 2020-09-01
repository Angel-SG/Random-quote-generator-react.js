import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

class RandomQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      quote: "",
      colour: "#395697"
    };
  }

  componentDidMount() {
    this.getQuote();
  }

  getQuote() {
    let url =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

    axios.get(url).then(res => {
      let data = res.data.quotes;
      let quoteNum = Math.floor(Math.random() * data.length);
      let randomQuote = data[quoteNum];

      this.setState({
        quote: randomQuote["quote"],
        author: randomQuote["author"]
      });
    });
  }

  getNewColor = () => {
    const colours = [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857"
    ];

    const colourNum = Math.floor(Math.random() * colours.length);
    const randomColour = colours[colourNum];

    this.setState({
      colour: randomColour
    });
  };

  getNewQuote = () => {
    this.getQuote();
    this.getNewColor();
  };

  render() {
    const { quote, author, colour } = this.state;

    const textStyle = {
      color: `${colour}`,
      borderColor: `${colour}`
    };

    const backgroundStyle = {
      backgroundColor: `${colour}`
    };

    return (
      <div className="background" style={backgroundStyle}>
        <h1>Random Quote Machine</h1>
        <div id="quote-box">
          <h2 id="text" style={textStyle}>
            {quote}
          </h2>
          <h4 id="author" style={textStyle}>
            {author}
          </h4>
          <div id="buttons">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${quote} ${author}`}
              target="_blank"
              title="Post this quote on twitter!"
              rel="noopener noreferrer"
            >
              <span>
                <FontAwesomeIcon icon={faTwitter} style={textStyle} />
              </span>
            </a>
            <button
              id="new-quote"
              className="buttons"
              onClick={this.getNewQuote}
              style={textStyle}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RandomQuote;
