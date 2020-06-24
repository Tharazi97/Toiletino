let graphType = 0;

function createGraph(){
    var date = document.getElementById("date").innerHTML;
    var firstSQL = moment(date.slice(0,16),"DD.MM.YYYY HH:mm").format("YYYY-MM-DD HH:mm:ss");
    var secondSQL = moment(date.slice(19,35),"DD.MM.YYYY HH:mm").format("YYYY-MM-DD HH:mm:ss");


    $.ajax({
        url: "HOSTING_PAGE/sensors_data.php",
        type: "GET",
        data: "dateFrom='"+firstSQL+"'&dateTo='"+secondSQL+"'&type="+graphType,
        success: function (data) {
            var x = document.getElementsByClassName("chart-container");
            x[0].innerHTML = '<canvas id="mycanvas"></canvas>';
            console.log(data);
            
            var chartdata;


            switch(graphType){
                case 0: //pollution
                    var time = [];
                    var sensor0 = [];
                    var sensor1 = [];
                    var sensor2 = [];
                    var sensor3 = [];
                    var brightness = [];
        
                    for (var i in data) {
                        time.push(data[i].time);
                        sensor0.push(data[i].sensor0);
                        sensor1.push(data[i].sensor1);
                        sensor2.push(data[i].sensor2);
                        sensor3.push(data[i].sensor3);
                        brightness.push(data[i].brightness);
                    }
        
                    chartdata = {
                        labels: time,
                        datasets: [
                            {
                                label: "Hydrogen",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(59, 89, 152, 0.75)",
                                borderColor: "rgba(59, 89, 152, 1)",
                                pointHoverBackgroundColor: "rgba(59, 89, 152, 1)",
                                pointHoverBorderColor: "rgba(59, 89, 152, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: sensor0,
                                yAxisID: 'axis1'
                            },
                            {
                                label: "Odor",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(29, 202, 255, 0.75)",
                                borderColor: "rgba(29, 202, 255, 1)",
                                pointHoverBackgroundColor: "rgba(29, 202, 255, 1)",
                                pointHoverBorderColor: "rgba(29, 202, 255, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: sensor1,
                                yAxisID: 'axis1'
                            },
                            {
                                label: "Ammonia",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(211, 72, 54, 0.75)",
                                borderColor: "rgba(211, 72, 54, 1)",
                                pointHoverBackgroundColor: "rgba(211, 72, 54, 1)",
                                pointHoverBorderColor: "rgba(211, 72, 54, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: sensor2,
                                yAxisID: 'axis1'
                            },
                            {
                                label: "Methane",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(0, 72, 54, 0.75)",
                                borderColor: "rgba(0, 72, 54, 1)",
                                pointHoverBackgroundColor: "rgba(0, 72, 54, 1)",
                                pointHoverBorderColor: "rgba(0, 72, 54, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: sensor3,
                                yAxisID: 'axis1'
                            },
                            {
                                label: "occupancy",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(234, 213, 158, 0.75)",
                                borderColor: "rgba(234, 213, 158, 1)",
                                pointHoverBackgroundColor: "rgba(234, 213, 158, 1)",
                                pointHoverBorderColor: "rgba(234, 213, 158, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: brightness,
                                yAxisID: 'axis2'
                            }
                        ]
                    };
                    var ctx = $("#mycanvas");
                    if(window.innerWidth < 1000){
                        Chart.defaults.global.defaultFontSize = 21;
                    } else {
                        Chart.defaults.global.defaultFontSize = 12;
                    }

                    var LineGraph = new Chart(ctx, {
                        type: 'line',
                        data: chartdata,
                        options: {
                            maintainAspectRatio: false,
                            legend: {
                                padding: 20
                            },
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    distribution: 'linear',
                                    time: {
                                        displayFormats: {
                                            second: 'H:mm:ss',
                                            minute: 'H:mm',
                                            hour: 'H',
                                            day: 'D.M',
                                            week: 'D.M.YYYY',
                                            month: 'M.YYYY',
                                            quarter: '[Q]Q - YYYY',
                                            year: 'YYYY'
                                        }
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Date'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        suggestedMin: 0,
                                        suggestedMax: 200
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'value'
                                    },
                                    id: 'axis1'
                                },{
                                    display: false,
                                    id: 'axis2'
                                }]
                            },
                            tooltips: {
                                mode: 'index',
                                position: 'nearest'
                            }
                        }
                    });
                    break;

                case 1: //temperature
                    var time = [];
                    var temperature = [];
                    var brightness = [];
        
                    for (var i in data) {
                        time.push(data[i].time);
                        temperature.push(data[i].temperature);
                        brightness.push(data[i].brightness);
                    }
        
                    chartdata = {
                        labels: time,
                        datasets: [
                            {
                                label: "temperature",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(161, 28, 16, 0.75)",
                                borderColor: "rgba(161, 28, 16, 1)",
                                pointHoverBackgroundColor: "rgba(161, 28, 16, 1)",
                                pointHoverBorderColor: "rgba(161, 28, 16, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: temperature,
                                yAxisID: 'axis1'
                            },
                            {
                                label: "occupancy",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(234, 213, 158, 0.75)",
                                borderColor: "rgba(234, 213, 158, 1)",
                                pointHoverBackgroundColor: "rgba(234, 213, 158, 1)",
                                pointHoverBorderColor: "rgba(234, 213, 158, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: brightness,
                                yAxisID: 'axis2'
                            }
                        ]
                    };
                    var ctx = $("#mycanvas");
                    if(window.innerWidth < 1000){
                        Chart.defaults.global.defaultFontSize = 21;
                    } else {
                        Chart.defaults.global.defaultFontSize = 12;
                    }

                    var LineGraph = new Chart(ctx, {
                        type: 'line',
                        data: chartdata,
                        options: {
                            maintainAspectRatio: false,
                            legend: {
                                padding: 20
                            },
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    distribution: 'linear',
                                    time: {
                                        displayFormats: {
                                            second: 'H:mm:ss',
                                            minute: 'H:mm',
                                            hour: 'H',
                                            day: 'D.M',
                                            week: 'D.M.YYYY',
                                            month: 'M.YYYY',
                                            quarter: '[Q]Q - YYYY',
                                            year: 'YYYY'
                                        }
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Date'
                                    }
                                }],
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'temperature'
                                    },
                                    id: 'axis1'
                                },{
                                    display: false,
                                    id: 'axis2'
                                }]
                            },
                            tooltips: {
                                mode: 'index',
                                position: 'nearest'
                            }
                        }
                    });
                    break;
                case 2: //humidity
                    var time = [];
                    var humidity = [];
                    var brightness = [];
        
                    for (var i in data) {
                        time.push(data[i].time);
                        humidity.push(data[i].humidity);
                        brightness.push(data[i].brightness);
                    }
        
                    chartdata = {
                        labels: time,
                        datasets: [
                            {
                                label: "humidity",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(12, 112, 164, 0.75)",
                                borderColor: "rgba(12, 112, 164, 1)",
                                pointHoverBackgroundColor: "rgba(12, 112, 164, 1)",
                                pointHoverBorderColor: "rgba(12, 112, 164, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: humidity,
                                yAxisID: 'axis1'
                            },
                            {
                                label: "occupancy",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(234, 213, 158, 0.75)",
                                borderColor: "rgba(234, 213, 158, 1)",
                                pointHoverBackgroundColor: "rgba(234, 213, 158, 1)",
                                pointHoverBorderColor: "rgba(234, 213, 158, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: brightness,
                                yAxisID: 'axis2'
                            }
                        ]
                    };
                    var ctx = $("#mycanvas");
                    if(window.innerWidth < 1000){
                        Chart.defaults.global.defaultFontSize = 21;
                    } else {
                        Chart.defaults.global.defaultFontSize = 12;
                    }

                    var LineGraph = new Chart(ctx, {
                        type: 'line',
                        data: chartdata,
                        options: {
                            maintainAspectRatio: false,
                            legend: {
                                padding: 20
                            },
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    distribution: 'linear',
                                    time: {
                                        displayFormats: {
                                            second: 'H:mm:ss',
                                            minute: 'H:mm',
                                            hour: 'H',
                                            day: 'D.M',
                                            week: 'D.M.YYYY',
                                            month: 'M.YYYY',
                                            quarter: '[Q]Q - YYYY',
                                            year: 'YYYY'
                                        }
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Date'
                                    }
                                }],
                                yAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'humidity'
                                    },
                                    id: 'axis1'
                                },{
                                    display: false,
                                    id: 'axis2'
                                }]
                            },
                            tooltips: {
                                mode: 'index',
                                position: 'nearest'
                            }
                        }
                    });
                    break;
                case 3: //all
                    var time = [];
                    var sensor0 = [];
                    var sensor1 = [];
                    var sensor2 = [];
                    var sensor3 = [];
                    var brightness = [];
                    var temperature = [];
                    var humidity = [];
        
                    for (var i in data) {
                        time.push(data[i].time);
                        sensor0.push(data[i].sensor0);
                        sensor1.push(data[i].sensor1);
                        sensor2.push(data[i].sensor2);
                        sensor3.push(data[i].sensor3);
                        brightness.push(data[i].brightness);
                        temperature.push(data[i].temperature);
                        humidity.push(data[i].humidity);
                    }
        
                    chartdata = {
                        labels: time,
                        datasets: [
                            {
                                label: "Hydrogen",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(59, 89, 152, 0.75)",
                                borderColor: "rgba(59, 89, 152, 1)",
                                pointHoverBackgroundColor: "rgba(59, 89, 152, 1)",
                                pointHoverBorderColor: "rgba(59, 89, 152, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: sensor0,
                                yAxisID: 'axis1'
                            },
                            {
                                label: "Odor",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(29, 202, 255, 0.75)",
                                borderColor: "rgba(29, 202, 255, 1)",
                                pointHoverBackgroundColor: "rgba(29, 202, 255, 1)",
                                pointHoverBorderColor: "rgba(29, 202, 255, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: sensor1,
                                yAxisID: 'axis1'
                            },
                            {
                                label: "Ammonia",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(211, 72, 54, 0.75)",
                                borderColor: "rgba(211, 72, 54, 1)",
                                pointHoverBackgroundColor: "rgba(211, 72, 54, 1)",
                                pointHoverBorderColor: "rgba(211, 72, 54, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: sensor2,
                                yAxisID: 'axis1'
                            },
                            {
                                label: "Methane",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(0, 72, 54, 0.75)",
                                borderColor: "rgba(0, 72, 54, 1)",
                                pointHoverBackgroundColor: "rgba(0, 72, 54, 1)",
                                pointHoverBorderColor: "rgba(0, 72, 54, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: sensor3,
                                yAxisID: 'axis1'
                            },
                            {
                                label: "temperature",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(161, 28, 16, 0.75)",
                                borderColor: "rgba(161, 28, 16, 1)",
                                pointHoverBackgroundColor: "rgba(161, 28, 16, 1)",
                                pointHoverBorderColor: "rgba(161, 28, 16, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: temperature,
                                yAxisID: 'axis2'
                            },
                            {
                                label: "humidity",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(12, 112, 164, 0.75)",
                                borderColor: "rgba(12, 112, 164, 1)",
                                pointHoverBackgroundColor: "rgba(12, 112, 164, 1)",
                                pointHoverBorderColor: "rgba(12, 112, 164, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: humidity,
                                yAxisID: 'axis3'
                            },
                            {
                                label: "occupancy",
                                fill: false,
                                lineTension: 0.1,
                                backgroundColor: "rgba(234, 213, 158, 0.75)",
                                borderColor: "rgba(234, 213, 158, 1)",
                                pointHoverBackgroundColor: "rgba(234, 213, 158, 1)",
                                pointHoverBorderColor: "rgba(234, 213, 158, 1)",
                                pointRadius: 1,
                                pointHitRadius: 5,
                                data: brightness,
                                yAxisID: 'axis4'
                            }
                        ]
                    };
                    var ctx = $("#mycanvas");
                    if(window.innerWidth < 1000){
                        Chart.defaults.global.defaultFontSize = 21;
                    } else {
                        Chart.defaults.global.defaultFontSize = 12;
                    }

                    var LineGraph = new Chart(ctx, {
                        type: 'line',
                        data: chartdata,
                        options: {
                            maintainAspectRatio: false,
                            legend: {
                                padding: 20
                            },
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    distribution: 'linear',
                                    time: {
                                        displayFormats: {
                                            second: 'H:mm:ss',
                                            minute: 'H:mm',
                                            hour: 'H',
                                            day: 'D.M',
                                            week: 'D.M.YYYY',
                                            month: 'M.YYYY',
                                            quarter: '[Q]Q - YYYY',
                                            year: 'YYYY'
                                        }
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'Date'
                                    }
                                }],
                                yAxes: [{
                                    ticks: {
                                        suggestedMin: 0,
                                        suggestedMax: 200
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'value'
                                    },
                                    id: 'axis1'
                                },{
                                    ticks: {
                                        suggestedMin: 15,
                                        suggestedMax: 30
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'temperature'
                                    },
                                    id: 'axis2',
                                    position: 'right'
                                },{
                                    ticks: {
                                        suggestedMin: 0,
                                        suggestedMax: 100
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: 'humidity'
                                    },
                                    id: 'axis3',
                                    position: 'right'
                                },{
                                    display: false,
                                    id: 'axis4'
                                }]
                            },
                            tooltips: {
                                mode: 'index',
                                position: 'nearest'
                            }
                        }
                    });
                    break;
                default:
                    break;
            }

            
        },
        error: function (data) {

        }
    });
}


var start = moment().subtract(1, 'days');
var end = moment();

function cb(startLocal, endLocal) {
    $('#reportRange span').html(startLocal.format('DD.MM.YYYY HH:mm') + ' - ' + endLocal.format('DD.MM.YYYY HH:mm'));
    start = startLocal;
    end = endLocal;
    createGraph();
}

$('#reportRange').daterangepicker({
    timePicker: true,
    startDate: start,
    endDate: end,
    locale: {
        format: 'DD.MM HH:mm'
    },
    linkedCalendars: false,
    showDropdowns: true,
    timePicker24Hour: true,
    ranges: {
        'Last Hour': [moment().subtract(1, 'hours'), moment()],
        'Today': [moment().subtract(1, 'days'), moment()],
        'Yesterday': [moment().subtract(2, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')]
    },
    alwaysShowCalendars: true,
    opens: 'left',
    buttonClasses: "optionsButton"
}, cb);

cb(start, end);

document.getElementById("prevWeekButton").onclick = function(){
    start.subtract(7, 'days');
    end.subtract(7, 'days');
    cb(start, end);
};

document.getElementById("prevDayButton").onclick = function(){
    start.subtract(1, 'days');
    end.subtract(1, 'days');
    cb(start, end);
};

document.getElementById("nextDayButton").onclick = function(){
    start.add(1, 'days');
    end.add(1, 'days');
    cb(start, end);
};

document.getElementById("nextWeekButton").onclick = function(){
    start.add(7, 'days');
    end.add(7, 'days');
    cb(start, end);
};

document.getElementById("refresh").onclick = function(){
    end = moment();
    cb(start, end);
};

window.onresize = function() {
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    var x = document.getElementsByClassName("chart-container");
    x[0].innerHTML = '<canvas id="mycanvas"></canvas>';
    createGraph();
};

document.getElementById("pollution").onclick = function(){
    document.getElementById("pollution").classList.add("chosen");
    document.getElementById("temperature").classList.remove("chosen");
    document.getElementById("humidity").classList.remove("chosen");
    document.getElementById("all").classList.remove("chosen");
    graphType = 0;
    createGraph();
};

document.getElementById("temperature").onclick = function(){
    document.getElementById("temperature").classList.add("chosen");
    document.getElementById("pollution").classList.remove("chosen");
    document.getElementById("humidity").classList.remove("chosen");
    document.getElementById("all").classList.remove("chosen");
    graphType = 1;
    createGraph();
};

document.getElementById("humidity").onclick = function(){
    document.getElementById("humidity").classList.add("chosen");
    document.getElementById("temperature").classList.remove("chosen");
    document.getElementById("pollution").classList.remove("chosen");
    document.getElementById("all").classList.remove("chosen");
    graphType = 2;
    createGraph();
};

document.getElementById("all").onclick = function(){
    document.getElementById("all").classList.add("chosen");
    document.getElementById("temperature").classList.remove("chosen");
    document.getElementById("pollution").classList.remove("chosen");
    document.getElementById("humidity").classList.remove("chosen");
    graphType = 3;
    createGraph();
};