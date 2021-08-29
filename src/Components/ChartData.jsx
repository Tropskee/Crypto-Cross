import {React, useEffect, useState } from "react"
import Highcharts from 'highcharts/highstock'
import {StockChart} from './ChartTypes'

// Load Highcharts modules
require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/ema')(Highcharts)
require('highcharts/indicators/dema')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)

export default function ChartData() {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [ticker, setTicker] = useState('BTC-USD')
    const [options, setOptions] = useState({
      title: {
        text: ticker + ' chart'
      },
    //   chart: {
    //     backgroundColor: '#363636'
    //   },
      colors: ['lightGreen', 'orange'],
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
        pointPadding: 0.005,
        data: []
    }]
    });
  
    useEffect(() => {
        fetch("http://localhost:5000/stocks/cross", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                'ticker': ticker
            })
        })
        .then(response => {
          return response.json();
        })
        .then(data => {
          setIsLoaded(true)
          setOptions({ series: [{ data: data }, {
            type: 'dema', // double exponential moving average
            linkedTo: 'crypto',
            marker: false,
            lineWidth: 1,
            params: {
                period: 15
            }
        }, {
            type: 'dema',
            linkedTo: 'crypto',
            marker: false,
            lineWidth: 1,
            params: {
                period: 50
            }
        }] });
        }, 
        (error) => {
            setIsLoaded(true);
            setError(error);
        });
    }, [ticker]);
    
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
            </div>
            )
  };
}