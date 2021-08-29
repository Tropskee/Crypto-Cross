import React from 'react'
import HighchartsReact from 'highcharts-react-official'

// Create default stockchart
export const StockChart = ({ options, highcharts }) => <HighchartsReact
  highcharts={highcharts}
  constructorType={'stockChart'}
  options={options}
/>
// export default StockChart