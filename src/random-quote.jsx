import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const RandomQuote = () => {
  const [author, setAuthor] = useState("");
  const [quote, setQuote] = useState("");
  const [color, setColor] = useState("#395697");

  useEffect(() => {
    // Get New quote
    getQuote();
  }, []);

  const getQuote = () => {
    let url =
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

    axios.get(url).then((res) => {
      let data = res.data.quotes;
      let quoteNum = Math.floor(Math.random() * data.length);
      let randomQuote = data[quoteNum];

      setAuthor(randomQuote["author"]);
      setQuote(randomQuote["quote"]);
    });
  };

  const getNewColor = () => {
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
    const randomColor = colours[colourNum];

    setColor(randomColor);
  };

  const getNewQuote = () => {
    getQuote();
    getNewColor();
  };

  const textStyle = {
    color: `${color}`,
    borderColor: `${color}`,
    borderWidth: "2px"
  };

  const backgroundStyle = {
    backgroundColor: `${color}`
  };

  return (
    <div className="background" style={backgroundStyle}>
      <h1>Random Quote Generator</h1>
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
            className="new-quote-btn"
            onClick={getNewQuote()}
            style={textStyle}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomQuote;
