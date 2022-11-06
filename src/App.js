import './App.css';
import axios from "axios";
import { Reorder } from 'framer-motion';

export default function App() {

  // tt0109686 -- Dumb and Dumber
  // tt0110912 -- Pulp Fiction

  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/title/get-quotes',
    params: {tconst: 'tt0109686'},
    headers: {
      'X-RapidAPI-Key': 'd453e02aa5msh6f1231dd2c7667fp1c5e21jsnc057fcda871f',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
  };

  const randomize = (arr, num) => {
    const shuffleEntries = [...arr].sort(() => 0.5 - Math.random());

    return shuffleEntries.slice(0, num);
  }
  
  axios.request(options).then(function (response) {
    const quotes = response.data.quotes;

    console.log(quotes);
    
    const quotesArray = [];

    quotes.map((quote) => {
      const line = quote.lines[0].text;      
      if (typeof line === 'string') {
        quotesArray.push(line)
      };

      return quotesArray;
    })

    const requestedQuotes = randomize(quotesArray, 5);
    
    requestedQuotes.forEach((quote, index) => {
        // console.log(index, quote);
        const listItem = `<li key=${index}>${quote}</li>`; // create list item elements
        document.querySelector('.listContainer').innerHTML += listItem; // append to parent container
    });
  }).catch(function (error) {
    console.error(error);
  });

  return (
    <div className="App">
      <h1>Movie quotes</h1>
      <div className='listContainer'></div>
    </div>
  );
}

