import { React, useState,  useEffect } from "react";

export default function CryptoCross() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);


   // Note: the empty deps array [] means
   // this useEffect will run once
   // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:5000/stocks/cross", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            'ticker': 'BTC-USD'
        })
    })
      .then(res => res.json())
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
            {items.data}
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