import React from 'react'
import HighchartsReact from 'highcharts-react-official'

export const StockChart = ({ options, highcharts }) => <HighchartsReact
  highcharts={highcharts}
  constructorType={'stockChart'}
  options={options}
/>
// export default StockChart