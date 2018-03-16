
var plot4;
/*
function flotchart2() {        

    plot4 = $.plot("#flotchart2", [ [5,5],[6,6] ], {
        series: {
            shadowSize: 0   // Drawing is faster without shadows
        },
        yaxis: {
            min: 0,
            max: 75
        },
        xaxis: {
            min: 0,
            max: 50
        },
        colors: ["#26A69A"],
        legend: {
            show: false
        },
        grid: {
            color: "#AFAFAF",
            hoverable: true,
            borderWidth: 0,
            backgroundColor: '#FFF'
        },  
        tooltip: true,
        tooltipOpts: {
            content: "Y: %y",
            defaultTheme: false
        }
    });
}*/


var data = [],
    totalPoints = 50;
    
function getRandomData() {

    if (data.length > 0)
        data = data.slice(1);

    // Do a random walk

    while (data.length < totalPoints) {

        var prev = data.length > 0 ? data[data.length - 1] : 50,
            y = prev + Math.random() * 10 - 5;

        if (y < 0) {
            y = 0;
        } else if (y > 75) {
            y = 75;
        }

        data.push(y);
    }

    // Zip the generated y values with the x values

    var res = [];
    for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
    }

    return res;
}
function flotchart2() {

    plot4 = $.plot("#flotchart2", [ [0,0] ], {
        series: {
            shadowSize: 0   // Drawing is faster without shadows
        },
        yaxis: {
            min: 0,
            max: 75
        },
        xaxis: {
            min: 0,
            max: 50
        },
        colors: ["#26A69A"],
        legend: {
            show: false
        },
        grid: {
            color: "#AFAFAF",
            hoverable: true,
            borderWidth: 0,
            backgroundColor: '#FFF'
        },
        tooltip: true,
        tooltipOpts: {
            content: "Y: %y",
            defaultTheme: false
        }
    });  
};