//this part comes from https://bl.ocks.org/pjsier/28d1d410b64dcd74d9dab348514ed256
function timelineChart() {
    var margin = { top: 20, right: 20, bottom: 50, left: 50 },
        width = 350,
        height = 350,
        parseTime = d3.timeParse("%Y-%m"),
        timeValue = function(d) { return parseTime(d.Year_Month); },
        dataValue = function (d) { return parseInt(d.Close); },
        color = "steelblue";

    // From https://bl.ocks.org/mbostock/5649592
    function transition(path) {
        path.transition()
            .duration(5000)
            .attrTween("stroke-dasharray", tweenDash);
    }
    function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function (t) { return i(t); };
    }

    function chart(selection) {
        selection.each(function (data) {
            data = data.map(function (d, i) {
                return { time: timeValue(d), value: dataValue(d) };
            });
            console.log(data);
            var x = d3.scaleTime()
                .rangeRound([0, width - margin.left - margin.right])
                .domain(d3.extent(data, function(d) { return d.time; }));  
            var y = d3.scaleLinear()
                .rangeRound([height - margin.top - margin.bottom, 0])
                .domain(d3.extent(data, function(d) { return d.value; }));
            
            var line = d3.line()
                .x(function(d) { return x(d.time); })
                .y(function(d) { return y(d.value); });

            var svg = d3.select(this).selectAll("svg").data([data]);
            var gEnter = svg.enter().append("svg").append("g");

            gEnter.append("path")
                .datum(data)
                .attr("class", "data")
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 4);
    
            var axis_x = gEnter.append("g").attr("class", "axis_x");
            gEnter.append("g").attr("class", "axis y")
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end")
                .text("Data");
            gEnter.append("path")
                .attr("class", "data");

            var svg = selection.select("svg");
            svg.attr('width', width).attr('height', height);
            var g = svg.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var xAxis = g.select("g.axis.x")
                .attr("transform", "translate(0," + (height - margin.bottom) + ")")
                .call(d3.axisBottom(x).ticks(5))
                .select(".domain")
                .remove();

            g.select("g.axis.y")
                .attr("class", "axis y")
                .call(d3.axisLeft(y));

            g.select("path.data")
                .datum(data)
                .attr("d", line)
                .call(transition);

    //     var zoom = d3.zoom()
    //     .scaleExtent([1, 10])
    //     .on('zoom', zoomed);

    // svg.call(zoom);

    // function zoomed() {
    //   console.log('zoomed');

    //   xScale = d3.event.transform.rescaleX(x);

    //   axis_x.call(xAxis.scale(d3.event.transform.rescaleX(x)));

    //   for (key in data[0]) {
    //       if (key !== 'date') {

    //         line = lines[key];
    //         path = paths[key];

    //         totalLength = path.node().getTotalLength();

    //         path
    //           .attr('stroke-dasharray', totalLength + ' ' + totalLength)
    //           .attr('stroke-dashoffset', totalLength)
    //           .attr('stroke-dashoffset', 0);

    //         path.attr('d', line(data));
    //         path.attr('clip-path', 'url(#clip)');

    //       }
    //     }

    // }

        });
    }


    chart.margin = function (_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };

    chart.width = function (_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
    };

    chart.height = function (_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
    };

    chart.parseTime = function (_) {
        if (!arguments.length) return parseTime;
        parseTime = _;
        return chart;
    };

    chart.timeValue = function (_) {
        if (!arguments.length) return timeValue;
        timeValue = _;
        return chart;
    };

    chart.dataValue = function (_) {
        if (!arguments.length) return dataValue;
        dataValue = _;
        return chart;
    };

    return chart;



}
//end of this part




//other part
var lineArr = [];
var MAX_LENGTH = 100;
var duration = 500;
// var chart = realTimeLineChart();
//filter city part
var city = "New York, NY"; //edit this with the input later
var lineArr2 = [];
var start = "1996-05";//edit this with input later
var startYear = parseInt(start.substring(0,4))
var startMonth = parseInt(start.substring(5))
var end = "2018-03";
var totalTime = (2018-startYear)*12 + (3-startMonth);

//filter stock part
var stockName = "Agilent Technologies Inc";//edit this with the input later
var stockSymbol = "A";//edit this with the input later
var xValue = [];
var yValue = [];


// var x = d3.scaleTime().range([0, width]);
// var y = d3.scaleLinear().range([height, 0]);

// define the line
// var valueline = d3.line()
//     .x(function(d) { return x(d.Year_Month); })
//     .y(function(d) { return y(d.Close); });



var lines = timelineChart();


          function resize() {
              if (d3.select("#chart svg").empty()) {
                  return;
              }
              lines.width(+d3.select("#chart").style("width").replace(/(px)/g, ""))
                  .height(+d3.select("#chart").style("height").replace(/(px)/g, ""));
              d3.select("#chart").call(lines);
          }



d3.csv("stock_price_clean.csv",function(error,data){
  if (error) throw error;
  //filter the stock
  for(var i = 0; i < data.length; i++){
       if(data[i]["Symbol"] == stockSymbol || data[i]["Company"] == stockName){
        data = data.filter(function(d){
          return d["Company"] == stockName
        })
       }
  }

   d3.select("#chart").datum(data).call(lines);
            d3.select(window).on('resize', resize);
            resize();



    
})

 //   stock.forEach(function(d) {
 //      d.Year_Month = parseTime(d.Year_Month);
 //      d.Close = parseInt(d.Close);
 //  });
 //   console.log(stock);
 // })





  //store the stock time and value in 2 arrays: x and y
  // for(var i = 0; i < stock.length; i++){
  //   xValue.push(stock[i]["Year_Month"]);
  //   yValue.push(stock[i]["Close"]);
  // }
  // console.log(xValue)
  // console.log(yValue)




//housing function
// d3.csv("house_price.csv",function(error,house){
// 	if (error) throw error;
// 	 // house.filter(house)
// 		for(var i = 0 ; i < house.length; i++){
// 			if(house[i]["City"] == city){
// 				house = house.filter(function(d){
// 					return d["City"] == city
// 				})

// 			}
// 		}
		

// 	})

