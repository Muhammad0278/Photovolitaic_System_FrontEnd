import React, { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';

const LoadCharts = ({ data }) => {
    const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && data) {
      const options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Daily Bar Chart'
        },
        xAxis: {
          categories: data.map(item => item.date)
        },
        yAxis: {
          title: {
            text: 'Electricity'
          }
        },
        series: [{
          name: 'Date',
          data: data.map(item => item.value)
        }]
      };

      Highcharts.chart(chartRef.current, options);
    }
  }, [data]);

  return <div ref={chartRef} />;
};

export default LoadCharts;
