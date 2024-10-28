import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './Chart.css';

function Chart() {
  // Static data for the chart
  const dates = [
    { x: new Date('2023-01-01').getTime(), y: 1000000 },
    { x: new Date('2023-02-01').getTime(), y: 1500000 },
    { x: new Date('2023-03-01').getTime(), y: 1300000 },
    { x: new Date('2023-04-01').getTime(), y: 1800000 },
    { x: new Date('2023-05-01').getTime(), y: 1700000 },
    { x: new Date('2023-06-01').getTime(), y: 1900000 },
    { x: new Date('2023-07-01').getTime(), y: 2000000 },
    { x: new Date('2023-08-01').getTime(), y: 2100000 },
    { x: new Date('2023-09-01').getTime(), y: 2200000 },
    { x: new Date('2023-10-01').getTime(), y: 2300000 },
  ];

  const options = {
    series: [{
      name: 'XYZ MOTORS',
      data: dates
    }],
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: {
        type: 'x',
        enabled: true,
        autoScaleYaxis: true
      },
      toolbar: {
        autoSelected: 'zoom'
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 0,
    },
  
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100]
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0) + 'M'; // Display in millions
        },
      },
      title: {
        text: 'Price'
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0) + 'M';
        }
      }
    }
  };

  return (
    <div id="chart">
              <div className="home-containerChart">
        <span className="yes-styling">Yes</span><br></br><span className='chance-styling'>0% Chance</span>
      <ReactApexChart options={options} series={options.series} type="area" height={350} 
        style={{
            // background:"linear-gradient(90deg, rgba(255, 105, 180, 0.8), rgba(72, 61, 139, 0.8))", 
            borderRadius:"5px",
            padding:"5px"
            }} />
      </div>
      </div>
  );
}

export default Chart;
