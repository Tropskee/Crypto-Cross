import {React, useEffect, useState } from "react"
import Highcharts from 'highcharts/highstock'
import {StockChart} from './ChartTypes'

// Load Highcharts modules
// DO NOT DELETE
require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/ema')(Highcharts)
require('highcharts/indicators/dema')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)

export default function ChartData() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [ticker, setTicker] = useState('BTC-USD')
    const [period, setPeriod] = useState('15d')
    const [interval, setInterval] = useState('30m')
    const [options, setOptions] = useState({
      title: {
        text: ticker + ' chart'
      },
    //   chart: {
    //     backgroundColor: '#363636' // changes background chart color
    //   },
      colors: ['lightGreen', 'orange'], // colors of dema
      legend: {
        enabled: true
      },         
      navigator: {
        maskFill: 'rgba(180, 198, 220, 0.75)',
        series: {
            color: '#00B7E5',
            fillOpacity: 0.05,
            }
        },
      series: [{ 
        type: 'candlestick',
        name: ticker + ' Price',
        id: 'crypto',
        color: 'red',
        upColor: "green",
        pointPadding: 0.005, // How close together points are
        data: []
    }]
    });
  
    // For local testing use - http://localhost:5000/stocks/cross
    useEffect(() => {
        fetch("https://tropskee.pythonanywhere.com/stocks/cross", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                'ticker': ticker,
                'period': period,
                'interval': interval,
            })
        })
        .then(response => {
          return response.json(); // Response gives [date, open, high, low, close]
        })
        .then(data => {
          setIsLoaded(true)
          setOptions({ series: [{ data: data }, {
            type: 'dema', // double exponential moving average
            linkedTo: 'crypto',
            marker: false,
            lineWidth: 1,
            params: {
                period: 15 // Takes 15 previous data points into consideration
            }
        }, {
            type: 'dema',
            linkedTo: 'crypto',
            marker: false,
            lineWidth: 1,
            params: {
                period: 50 // Takes 50 previous data points into consideration
            }
        }] });
        }, 
        (error) => { 
            setIsLoaded(true);
            setError(error);
        });
    }, [ticker, period, interval]);
    
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (options === null || options === undefined) {
        return <div>Loading...</div>
    } else {
        return (
            <div>
                <StockChart highcharts={Highcharts} options={options} />
                <form>
                    <label>
                    Pick your Crypto (adding more soon!):&nbsp;
                    <select value={ticker} onChange={e => setTicker(e.target.value)}>
                        <option value="BTC-USD">Bitcoin</option>
                        <option value="ETH-USD">Ethereum</option>
                        <option value="DOGE-USD">Dogecoin</option>
                        <option value="BNB-USD">Binance Coin</option>
                    </select>
                    </label>
                </form>
                <form>
                    <label>
                    Customize the period (in days):&nbsp;
                    <select value={period} onChange={e => setPeriod(e.target.value)}>
                        <option value="7d">7 days</option>
                        <option value="15d">15 days (default)</option>
                        <option value="30d">30 days</option>
                        <option value="60d">60 days</option>
                    </select>
                    </label>
                </form>
                <form>
                    <label>
                    Customize the data time interval:&nbsp;
                    <select value={interval} onChange={e => setInterval(e.target.value)}>
                        <option value="5m">5 Minutes</option>
                        <option value="15m">15 Minutes</option>
                        <option value="30m">30 Minutes (default)</option>
                        <option value="60m">60 Minutes</option>
                    </select>
                    </label>
                </form>
            </div>
            )
  };
}