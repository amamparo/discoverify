export default ({getTooltip, noDataMessage}) => ({
  chart: {
    zoom: {enabled: false},
    selection: {
      enabled: false,
      type: 'xy'
    },
    toolbar: {show: false}
  },
  colors: ['#1DB954'],
  noData: {
    text: noDataMessage
  },
  tooltip: {
    custom: getTooltip
  },
  grid: {
    show: true,
    borderColor: '#d8d8d8',
    xaxis: {
      lines: {show: true}
    },
    yaxis: {
      lines: {show: true}
    }
  },
  legend: {show: false},
  xaxis: {
    type: 'numeric',
    labels: {show: false},
    axisTicks: {
      show: true,
      height: 0,
    },
    tickAmount: 5,
    tickPlacement: 'between',
    crosshairs: {show: false},
    tooltip: {enabled: false}
  },
  yaxis: {
    type: 'numeric',
    labels: {show: false}
  }
});