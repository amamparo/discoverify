import roundTo from 'round-to';

const regularMarkerColor = '#1DB954';
const benchmarkMarkerColor = '#1873D3'

const colors = [regularMarkerColor, benchmarkMarkerColor];

export default ({getTooltip, onMouseEnter, onMouseLeave, onMarkerClick, xMin = 0, xMax = 1, yMin = 0, yMax = 1}) => ({
  chart: {
    zoom: {
      enabled: true,
      type: 'xy',
      autoScaleYaxis: true
    },
    selection: {enabled: false},
    toolbar: {
      show: true,
      tools: {
        reset: true,
        zoom: true,
        zoomin: false,
        zoomout: false,
        pan: false,
        download: false,
        selection: false
      }
    },
    events: {
      dataPointMouseEnter: onMouseEnter,
      dataPointMouseLeave: onMouseLeave,
      markerClick: onMarkerClick
    }
  },
  markers: {
    size: 8,
    hover: {sizeOffset: 6},
    strokeWidth: 0,
    colors
  },
  colors,
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
    labels: {
      trim: true,
      formatter: value => roundTo(value, 2)
    },
    axisTicks: {
      show: true,
      height: 0,
    },
    tickAmount: 5,
    tickPlacement: 'between',
    crosshairs: {show: false},
    tooltip: {enabled: false},
    min: xMin,
    max: xMax
  },
  yaxis: {
    type: 'numeric',
    labels: {
      show: true,
      trim: true,
      formatter: value => roundTo(value, 2)
    },
    tickAmount: 5,
    tickPlacement: 'between',
    min: yMin,
    max: yMax
  },
});