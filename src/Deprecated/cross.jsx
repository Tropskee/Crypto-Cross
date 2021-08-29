import { React, useState,  useEffect } from "react";
import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

export default function CryptoCross() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

  // Set what kind of datetime we want the data to have
  //const parseDate = timeParse("%Y-%m-%d %H:%M:%S");

  function parseData(parse) {
    return function(d) {
      d.date = parse(d.date);
      d.open = +d.Open;
      d.high = +d.High;
      d.low = +d.Low;
      d.close = +d.Close;
      d.volume = +d.Volume;
  
      return d;
    };
  }


   // Note: the empty deps array [] means
   // this useEffect will run once
   // similar to componentDidMount()
  useEffect(() => {
    const parseDate = timeParse("%Y-%m-%d");

    fetch("http://localhost:5000/stocks/cross", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            'ticker': 'BTC-USD'
        })
    })
      .then(res => res.text()) //res.json())
      .then(data => tsvParse(data, parseData(parseDate)))//, parseData(parseDate)))
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )

  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
    <div>
        <p>Stock Market Data From API</p>
        <ul>
            {items.map(item => <p>{item.date}</p>)}
        {/* {items.map(item => (
            <li key={item.id}>
            {item.ticker} {item.action}
            </li>
        ))} */}
        {/* <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData} onChange={handleChange} />
        <button type="submit">click</button>
      </form> */}
        </ul>
    </div>
    );
  }
}