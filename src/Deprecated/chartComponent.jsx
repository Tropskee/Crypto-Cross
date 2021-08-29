// import React from 'react';
// import { render } from 'react-dom';
// import Chart from './chart';
// import { getData } from "../Components/utils"

// import { TypeChooser } from "react-stockcharts/lib/helper";

// class ChartComponent extends React.Component {
// 	componentDidMount() {
// 		getData().then(data => {
// 			this.setState({ data })
// 		})
// 	}
// 	render() {
// 		if (this.state == null) {
// 			return <div>Loading...</div>
// 		}
// 		return (
// 			<TypeChooser>
// 				{type => <Chart type={type} data={this.state.data} />}
// 			</TypeChooser>
// 		)
// 	}
// }

// render(
// 	<ChartComponent />,
// 	document.getElementById("root")
// );

// export default ChartComponent;

// import { React, useState, useEffect } from 'react';
// import Chart from './chart'; // Chart formatting and visualizations
// import { tsvParse } from  "d3-dsv";
// import { timeParse } from "d3-time-format";
// // import { getData } from "./utils" // Fetches API data and returns into getData
// import { TypeChooser } from "react-stockcharts/lib/helper"; // Displays chosen chart 

// export default function ChartComponent() {
// 	const [error, setError] = useState(null);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [items, setItems] = useState([]);
    
//     // Format data for chart reader
//     function parseData(parse) {
//         return function(d) {
//             d.date = parse(d.date);
//             d.open = +d.Open;
//             d.high = +d.High;
//             d.low = +d.Low;
//             d.close = +d.Close;
//             d.volume = +d.Volume;
    
//             return d;
//         };
//     };

//     useEffect(() => {
//         const parseDate = timeParse("%Y-%m-%d");
    
//         fetch("http://localhost:5000/stocks/cross", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//               },
//             body: JSON.stringify({
//                 'ticker': 'BTC-USD'
//             })
//         })
//           .then(res => res.text()) //res.json())
//           .then(data => tsvParse(data, parseData(parseDate)))//, parseData(parseDate)))
//           .then(
//             (result) => {
//               setIsLoaded(true);
//               setItems(result);
//             },
//             // Note: it's important to handle errors here
//             // instead of a catch() block so that we don't swallow
//             // exceptions from actual bugs in components.
//             (error) => {
//               setIsLoaded(true);
//               setError(error);
//             }
//           )
    
//       }, []);

//     if (error) {
//     return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//     return <div>Loading...</div>;
//     } else if (items == null || items == undefined) {
//         return <div>Loading...</div>
//     } else {
//         return (
//             <TypeChooser>
// 				{type => <Chart type={type} data={items} />}
// 			</TypeChooser>
//         )
//       }
//     }
