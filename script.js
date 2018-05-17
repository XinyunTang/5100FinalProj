// Year slider
function brushed() {
    USER_YEAR = year_slider.value();
    d3.select("#year_value").text(USER_YEAR);
}
var year_slider = d3.slider().min(1996).max(2018).ticks(0).stepValues(d3.range(1996,2018)).value(2000)
    .callback(brushed);
d3.select("#year_slider").call(year_slider);
d3.select("#year_value").text(2000);

var user_year = year_slider.value();

// Auto complete for city and stock
var cities = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Philadelphia, PA', 'Phoenix, AZ', 'Las Vegas, NV',
       'San Antonio, TX', 'San Diego, CA', 'San Jose, CA', 'Jacksonville, FL', 'San Francisco, CA', 'Austin, TX',
       'Fort Worth, TX', 'Detroit, MI', 'Columbus, OH', 'Memphis, TN', 'Charlotte, NC', 'El Paso, TX', 'Boston, MA', 'Seattle, WA',
       'Baltimore, MD', 'Denver, CO', 'Washington, DC', 'Nashville, TN', 'Milwaukee, WI', 'Tucson, AZ', 'Portland, OR', 'Oklahoma City, OK',
       'Omaha, NE', 'Albuquerque, NM', 'Fresno, CA', 'Sacramento, CA', 'Mesa, AZ', 'Long Beach, CA', 'Kansas City, MO',
       'Virginia Beach, VA', 'Colorado Springs, CO', 'Atlanta, GA', 'Miami, FL', 'Oakland, CA', 'Tulsa, OK', 'Cleveland, OH',
       'Honolulu, HI', 'Minneapolis, MN', 'Arlington, TX', 'Raleigh, NC', 'Wichita, KS']
var stocks = ['MSI', 'AFL', 'HRS', 'FOXA', 'NSC', 'CMCSA', 'ETR', 'HP', 'IT', 'CTXS', 'JD', 'ORLY', 'NRG', 'ALK', 'INCY', 'NEE', 'CXO', 
            'VLO', 'FISV', 'JCI', 'WMB', 'ABC', 'DLTR', 'NWL', 'SBAC', 'MLM', 'CF', 'FBHS', 'PBCT', 'KHC', 'ADM', 'FLIR', 'AON', 'JWN',
            'WYNN', 'GPS', 'SIVB', 'PXD', 'VRSN', 'ROP', 'ANSS', 'WRK', 'GD', 'TDG', 'CCI', 'M', 'RMD', 'AMZN', 'IDXX', 'BLL', 'LUV', 
            'NTRS', 'NFX', 'CAH', 'CMA', 'BEN', 'EXC', 'RCL', 'REGN', 'WY', 'PKI', 'RTN', 'BIIB', 'HAS', 'PRGO', 'HSIC', 'DIS', 'EQT', 
            'CTSH', 'HON', 'PNW', 'INTC', 'PX', 'SLB', 'COST', 'CBS', 'DOV', 'MSFT', 'LNC', 'FAST', 'RL', 'DHI', 'AVB', 'MON', 'MCHP', 
            'PM', 'MAS', 'UTX', 'DISCK', 'MRK', 'AGN', 'TSN', 'VTR', 'IR', 'ICE', 'MNST', 'F', 'JBHT', 'RHI', 'EOG', 'XLNX', 'DG', 'CMG', 
            'STT', 'SYY', 'FITB', 'AVGO', 'CPB', 'MDLZ', 'BHGE', 'EQR', 'BF.B', 'HCA', 'XEC', 'EBAY', 'FOX', 'AMD', 'VFC', 'PSA', 'ESS', 
            'WYN', 'DTE', 'APTV', 'SPGI', 'AWK', 'SYMC', 'PEG', 'ADS', 'K', 'BWA', 'APA', 'COF', 'SYF', 'COL', 'FL', 'A', 'MAT', 'DFS', 
            'MO', 'SRE', 'DUK', 'CVS', 'OKE', 'MTB', 'BKNG', 'TIF', 'KMI', 'NOC', 'UNP', 'DVN', 'LEG', 'MAA', 'UA', 'DAL', 'T', 'LMT', 
            'CSX', 'NOV', 'WU', 'COTY', 'HD', 'XL', 'HUM', 'ALGN', 'BAX', 'ZTS', 'SO', 'VNO', 'AYI', 'L', 'PNC', 'SYK', 'ORCL', 'CBOE', 
            'UHS', 'DISCA', 'AEP', 'PHM', 'PG', 'GGP', 'LILA', 'WM', 'GE', 'RF', 'PFE', 'TRIP', 'ED', 'UNH', 'URI', 'CNP', 'AEE', 'NDX', 
            'ANTM', 'SJM', 'GIS', 'QRVO', 'HLT', 'AIG', 'TMO', 'CA', 'HBI', 'KR', 'PSX', 'ADSK', 'STX', 'MAR', 'TTWO', 'XRX', 'ARNC', 
            'ALL', 'NCLH', 'CBG', 'MTD', 'DPS', 'DLR', 'WEC', 'HAL', 'VZ', 'TXT', 'QCOM', 'EMR', 'EQIX', 'NAVI', 'MMC', 'HRL', 'CTAS', 
            'CL', 'KIM', 'CSCO', 'LKQ', 'BRK.B', 'PLD', 'HIG', 'AMP', 'KORS', 'MDT', 'BLK', 'CTL', 'SCHW', 'TPR', 'CERN', 'COG', 'CDNS', 
            'TWX', 'BDX', 'EW', 'WAT', 'CMS', 'CNC', 'TSLA', 'KMB', 'AAL', 'AME', 'IBM', 'NWS', 'CVX', 'PGR', 'VIAB', 'ANDV', 'MCK', 
            'XOM', 'CAG', 'ABBV', 'SPG', 'ZION', 'WFC', 'ROST', 'NKTR', 'DJIA', 'NI', 'UPS', 'CHTR', 'PWR', 'KEY', 'PYPL', 'LH', 'AJG', 
            'AZO', 'FCX', 'ABT', 'ATVI', 'ULTA', 'HES', 'GOOG', 'SRCL', 'IRM', 'TEL', 'MYL', 'HOLX', 'COO', 'APH', 'ESRX', 'FRT', 'HPE', 
            'MRO', 'BIDU', 'GS', 'SNPS', 'TRV', 'MPC', 'CI', 'SHPG', 'RE', 'IPGP', 'SCG', 'BAC', 'AES', 'AIZ', 'IVZ', 'XRAY', 'KO', 
            'WBA', 'NVDA', 'TJX', 'NTES', 'EIX', 'FB', 'O', 'HCP', 'MA', 'CAT', 'GM', 'JEC', 'UAL', 'TAP', 'DXC', 'CTRP', 'SNA', 'UDR', 
            'FMC', 'CHKP', 'YUM', 'D', 'LNT', 'IP', 'CB', 'HRB', 'FTI', 'EXPD', 'SWK', 'WLTW', 'MKC', 'HII', 'ISRG', 'NWSA', 'FLR', 
            'AKAM', 'VRTX', 'EL', 'MELI', 'ADI', 'XEL', 'HOG', 'MMM', 'UAA', 'MHK', 'IQV', 'EXR', 'AXP', 'OMC', 'LBTYK', 'NFLX', 'ZBH', 
            'ALB', 'NLSN', 'DRI', 'APC', 'BMY', 'CHRW', 'PAYX', 'ILMN', 'ECL', 'QRTEA', 'ALLE', 'SHW', 'WELL', 'SBUX', 'UNM', 'ETN', 
            'DE', 'SIRI', 'CME', 'ACN', 'IPG', 'EA', 'GOOGL', 'PVH', 'JPM', 'BK', 'AMAT', 'GRMN', 'PEP', 'NTAP', 'ITW', 'HPQ', 'MAC', 
            'BA', 'V', 'HBAN', 'EFX', 'USB', 'FFIV', 'ROK', 'MGM', 'PPL', 'AAP', 'PKG', 'SLG', 'TMK', 'CELG', 'NBL', 'SEE', 'C', 
            'LBTYA', 'BXP', 'WDC', 'EMN', 'CHD', 'LILAK', 'HST', 'AIV', 'RHT', 'ETFC', 'PH', 'WMT', 'GWW', 'LOW', 'STI', 'PFG', 'VOD', 
            'DVA', 'WHR', 'MU', 'TSS', 'DISH', 'RRC', 'LRCX', 'MET', 'AAPL', 'PRU', 'AMT', 'NDAQ', 'RSG', 'ARE', 'PCAR', 'MOS', 'IFF', 
            'INTU', 'ES', 'TGT', 'KSS', 'APD', 'FIS', 'HSY', 'TMUS', 'JNJ', 'MCO', 'DGX', 'FTV', 'GILD', 'RJF', 'DRE', 'TXN', 'CLX', 
            'OXY', 'IXIC', 'CRM', 'PCG', 'BBY', 'ALXN', 'MCD', 'ADBE', 'SWKS', 'XYL', 'JNPR', 'LYB', 'LUK', 'EXPE', 'GPN', 'VAR', 
            'TROW', 'CMI', 'CINF', 'FLS', 'KMX', 'STZ', 'BSX', 'ADP', 'EVHC', 'NUE', 'NEM', 'KSU', 'AOS', 'CCL', 'FE', 'DWDP', 'INFO', 
            'GSPC', 'LLL', 'AMG', 'AMGN', 'VMC', 'LB', 'VRSK', 'MXIM', 'AET', 'FDX', 'GLW', 'BBT', 'BHF', 'PNR', 'COP', 'LEN', 'BMRN', 
            'REG', 'MS', 'CSRA', 'DHR', 'AVY', 'KLAC', 'GPC', 'NKE', 'CFG', 'LLY', 'GT', 'TSCO', 'PPG']

$( "#cityInput" ).autocomplete({
    source: function(request, response) {
        var results = $.ui.autocomplete.filter(cities, request.term);
        
        response(results.slice(0, 10));
    }
    });
$( "#stockInput" ).autocomplete({
    source: function(request, response) {
        var results = $.ui.autocomplete.filter(stocks, request.term);
        
        response(results.slice(0, 10));
    }
    });

// Add stocks in the stock input
var added = [];
function Addstock() {
    var stock = document.getElementById('stockInput').value;
    var stock = stock.replace(/ /g, '')
    if (stock != "" && added.indexOf(stock) < 0){
        var iDiv = document.createElement('div');
        iDiv.id = stock;
        iDiv.className = 'stockAdded';
        iDiv.innerHTML = stock;
        added.push(stock);
        // console.log(iDiv);
        document.getElementById('Addstocks').appendChild(iDiv);   
        $("#" + stock).append("<span class='xcross'>x</span>");    
    }
    if (document.getElementsByClassName("stockAdded").length == 5){
        var x = document.getElementById("addbutton");
        x.style.display = "none";
    }
}

$('#Addstocks').on('click','.stockAdded',function()  { 
    var thisID = this.id;
    var index = added.indexOf(thisID);
    if (index > -1) {
      added.splice(index, 1);
    }
    $(this).remove();
});

//slider of inverstment percentage
var property_percent = 0.4;
var stock_percent = 0.3;
var bond_percent = 0.3;

$("#slider-range").slider({
    orientation: "vertical",
    range: true,
    min: 0,
    max: 100,
    values: [30, 60],
    slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
        $('#YourDiv').css('height', 100 - ui.values[1] +'%');
        property_percent = (100 - ui.values[1])/100;
        stock_percent = (ui.values[1] - ui.values[0])/100;
        bond_percent = ui.values[0]/100;
        $("#property_value").text((property_percent* 100).toFixed(0) + '%');
        $("#stock_value").text((stock_percent* 100).toFixed(0) + '%');
        $("#bond_value").text((bond_percent* 100).toFixed(0) + '%');
    }
}).append('<div id="YourDiv" style="width:100%; height: 50%"></div>');

$("#amount").val("$" + $("#slider-range").slider("values", 0) +
    " - $" + $("#slider-range").slider("values", 1));


var inflation_rate;
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
    return res;
}
var choice_performance = [    {"stock_long": "Bond ", "price": 3.1},
    {"stock_long": "Stock ", "price": 17},
    {"stock_long": "Property", "price": 8},
    {"stock_long": "Your Investment Propofio", "price": 18}];
overall = 18;

d3.csv("inflation.csv", function(data) {
    inflation_rate = calc_inflation(user_year, 2018, data);
    var inf_d = {}
    inf_d["price"] = inflation_rate;
    inf_d["stock_long"] = "inflation";
    inf_d["type"] = "inflation";
    choice_performance.push(inf_d);
    drawBar(choice_performance, svg1, height1);


    if(overall/inflation_rate > 1){
        $("#congra").text("Congratulation!");
        $("#times_compare").text(Math.round(overall/inflation_rate));
        $("#lose").hide();
        $("#win").show();
    } else {
        $("#congra").text("Oops!");
        $("#lose").show();
        $("#win").hide();
    }
    $("#year_value2").text(user_year);
    $("#inflation_value").text((inflation_rate * 100000).toFixed(2));
});



var margin = {top: 20, right: 90, bottom: 20, left: 170};
var width = 800 - margin.left - margin.right,
    height1 = 250 - margin.top - margin.bottom;
    height2 = 400 - margin.top - margin.bottom;

var svg1 = d3.select("#optimal_bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height1 + margin.top + margin.bottom);

var svg2 = d3.select("#optimal_bar").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height2 + margin.top + margin.bottom);

// parse the data
function parseLine(line) {
    line.year = Number(line.year);
    line.price = Number(line.price);
    line.rank = Number(line.rank);
    return line;
}

// adding data from optimal
d3.csv("GS1_optimal.csv", parseLine, function(error, data){
    bond_data = data;
    bond_year = bond_data.filter(function(d) { return d.year==user_year; });
    bond_price = bond_year[0].price;

    d3.csv("optimals.csv", parseLine, function(error, data){
        optimal_data = data;
        opt_year = optimal_data.filter(function(d) { return d.year==user_year; });

        stock_price = opt_year.filter(function(d) { return d.rank==0&d.type=="stock"; })[0].price;
        property_price = opt_year.filter(function(d) { return d.rank==0&d.type=="property"; })[0].price;

        
        total = property_percent * property_price + stock_percent * stock_price + bond_percent * bond_price;
        var d = {}
        d["price"] = total
        d["stock_long"] = "Optimal Investment Portfolio"
        d["type"] = "total"
        opt_year.push(d);
        console.log(total);
        console.log(opt_year);
        console.log(stock_price);
        drawBar(opt_year, svg2, height2);
    })
});



function drawBar(data, svg, height) {
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleBand().range([height, 0]);

    var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // data.sort(function(a, b) { return a.stock_price - b.stock_price; });
    
    x.domain([0, d3.max(data, function(d) { return d.price; })]);
    y.domain(data.map(function(d) { return d.stock_long; })).padding(0.1);

    g.append("g")
        .attr("class", "x axis")
        // .attr("transform", "translate(0,0)")
        .call(d3.axisTop(x).ticks(5).tickFormat(function(d) { return parseInt(d); }).tickSizeInner([-3]));

    g.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(y));

    var bars = svg.selectAll(".bar")
                .data(data)
                .enter()
                .append("g");

    bars.append("rect")
        .attr("class", "bar")
        .attr("x", margin.left)
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d.stock_long) + margin.top; })
        .attr("width", function(d) { return x(d.price); })
        .attr("fill", function (d){ 
            if (d.type == "stock"){
                return "#996666";
            } else if (d.type == "property"){
                return "#E2C843";
            }
        });

    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        .attr("y", function (d) {
            return y(d.stock_long)+ y.bandwidth() / 2 + 4 + margin.top;
        })
        .attr("x", function (d) {
            return x(d.price) + margin.left;
        })
        .text(function (d) {

            return Number((d.price).toFixed(2)) + " times" ;
        });

};









