import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

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
// 2021-08-15 21:30:00+01:00
const parseDate = timeParse("%Y-%m-%d %H:%M:%S%Z");

export function getData() {

    const promiseTicker = fetch("http://localhost:5000/stocks/cross", {
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

	return promiseTicker;
}
