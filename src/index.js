function checkValid()
{
    var select = document.getElementById("u_app").value;
    var button = document.getElementById("calculate_btn");
    if (isNaN(parseInt(select),10) || select > 100 || select < 0)
    {
        button.disabled = true;
    }
    else
    {
        button.disabled = false;
    }
}

function doIt() {
    var k = document.getElementById("u_app").value;
    var v = document.getElementById("u_vis").value;
    var method = document.getElementById("u_method").value;
    if (method == "pi")
        doNewton(k, v, method);
    else if (method == "e")
        doEuler(k, v, method);
    else
        doLoga(k, v, method);
      
}

var results = new Array();

function doNewton(k, v) {  
    var d_result = Decimal(1);
    results.length = 0;
    for (var i = 1; i <= k; i++)
    {
        d_result = d_result.plus((Decimal(2).toPower(i)).times(Decimal(silnia(i)).toPower(2)).dividedBy(silnia(Decimal(2).times(Decimal(i)).plus(1))));
        results.push(d_result*2);
    }
    /*
    var result = 1;
    var results = new Array();
    for (var i=1; i <= k; i++) {
        result = result + (Math.pow(2, i)) * (Math.pow(silnia(i), 2)) / (silnia(2 * i + 1));
        results.push(result*2);
    }
    */
    rz = Math.PI;
    if (v == "table")
        createTable();
    else
        createChart();
}
function doEuler(k, v) {

    var d_result = Decimal(1);
    results.length = 0;
    for (var i = 1; i <= k; i++)
    {
        d_result = d_result.plus(Decimal(1).dividedBy(Decimal(silnia(i))));
        results.push(d_result*1);
    }
    /*
    var result = 1;
    var results = new Array();
    for (var i = 1; i <= k; i++)
    {
        result = result + (1 / (silnia(i)));
        results.push(result);
    }
    */
    rz = Math.E;

    if (v == "table")
        createTable();
    else
        createChart();
   
}
function doLoga(k,v)
{
    var d_result = Decimal(0);
    results.length = 0;
    for (var i = 1; i <= k; i++) {
        d_result = d_result.plus(Decimal(1).dividedBy(Decimal(i).times(Decimal(2).toPower(i))));
        var result = new Number(d_result);
        results.push(result*1);
    }
    /*
    var result = 0;
    var results = new Array();
    for (var i = 1; i <= k; i++)
    {
        result = result + 1 / (i * Math.pow(2, i));
        results.push(result);
    }
    */
    rz = Math.LN2;
    if (v == "table")
        createTable();
    else
        createChart();
}
function silnia(n) {
    wynik = 1;
    while (n > 0) {
        wynik = wynik * n;
        n--;
    }
    return wynik;
}
function createTable() {
    var section = document.getElementById('results');
    section.innerHTML = "";
    tbl = document.createElement('table');
    tbl.style.width = '100%';
    var head = tbl.insertRow();
    var tdhead = head.insertCell();
    tdhead.colSpan = 2;
    var method = document.getElementById("u_method");
    method = method.options[method.selectedIndex].text;
    var methods = method.split("-");
    tdhead.appendChild(document.createTextNode('Tabela z obliczeniami '+ methods[0] + ' w/g ' + methods[1] + 'a, wartość rzeczywista ' + rz));
  
    for (var i = 1; i <= results.length; i++) {
        var tr = tbl.insertRow();
        for (var j = 0; j < 2; j++) {
            var td = tr.insertCell();
            if (j == 0 && i > 0)
            {
                td.appendChild(document.createTextNode(i + "."));
            }
            else {
                td.appendChild(document.createTextNode(results[i - 1]));
                if (results[i-1] == rz)
                {
                    td.style.backgroundColor = "rgba(75,192,192,0.2)";
                }
            }
            }
    }
    section.appendChild(tbl);
    var label = document.createElement("label");
}

function createChart() {

    var can = document.createElement('canvas');
    can.id = 'myChart';
    var section = document.getElementById("results");
    section.innerHTML = "";
    var heading = document.createElement('h3');
    var method = document.getElementById("u_method");
    method = method.options[method.selectedIndex].text;
    var methods = method.split("-");
    heading.innerHTML = 'Wykres z obliczeniami ' + methods[0] + ' w/g ' + methods[1] + 'a, wartość rzeczywista ' + rz;
    section.appendChild(heading);
    section.appendChild(can);
    var labels = new Array(results.length);
    var canvas = document.getElementById('myChart');
    var ctx = canvas.getContext('2d');

    Chart.defaults.global.legend.display = false;
    Chart.defaults.global.tooltips.enabled = false;
    var data = {
        labels: labels,
        datasets: [
                  {
                      fill: false,
                      backgroundColor: "red",
                      borderColor: "red",
                      borderWidth: 0.9,
                      borderCapStyle: 'butt',
                      borderDash: [5],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointRadius: 0,
                      data: Array(results.length).fill(rz)
                  },
            {
                fill: false,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderWidth: 1.2,
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointRadius: 0,
                data: results
            }
        ]
    };
    var options = {
        responsive: true,
        maintainAspectRatio: checkWidth(),
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: false,
                    //stepSize: Math.min(...results) / 30
                }
            }]
        }
    };
        new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
}

function checkWidth() {
    var size = window.innerWidth;
    if (size > 337)
        return false;
    else
        return true;
}
