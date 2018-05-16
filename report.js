var rates = []
var start = 2000;
d3.csv("inflation.csv", function(data) {
   var inflation_rate = calc_inflation(start, 2018, data);
   console.log(inflation_rate)
});

// data is array of objs with year and rate as key, both string
function calc_inflation(start, end, data) {
    var res = 1;
    for (var i = 0; i < data.length; i++) {
        var curr_year = parseInt(data[i].year);
        var curr_rate = parseFloat(data[i].rate);
        if (curr_year >= start) {
            res = res*(1+curr_rate/100);
        }
    }
    return res-1;
}