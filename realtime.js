
// input variables from users

// start year , city, chosen stock, invest ratio
var end = "2018-03"; 
var start, city, chosenStock, chosenPrice;//edit this with input later

// default values
start = "1996-01"
city = "New York, NY";
chosenStock = ['GOOGL', 'ABC']
chosenPrice = [0.4, 0.3, 0.3]
barclasses = ["house", "bond"]
barclasses = chosenStock.concat(barclasses);


var startYear = parseInt(start.substring(0,4))
var startMonth = parseInt(start.substring(5))
var totalTime = (2018-startYear)*12 + (3-startMonth)+1;

var TRAINSITION_DURATION = 50;

// submit trigger 
function submitData() {
    start = year_slider.value().toString() + "-01";
    startYear = parseInt(start.substring(0,4));
    startMonth = parseInt(start.substring(5));
    totalTime = (2018-startYear)*12 + (3-startMonth);

    chosenPrice = [property_percent, stock_percent, bond_percent];
    city = $("#cityInput")[0].value;
    var stock = $(".stockAdded")
    chosenStock = [];
    for(i=0;i<stock.length;i++){
        chosenStock.push(stock[i].id);
    }

    if (city == null){
        alert("Please input the city!");
    }
    if (chosenStock.length == 0){
        alert("Please input the stock!");
    }

    if(city != null && chosenStock.length != 0) {
        barclasses = ["house", "bond"]
        barclasses = chosenStock.concat(barclasses);
        bandScale = d3.scaleBand()
        .domain(barclasses)
        .range([10, barheight])
        .paddingInner(0.2)
        .paddingOuter(0.2);

        colorScale = {"house": "#E2C843", 
        "bond": "#85BB4B"}
        for (var i = 0; i < chosenStock.length; i++) {
            colorScale[chosenStock[i]] = stock_colors[i]
        }

        ready(false, stockDataset, houseDataset,bondDataset);
    }

    
}



//this part comes from https://bl.ocks.org/pjsier/28d1d410b64dcd74d9dab348514ed256
function timelineChart() {
    var margin = { top: 20, right: 20, bottom: 50, left: 50 },
        width = 350,
        height = 350,
        parseTime = d3.timeParse("%Y-%m"),
        bisectDate = d3.bisector(function(d) { return d.time; }).left,
        timeValue = function(d) { return parseTime(d.Year_Month); },
        dataValue = function (d) { return parseFloat(d.Price); },
        color = "steelblue";

    // From https://bl.ocks.org/mbostock/5649592
    function transition(path) {
        path.transition()
            .duration(TRAINSITION_DURATION*totalTime*1.2)
            //.delay(TRAINSITION_DURATION)
            .attrTween("stroke-dasharray", tweenDash);
    }
    function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString("0," + l, l + "," + l);
        return function (t) { return i(t); };
    }

    function chart(selection) {

        selection.each(function (data) {

            var isStock = data[0].Symbol!=null;
            var isBond = parseFloat(data[0].Price) < 10 ;
            var isHouse = !isStock && !isBond;

            if (isStock){
                data = data.map(function (d, i) {
                    return { "Symbol": d.Symbol, "Company": d.Company,
                        "time": timeValue(d), "value": dataValue(d) };
                });

                // data to chosen datasets
                var chosenData = [];
                for (var i = 0; i < chosenStock.length; i++) {
                    chosenData.push({"Symbol": chosenStock[i],
                        "data": data.filter(d => d.Symbol == chosenStock[i])});
                }
                //console.log(chosenData)
            }else if (isBond) {
                data = data.map(function (d, i) {
                    return { "time": timeValue(d), "value": dataValue(d) };
                });
            }else{
                data = data.map(function (d, i) {
                    return { "time": timeValue(d), "value": dataValue(d) };
                });
            }

            

            var x = d3.scaleTime()
                .rangeRound([0, width - margin.left - margin.right])
                .domain(d3.extent(data, function(d) { return d.time; }));  
            var y = d3.scaleLinear()
                .rangeRound([height - margin.top - margin.bottom, 0])
                .domain(d3.extent(data, function(d) { return d.value; }));
            
            var line = d3.line()
                .x(function(d) { 
                    return x(d.time); 
                })
                .y(function(d) { 
                    return y(d.value); 
                });

            // var type;
            // if (isStock) {
            //     type = "stock"
            // }else if(isHouse){
            //     type = "house"
            // }else{
            //     type = "bond"
            //}


            var svg = d3.select(this).selectAll("svg").data([data]);
            var gEnter = svg.enter().append("svg").append("g");
            
            
            // gEnter.append("path")
            //     .datum(data)
            //     .attr("class", "data")
            //     .attr("fill", "none")
            //     .attr("stroke", "steelblue")
            //     .attr("stroke-linejoin", "round")
            //     .attr("stroke-linecap", "round")
            //     .attr("stroke-width", 4);
    
           
            // gEnter.append("g").attr("class", "axis y")
            //     .append("text")
            //     .attr("fill", "#000")
            //     .attr("transform", "rotate(-90)")
            //     .attr("y", 6)
            //     .attr("dy", "0.71em")
            //     .attr("text-anchor", "end");

            gEnter.append("g").attr("class", "axis x")
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end");


            // gEnter.append("path")
            //     .attr("class", "data");

            var svg = selection.select("svg"); //change select method
            svg.attr('width', width).attr('height', height);
            var g = svg.select("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var xAxis = g.select("g.axis.x")
                .attr("transform", "translate(0," + (height - margin.bottom - margin.top) + ")")
                .call(d3.axisBottom(x).ticks(5));
                //.select(".domain");

            // g.select("g.axis.y")
            //     .attr("class", "axis y")
            //     .call(d3.axisLeft(y));


            var focus = g.append("g")
                    .attr("class", "focus")
                    .style("display", "none");

                focus.append('line')
                  .classed('x', true);

                focus.append('line')
                  .classed('y', true);

                focus.append("circle")
                    .attr("r", 7.5)
                    .style("fill","red");

                focus.append("text")
                    .attr("x", 15)
                    .attr("dy", ".31em");

                d3.selectAll('.focus line')
                  .attr({
                    fill: 'none',
                    'stroke': 'black',
                    'stroke-width': '1.5px',
                    'stroke-dasharray': '3 3'
                  });

            if (isStock) {
                gEnter.append("g").attr("class", "axis y stock")
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end");

                g.select("g.axis.y.stock")
                .attr("class", "axis y stock")
                .call(d3.axisLeft(y));

                for (var i = 0; i < chosenData.length; i++) {
                    
                    gEnter.append("path")
                        .datum(chosenData[i].data)
                        .attr("id", "data_"+chosenData[i].Symbol)
                        .attr("class", "data_path")
                        .attr("fill", "none")
                        .attr("stroke", colorScale[chosenData[i].Symbol])
                        .attr("stroke-linejoin", "round")
                        .attr("stroke-linecap", "round")
                        .attr("stroke-width", 4);
                    
                    g.select("#data_"+chosenData[i].Symbol)
                        .datum(chosenData[i].data)
                        .attr("d", line)
                        .call(transition)
                        .on("mouseover", function() { focus.style("display", null); })
                        .on("mouseout", function() { focus.style("display", "none"); })
                        .on("mousemove", mousemove);

                }    
            }else if (isHouse){
                
                gEnter.append("path")
                .datum(data)
                .attr("id", "data_house")
                .attr("class", "data_path")
                .attr("fill", "none")
                .attr("stroke", colorScale["house"])
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 4);

                g.select("#data_house")
                .datum(data)
                .attr("d", line)
                .call(transition)
                .on("mouseover", function() { focus.style("display", null); })
                .on("mouseout", function() { focus.style("display", "none"); })
                .on("mousemove", mousemove);

                //console.log("path 2 round")
                //console.log(gEnter)


                gEnter.append("g").attr("class", "axis y house")
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end");


                 g.select("g.axis.y.house")
                .attr("class", "axis y house")
                .call(d3.axisLeft(y));

            }else {
                
                gEnter.append("path")
                .datum(data)
                .attr("class", "data_path")
                .attr("id", "data_bond")
                .attr("fill", "none")
                .attr("stroke", colorScale["bond"])
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 4);

                g.select("#data_bond")
                .datum(data)
                .attr("d", line)
                .call(transition)
                .on("mouseover", function() { focus.style("display", null); })
                .on("mouseout", function() { focus.style("display", "none"); })
                .on("mousemove", mousemove);

                gEnter.append("g").attr("class", "axis y bond")
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("text-anchor", "end");


                 g.select("g.axis.y.bond")
                .attr("class", "axis y bond")
                .call(d3.axisLeft(y));


            }

            // g.select("path.data")
            //     .datum(data)
            //     .attr("d", line)
            //     .call(transition)
            //     .on("mouseover", function() { focus.style("display", null); })
            //     .on("mouseout", function() { focus.style("display", "none"); })
            //     .on("mousemove", mousemove);

            


          function mousemove(){
            var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.time > d1.time - x0 ? d1 : d0;

            focus.attr("transform", "translate(" + x(d.time) + "," + y(d.value) + ")");
            focus.select("text").text(function() { 
              return d.value; 
            });
             focus.select('line.x')
            .attr('x1', 0)
            .attr('x2', -x(d.time))
            .attr('y1', 0)
            .attr('y2', 0);

            focus.select('line.y')
            .attr('x1', 0)
            .attr('x2', 0)
            .attr('y1', 0)
            .attr('y2', height - y(d.value)-margin.bottom-margin.top);

          }
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




var lines = timelineChart();
function resize() {
    if (d3.selectAll(".linechart svg").empty()) {
        return;
    }
    lines.width(+d3.selectAll(".linechart").style("width").replace(/(px)/g, ""))
        .height(+d3.selectAll(".linechart").style("height").replace(/(px)/g, ""));
     d3.selectAll(".linechart").call(lines);
}

function trigger(){

}

// callback funciton from csv loading
var stockDataset, houseDataset,bondDataset, dataMerged, stockFiltered;
function ready(error, stock, house, bond){

    stockDataset = stock;
    houseDataset = house;
    bondDataset = bond;
    stockFiltered = stock.filter(d => 
        d.Symbol == chosenStock[0] ||
        d.Symbol == chosenStock[1] ||
        d.Symbol == chosenStock[2] ||
        d.Symbol== chosenStock[3] ||
        d.Symbol == chosenStock[4])

    var houseFiltered, bondFiltered;

    // line chart
    if (error) throw error;

    for(var i = 0 ; i < house.length; i++){
      if(house[i]["City"] == city){
        houseFiltered = house.filter(function(d){
          return d["City"] == city
        })
      }
    }
    houseFiltered = houseFiltered.filter(d => parseInt(d.Year_Month.substring(0,4))>=startYear)

    bondFiltered = bond.map(function(d){
        return {"Year_Month": d.DATE.substring(0,7), "Price": d.GS1}
    });

    bondFiltered = bondFiltered.filter(d => parseInt(d.Year_Month.substring(0,4))>=startYear)

    stockFiltered = stockFiltered.map(function(d){
        return {"Symbol": d.Symbol, 
            "Company": d.Company,
            "Year_Month": d.Year_Month, 
            "Price": d.Close}
    });
    stockFiltered = stockFiltered.filter(d => parseInt(d.Year_Month.substring(0,4))>=startYear)

    // trigger lines
    
    d3.selectAll(".path_stock").remove();
    d3.select("#chart_bond").datum(bondFiltered).call(lines);
    d3.select("#chart_stock").datum(stockFiltered).call(lines);
    d3.select("#chart_house").datum(houseFiltered).call(lines);

    d3.select(window).on('resize', resize);
    resize();     


    dataMerged = [];
    //console.log(totalTime)

    startIndex = 268 - totalTime;
    for (var i = startIndex; i < 268; i++) {

        var time = bond[i]["DATE"];
        var housevalue, bondvalue, stockvalue = new Array(5);

        if(i < 3) {
            housevalue = 0;
        } else {
            housevalue =  parseFloat(house[i-3].Price);
        }

        bondvalue = parseFloat(bond[i].GS1);

        var dataobj = {}
        dataobj["time"] = time
        dataobj["house"] = housevalue
        dataobj["bond"] = bondvalue

        for (var j = 0; j < chosenStock.length; j++) {
            var onestock = stockFiltered
                .filter(d => d.Symbol == chosenStock[j]);

            if (onestock.length - 268 + i < 0) {
                stockvalue[j] = 0;
            }else{
                stockvalue[j] = parseFloat(onestock[i-(268 - onestock.length)].Price); 
            }
            dataobj[chosenStock[j]] = stockvalue[j];
        }

        dataMerged.push(dataobj);
    }

    // draw bar-chart dynamically
    currentIx = 0
    function changeBarChart() {
        
        if (currentIx == 0) {
            drawBarAxis(dataMerged[currentIx]);
        }
        drawBarChart(dataMerged[currentIx]);
        drawBarLabel(dataMerged[currentIx]);
        drawBarPerChange(dataMerged[currentIx])
        yearChange(dataMerged[currentIx]);
        totalChange(dataMerged[currentIx]);
        interestChange(dataMerged[currentIx]);
        if (currentIx >= totalTime-1) {return;}
        setTimeout(changeBarChart, TRAINSITION_DURATION);
        currentIx += 1;
    }

    // triger bars
    setTimeout(changeBarChart, TRAINSITION_DURATION);
    
}


// reformat one year's data
function dataOneYear(updateData){

    var data=[]
    var keys = Object.keys(updateData)
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] != "time") {
            data.push({
                "class": keys[i],
                "value": Object.values(updateData)[i]
            })
        }   
    }
    //data = data.sort((x, y) => d3.ascending(x.value, y.value))
    return data;
}


// bar-related variable
var barsvg = d3.select("#bar-chart");
var barwidth = parseInt(barsvg.attr("width"));
var barheight = parseInt(barsvg.attr("height"));
var bandScale = d3.scaleBand()
    .domain(barclasses)
    .range([10, barheight])
    .paddingInner(0.2)
    .paddingOuter(0.2);

var colorScale = {"house": "#E2C843", 
    "bond": "#85BB4B"}
var stock_colors = ["#996666", "#bf4040", "#d92626", "#f20d0d", "#936c6c"]
for (var i = 0; i < chosenStock.length; i++) {
    colorScale[chosenStock[i]] = stock_colors[i]
}

// draw one bar chart
var drawBarChart = function(updateData){ 
    
    var bondScale = d3.scaleLog()
                .range([0, barwidth-50])
                .domain(d3.extent(bondDataset, d => parseFloat(d.GS1)));
    var houseScale = d3.scaleLinear()
                .range([0, barwidth-50])
                .domain(d3.extent(houseDataset, d => parseFloat(d.Price)));
    var stockScale = d3.scaleLinear()
                .range([0, barwidth-50])
                .domain(d3.extent(stockFiltered, d => parseFloat(d.Price)));

    //console.log(d3.range(stockDataset, d => parseFloat(d.Close)))
    const t = d3.transition()
        .duration(TRAINSITION_DURATION);
        //.delay(2000);
        //.ease(d3.easeLinear);

    var data = dataOneYear(updateData);
    //console.log(data)

    let barsG = barsvg.select('.bars-group');
    if (barsG.empty()) {
        barsG = barsvg.append('g')
          .attr('class', 'bars-group')
          .attr('transform', 'translate(50, 20)');
    }
    
    const bars = barsG
        .selectAll('.bar')
        .data(data, d => d.class);

    bars.exit().remove();

    bars.enter()
        .append('rect')
          .attr('class', "bar") //d => d.geoCode === 'WLD' ? 'bar wld' : 'bar'
          .attr('x', 20)
          .attr('fill', d => colorScale[d.class])
        .merge(bars)
          .transition()
          .duration(TRAINSITION_DURATION)
          .attr('y', d => bandScale(d.class))
          .attr('width', function(d, i) {
            if(d.class == "house") {
                if (d.value == 0) {return 0;}
                else {return houseScale(d.value);}  
            } else if(d.class == "bond"){
                if (d.value == 0) {return 0;}
                else return bondScale(d.value);
            } else {//stock
                if (d.value == 0) {return 0;}
                else return stockScale(d.value);
                console.log(d.value)
                console.log(stockScale(d.value))
            }
          }) //d => xScale(d.value
          .attr('height', bandScale.bandwidth());

}

// draw upper axis for bar
function drawBarAxis() {
    var barAxis = d3.select("#baraxis");
    if (barAxis.empty()) {
        barAxis = barsvg.append("g")
        .attr('class', 'baraxis');

        barAxis.append('line')
        .attr('x1', 20)
        .attr('y1', 20)
        .attr('x2', barwidth-20)
        .attr('y2', 20)
        .attr('stroke-width', 1)
        .attr('text-anchor', 'center')
        .attr('stroke', 'black');

        barAxis.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .attr('font-size', 15)
        .text('How much you have earned so far');
    }
}

//draw labels (bar name) of barchart
function drawBarLabel(updateData){
    var data1year = dataOneYear(updateData);

    barsvg.select('#barlabel').remove();

    var barlabel = barsvg.append('g')
    .attr('id', 'barlabel')
    .attr('transform', 'translate(55, 20)');

    barlabel.selectAll('text')
    .data(data1year).enter()
    .append('text')
    .attr('x', 20)
    .attr('y', d => bandScale(d.class)+bandScale.bandwidth()*(1/2+0.1))
    .attr('font-size', 15)
    .attr('text-anchor', 'center')
    .text(d => d.class);
}

//draw change of percentage of barchart
function drawBarPerChange(updateData){
    var data1year = dataOneYear(updateData);

    barsvg.select('#barperchange').remove();
    var format = d3.format(".2f");

    var barperchange = barsvg.append('g')
    .attr('id', 'barperchange')
    .attr('transform', 'translate(5, 20)');

    barperchange.selectAll('text')
    .data(data1year).enter()
    .append('text')
    .attr('x', 10)
    .attr('y', d => bandScale(d.class)+bandScale.bandwidth()*(1/2+0.1))
    .attr('font-size', 15)
    .attr('text-anchor', 'center')
    .text(d => Math.round(d.value*100)/100)
        .transition()
        .duration(TRAINSITION_DURATION);
}

// draw year change division
var svgchange = d3.select('#year-change');

svgchange = svgchange.append('g')
.attr('transform', "translate(0, 25)");

// change of year
var yearg = svgchange.append('g').attr('id', 'year');
yearg.append('line')
.attr('x1', 20)
.attr('y1', 50)
.attr('x2', (barwidth-20)/2-10)
.attr('y2', 50)
.attr('stroke-width', 1)
.attr('stroke', 'black');

yearg.append('text')
.attr('x', 20)
.attr('y', 40)
.attr('font-size', 15)
.text('Current Time');

// current total
var totalg = svgchange.append('g').attr('id', 'total');
totalg.append('line')
.attr('x1', (barwidth-20)/2)
.attr('y1', 50)
.attr('x2', (barwidth-20)*3/4-10)
.attr('y2', 50)
.attr('stroke-width', 1)
.attr('stroke', 'black');

totalg.append('text')
.attr('x', (barwidth-20)/2)
.attr('y', 40)
.attr('font-size', 15)
.text('Total');

// current monthly interest
var interstg = svgchange.append('g').attr('id', 'monthlyInterest');
interstg.append('line')
.attr('x1', (barwidth-20)*3/4)
.attr('y1', 50)
.attr('x2', (barwidth-20)-10)
.attr('y2', 50)
.attr('stroke-width', 1)
.attr('stroke', 'black');

interstg.append('text')
.attr('x', (barwidth-20)*3/4)
.attr('y', 40)
.attr('font-size', 15)
.text('Monthly Interest');

// change year text
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function yearChange(updateData){
    var year = new Date(updateData.time).getFullYear();
    var month = monthNames[new Date(updateData.time).getMonth()];
    //var format = d3.format(",d");
    yearg.select("#currentyear").remove();
    yearg.select("#currentmonth").remove();

    yearg.append('text')
    .attr('id', "currentyear")
    .attr('x', 20)
    .attr('y', 100)
    .attr('font-size', 25)
    .attr('text-anchor', 'center')
    .text(year)
        .transition()
        .duration(TRAINSITION_DURATION);

    yearg.append('text')
    .attr('id', "currentmonth")
    .attr('x', 100)
    .attr('y', 100)
    .attr('font-size', 25)
    .attr('text-anchor', 'center')
    .text(month)
        .transition()
        .duration(TRAINSITION_DURATION);

}

// change total text
function totalChange(updateData){

    var total = updateData.house;

    totalg.select("#currenttotal").remove();

    totalg.append('text')
    .attr('id', "currenttotal")
    .attr('x', (barwidth-20)/2)
    .attr('y', 100)
    .attr('font-size', 25)
    .attr('text-anchor', 'center')
    .text(total)
        .transition()
        .duration(TRAINSITION_DURATION);
}

// change total text
function interestChange(updateData){

    var interest = updateData.house;

    interstg.select("#currentinterest").remove();

    interstg.append('text')
    .attr('id', "currentinterest")
    .attr('x', (barwidth-20)*3/4)
    .attr('y', 100)
    .attr('font-size', 25)
    .attr('text-anchor', 'center')
    .text(interest)
        .transition()
        .duration(TRAINSITION_DURATION);
}


d3.queue()
      .defer(d3.csv, "stock_price_clean.csv")
      .defer(d3.csv, "house_price_clean.csv")
      .defer(d3.csv, "GS1_clean.csv")
      .await(ready);


