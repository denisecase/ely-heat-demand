// -------------- Chart.js -------------

// import default object with a local camelCase name
import arrData from './data/dataWC.js';
const arrWC = [...arrData].reverse();
const arrHD = arrWC.map(pt => calculateHeatDemandEntry(pt));

function calculateHeatDemandEntry(item) {
    const o = {};
    o.x = item.x;
    o.y = 72 - item.y;
    return o;
}

var options = {
    type: 'line',
    data: {
        datasets: [{
            label: 'Wind Chill',
            data: arrWC,
            backgroundColor: 'red'
        },
        {
            label: 'Demand',
            steppedLine: 'before',
            data: arrHD,
            backgroundColor: 'limegreen'
        }
        ]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'hour',
                    round: true,
                },
                displayFormats: {
                    day: 'MMM-DD'
                }
            }],
            yAxes: [{
                type: 'linear',
                label: 'F',
                suggestedMin: -45,
                suggestedMax: 20
            }]
        }
    }
}

var ctx = document.getElementById('chart').getContext('2d');
new Chart(ctx, options)
