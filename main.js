// -------------- Chart.js -------------

// import default object with a local camelCase name
import arrData from './data/dataWC.js';

const arrWC = [...arrData].reverse();
const arrHD = arrWC.map(pt => calculateHeatDemandEntry(pt));
const arrHDC = arrHD.map((pt, i) => ({
    x: pt.x,
    y: arrHD.slice(0, i + 1).map(({ y }) => y).reduce((acc, curr) => acc + curr)
}));

function calculateHeatDemandEntry(item) {
    // x is the date-time and y is the windchill in deg F
    const o = {};
    o.x = item.x;
    const d = new Date(o.x);
    const hour = d.getHours();
    const intDayStart = 7; // 7am
    const intDayEnd = 22;  // 10pm
    const tWarm = (hour <= intDayStart || hour >= intDayEnd) ? 68 : 72;
    o.y = tWarm - item.y;
    return o;
}

var options = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Wind Chill',
            yAxisID: 'F',
            data: arrWC,
            backgroundColor: 'red',
            tension: 0.6
        },
        {
            label: 'Demand',
            data: arrHD,
            yAxisID: 'F',
            backgroundColor: 'limegreen',
            tension: 0.6
        },
        {
            label: 'Cumulative',
            yAxisID: 'Cumulative',
            data: arrHDC,
            backgroundColor: 'lightgrey',
            fill: 'origin',
            borderColor: 'grey',
            tension: 0.1
        }
        ]
    },
    options: {
        scales: {
            xAxis: [{
                type: 'time'

            }],
            yAxis: [{
                id: 'F',
                type: 'linear',
                position: 'left'
            },
            {
                id: 'Cumulative',
                type: 'linear',
                position: 'right'
            }]
        }
    }
}

var ctx = document.getElementById('chart').getContext('2d');
new Chart(ctx, options)
