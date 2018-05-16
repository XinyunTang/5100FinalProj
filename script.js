// Year slider
function brushed() {
    USER_YEAR = year_slider.value();
    d3.select("#year_value").text(USER_YEAR);
}

var year_slider = d3.slider().min(1996).max(2018).ticks(0).stepValues(d3.range(1996,2018)).value(2000)
    .callback(brushed);
d3.select("#year_slider").call(year_slider);
d3.select("#year_value").text(2000);

// $('#cityInput').autocomplete({
//   // autoFocus: true,
//   source: 
//   // function(request, response) {
//   //     var results = $.ui.autocomplete.filter(cities, request.term);
//   //     response(results.slice(0,10)); // only display five auto suggestions
//   // }
//       function(req, responseFn) {
//         var re = $.ui.autocomplete.escapeRegex(req.term);
//         // var matcher = new RegExp( "^" + re, "i" );
//         var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex(request.term), "i" );
//         response( $.grep( cities, function( item ){
//           return matcher.test( item.label );
//       }) );
//       //   response( select.children( "option" ).map(function() {
//       //     var text = $( this ).text();
//       //     if ( this.value && ( !request.term || matcher.test(text) ) )
//       //         return {
//       //             label: text.replace(
//       //                 new RegExp(
//       //                     "(?![^&;]+;)(?!<[^<>]*)(" +
//       //                     $.ui.autocomplete.escapeRegex(request.term) +
//       //                     ")(?![^<>]*>)(?![^&;]+;)", "gi"
//       //                 ), "<strong>$1</strong>" ),
//       //             value: text,
//       //             option: this
//       //         };
//       // }) );
//     }
//   }).keyup(function() { // restrict the input to the available trails in the data
//     var isValid = false;
//     for (i in cities) {
//         if (cities[i].toLowerCase().match(this.value.toLowerCase())) {
//             isValid = true;
//         }
//     }   
//     if (!isValid) {
//         this.value = defaltValue;
//     } else {
//         defaltValue = this.value;
//     }
//   });

$('#stockInput').autocomplete({
  // autoFocus: true,
  source: function(request, response) {
      var results = $.ui.autocomplete.filter(stocks, request.term);
      response(results.slice(0,10)); // only display five auto suggestions
  }
  }).keyup(function() { // restrict the input to the available trails in the data
    var isValid = false;
    for (i in stocks) {
        if (stocks[i].toLowerCase().match(this.value.toLowerCase())) {
            isValid = true;
        }
    }   
    if (!isValid) {
        this.value = defaltValue;
    } else {
        defaltValue = this.value;
    }
  });





// autocomplete part comes from https://www.w3schools.com/howto/howto_js_autocomplete.asp
// function autocomplete(inp, arr) {
//   /*the autocomplete function takes two arguments,
//   the text field element and an array of possible autocompleted values:*/
//   var currentFocus;
//   /*execute a function when someone writes in the text field:*/
//   inp.addEventListener("input", function(e) {
//       var a, b, i, val = this.value;
//       /*close any already open lists of autocompleted values*/
//       closeAllLists();
//       if (!val) { return false;}
//       currentFocus = -1;
//       /*create a DIV element that will contain the items (values):*/
//       a = document.createElement("DIV");
//       a.setAttribute("id", this.id + "autocomplete-list");
//       a.setAttribute("class", "autocomplete-items");
//       /*append the DIV element as a child of the autocomplete container:*/
//       this.parentNode.appendChild(a);
//       /*for each item in the array...*/
//       for (i = 0; i < arr.length; i++) {
//         /*check if the item starts with the same letters as the text field value:*/
//         if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//           /*create a DIV element for each matching element:*/
//           b = document.createElement("DIV");
//           /*make the matching letters bold:*/
//           b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//           b.innerHTML += arr[i].substr(val.length);
//           /*insert a input field that will hold the current array item's value:*/
//           b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//           /*execute a function when someone clicks on the item value (DIV element):*/
//               b.addEventListener("click", function(e) {
//               /*insert the value for the autocomplete text field:*/
//               inp.value = this.getElementsByTagName("input")[0].value;
//               /*close the list of autocompleted values,
//               (or any other open lists of autocompleted values:*/
//               closeAllLists();
//           });
//           a.appendChild(b);
//         }
//       }
//   });
//   /*execute a function presses a key on the keyboard:*/
//   inp.addEventListener("keydown", function(e) {
//       var x = document.getElementById(this.id + "autocomplete-list");
//       if (x) x = x.getElementsByTagName("div");
//       if (e.keyCode == 40) {
//         /*If the arrow DOWN key is pressed,
//         increase the currentFocus variable:*/
//         currentFocus++;
//         /*and and make the current item more visible:*/
//         addActive(x);
//       } else if (e.keyCode == 38) { //up
//         /*If the arrow UP key is pressed,
//         decrease the currentFocus variable:*/
//         currentFocus--;
//         /*and and make the current item more visible:*/
//         addActive(x);
//       } else if (e.keyCode == 13) {
//         /*If the ENTER key is pressed, prevent the form from being submitted,*/
//         e.preventDefault();
//         if (currentFocus > -1) {
//           /*and simulate a click on the "active" item:*/
//           if (x) x[currentFocus].click();
//         }
//       }
//   });
//   function addActive(x) {
//     /*a function to classify an item as "active":*/
//     if (!x) return false;
//     /*start by removing the "active" class on all items:*/
//     removeActive(x);
//     if (currentFocus >= x.length) currentFocus = 0;
//     if (currentFocus < 0) currentFocus = (x.length - 1);
//     /*add class "autocomplete-active":*/
//     x[currentFocus].classList.add("autocomplete-active");
//   }
//   function removeActive(x) {
//     /*a function to remove the "active" class from all autocomplete items:*/
//     for (var i = 0; i < x.length; i++) {
//       x[i].classList.remove("autocomplete-active");
//     }
//   }
//   function closeAllLists(elmnt) {
//     /*close all autocomplete lists in the document,
//     except the one passed as an argument:*/
//     var x = document.getElementsByClassName("autocomplete-items");
//     for (var i = 0; i < x.length; i++) {
//       if (elmnt != x[i] && elmnt != inp) {
//       x[i].parentNode.removeChild(x[i]);
//     }
//   }
// }

/*execute a function when someone clicks in the document:*/
// document.addEventListener("click", function (e) {
//     closeAllLists(e.target);
// });
// }

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
            'REG', 'MS', 'CSRA', 'DHR', 'AVY', 'KLAC', 'GPC', 'NKE', 'CFG', 'LLY', 'GT', 'TSCO', 'PPG', 'Motorola Solutions Inc.', 'AFLAC Inc', 'Harris Corporation',
       'Twenty-First Century Fox Inc', 'Norfolk Southern Corp.','Comcast Corp', 'Entergy Corp.', 'Helmerich & Payne',
       'Gartner Inc', 'Citrix Systems Inc', 'JD.com Inc', "O'Reilly Automotive Inc", 'NRG Energy', 'Alaska Air Group Inc',
       'Incyte Corp', 'NextEra Energy', 'Concho Resources', 'Valero Energy', 'Fiserv Inc', 'Johnson Controls International',
       'Williams Cos.', 'AmerisourceBergen Corp', 'Dollar Tree Inc','Newell Brands', 'SBA Communications', 'Martin Marietta Materials',
       'CF Industries Holdings Inc', 'Fortune Brands Home & Security',"People's United Financial", 'Kraft Heinz Co',
       'Archer-Daniels-Midland Co', 'FLIR Systems', 'Aon plc','Nordstrom', 'Wynn Resorts Ltd', 'Gap Inc.', 'SVB Financial Group',
       'Pioneer Natural Resources', 'Verisign Inc.', 'Roper Technologies', 'ANSYS', 'WestRock Company', 'General Dynamics', 'TransDigm Group',
       'Crown Castle International Corp.', "Macy's Inc.", 'ResMed', 'Amazon.com Inc', 'IDEXX Laboratories Inc', 'Ball Corp',
       'Southwest Airlines', 'Northern Trust Corp.', 'Newfield Exploration Co', 'Cardinal Health Inc.', 'Comerica Inc.',
       'Franklin Resources', 'Exelon Corp.', 'Royal Caribbean Cruises Ltd', 'Regeneron Pharmaceuticals Inc',
       'Weyerhaeuser Corp.', 'PerkinElmer', 'Raytheon Co.', 'Biogen Inc', 'Hasbro Inc', 'Perrigo', 'Henry Schein Inc', 'Walt Disney',
       'EQT Corporation', 'Cognizant Technology Solutions Corp', "Honeywell Int'l Inc.", 'Pinnacle West Capital', 'Intel Corp',
       'Praxair Inc.', 'Schlumberger Ltd.', 'Costco Wholesale Corp', 'CBS Corp.', 'Dover Corp.', 'Microsoft Corp', 'Lincoln National',
       'Fastenal Co', 'Polo Ralph Lauren Corp.', 'D. R. Horton', 'AvalonBay Communities, Inc.', 'Monsanto Co.',
       'Microchip Technology Inc', 'Philip Morris International', 'Masco Corp.', 'United Technologies', 'Discovery Inc', 'Merck',
       'Allergan, Plc', 'Tyson Foods', 'Ventas Inc', 'Ingersoll-Rand PLC', 'Intercontinental Exchange', 'Monster Beverage Corp', 'Ford Motor',
       'J.B. Hunt Transport Services Inc', 'Robert Half International', 'EOG Resources', 'Xilinx Inc', 'Dollar General',
       'Chipotle Mexican Grill', 'State Street Corp.', 'Sysco Corp.', 'Fifth Third Bancorp', 'Broadcom Inc', 'Campbell Soup',
       'Mondelez International Inc', 'Baker Hughes, a GE Company', 'Equity Residential', 'Brown-Forman Corp.', 'HCA Holdings',
       'Cimarex Energy', 'eBay Inc', 'Advanced Micro Devices Inc', 'V.F. Corp.', 'Public Storage', 'Essex Property Trust, Inc.',
       'Wyndham Worldwide', 'DTE Energy Co.', 'Aptiv Plc', 'S&P Global, Inc.', 'American Water Works Company Inc',
       'Symantec Corp', 'Public Serv. Enterprise Inc.', 'Alliance Data Systems', 'Kellogg Co.', 'BorgWarner',
       'Apache Corporation', 'Capital One Financial', 'Synchrony Financial', 'Rockwell Collins', 'Foot Locker Inc',
       'Agilent Technologies Inc', 'Mattel Inc', 'Discover Financial Services', 'Altria Group Inc', 'Sempra Energy',
       'Duke Energy', 'CVS Health', 'ONEOK', 'M&T Bank Corp.', 'Booking Holdings Inc', 'Tiffany & Co.', 'Kinder Morgan',
       'Northrop Grumman Corp.', 'Union Pacific', 'Devon Energy Corp.', 'Leggett & Platt', 'Mid-America Apartments', 'Under Armour Class C', 'Delta Air Lines Inc.', 'AT&T Inc.',
       'Lockheed Martin Corp.', 'CSX Corp', 'National Oilwell Varco Inc.', 'Western Union Co', 'Coty, Inc', 'The Home Depot', 'XL Capital',
       'Humana Inc.', 'Align Technology Inc', 'Baxter International Inc.','Zoetis', 'Southern Co.', 'Vornado Realty Trust',
       'Acuity Brands Inc', 'Loews Corp.', 'PNC Financial Services','Stryker Corp.', 'Oracle Corp.', 'Cboe Global Markets',
       'Universal Health Services, Inc.', 'American Electric Power','Pulte Homes Inc.', 'Procter & Gamble',
       'General Growth Properties Inc.', 'Liberty Latin America Ltd','Waste Management Inc.', 'General Electric',
       'Regions Financial Corp.', 'Pfizer', 'TripAdvisor','Consolidated Edison', 'UnitedHealth Group',
       'United Rentals, Inc.', 'CenterPoint Energy', 'Ameren Corp','NASDAQ 100', 'Anthem Inc.', 'JM Smucker', 'General Mills',
       'Qorvo', 'Hilton Worldwide Holdings Inc','American International Group, Inc.', 'Thermo Fisher Scientific',
       'CA Inc', 'Hanesbrands Inc', 'Kroger Co.', 'Phillips 66','Autodesk Inc', 'Seagate Technology PLC',
       'Marriott International Inc', 'Take-Two Interactive Software','Xerox Corp.', 'Arconic Inc.', 'Allstate Corp',
       'Norwegian Cruise Line Holdings Ltd', 'CBRE Group Inc','Mettler Toledo', 'Dr Pepper Snapple Group',
       'Digital Realty Trust Inc', 'Wec Energy Group Inc','Halliburton Co.', 'Verizon', 'Textron Inc.', 'Qualcomm Inc',
       'Emerson Electric Company', 'Equinix', 'Navient','Marsh & McLennan', 'Hormel Foods Corp.', 'Cintas Corp',
       'Colgate-Palmolive', 'Kimco Realty', 'Cisco Systems Inc','LKQ Corporation', 'Berkshire Hathaway', 'Prologis',
       'Hartford Financial Svc.Gp.', 'Ameriprise Financial','Michael Kors Holdings', 'Medtronic plc', 'BlackRock',
       'CenturyLink Inc', 'Charles Schwab Corporation', 'Tapestry','Cerner Corp', 'Cabot Oil & Gas', 'Cadence Design Systems',
       'Time Warner Inc.', 'Becton Dickinson', 'Edwards Lifesciences', 'Waters Corporation', 'CMS Energy', 'Centene Corporation',
       'Tesla Inc', 'Kimberly-Clark', 'American Airlines Group Inc','AMETEK Inc.', 'IBM', 'News Corp. Class B', 'Chevron',
       'Progressive Corp.', 'Viacom Inc', 'Andeavor', 'McKesson Corp.','ExxonMobil', 'Conagra Brands', 'AbbVie Inc.',
       'Simon Property Group Inc', 'Zions Bancorp', 'Wells Fargo','Ross Stores Inc', 'Nektar Therapeutics',
       'Dow Jones Industrial Average', 'NiSource Inc.','United Parcel Service', 'Charter Communications Inc',
       'Quanta Services Inc.', 'KeyCorp', 'PayPal Holdings Inc','Laboratory Corp. of America Holding', 'Arthur J. Gallagher & Co.',
       'AutoZone Inc', 'Freeport-McMoRan Inc.', 'Abbott Laboratories','Activision Blizzard Inc', 'Ulta Beauty Inc', 'Hess Corporation',
       'Alphabet Class C', 'Stericycle Inc', 'Iron Mountain Incorporated','TE Connectivity Ltd.', 'Mylan NV', 'Hologic Inc',
       'The Cooper Companies', 'Amphenol Corp','Express Scripts Holding Co', 'Federal Realty Investment Trust',
       'Hewlett Packard Enterprise', 'Marathon Oil Corp.', 'Baidu Inc',
       'Goldman Sachs', 'Synopsys Inc.', 'Travelers', 'Marathon Petroleum', 'CIGNA Corp.', 'Shire PLC',
       'Everest Re Group Ltd.', 'IPG Photonics Corporation', 'SCANA Corp', 'Bank of America Corp', 'AES Corp', 'Assurant Inc.',
       'Invesco Ltd.', 'Dentsply Sirona Inc', 'Coca-Cola', 'Walgreens Boots Alliance Inc', 'NVIDIA Corp',
       'TJX Companies Inc.', 'NetEase Inc', "Edison Int'l", 'Facebook', 'Realty Income Corporation', 'HCP Inc.', 'Mastercard Inc.',
       'Caterpillar', 'General Motors', 'Jacobs Engineering Group', 'United Continental Holdings', 'Molson Coors Brewing Company',
       'DXC Technology Company', 'Ctrip.Com International Ltd', 'Snap-On Inc.', 'UDR Inc', 'FMC Corporation',
       'Check Point Software Technologies Ltd', 'Yum! Brands Inc', 'Dominion Energy', 'Alliant Energy Corp', 'International Paper',
       'Chubb Limited', 'Block H&R', 'TechnipFMC', 'Expeditors International', 'Stanley Black & Decker',
       'Willis Towers Watson', 'McCormick & Co.', 'Huntington Ingalls Industries', 'Intuitive Surgical Inc',
       'News Corp. Class A', 'Fluor Corp.', 'Akamai Technologies Inc', 'Vertex Pharmaceuticals Inc', 'Estee Lauder Cos.',
       'MercadoLibre Inc', 'Analog Devices Inc', 'Xcel Energy Inc', 'Harley-Davidson', '3M', 'Under Armour', 'Mohawk Industries',
       'IQVIA Holdings Inc.', 'Extra Space Storage', 'American Express', 'Omnicom Group', 'Liberty Global PLC', 'Netflix Inc',
       'Zimmer Biomet Holdings', 'Albemarle Corp', 'Nielsen Holdings', 'Darden Restaurants', 'Anadarko Petroleum Corp',
       'Bristol-Myers Squibb', 'C. H. Robinson Worldwide', 'Paychex Inc', 'Illumina Inc', 'Ecolab Inc.', 'Qurate Retail Group', 'Allegion',
       'Sherwin-Williams', 'Welltower Inc', 'Starbucks Corp', 'Unum Group', 'Eaton Corporation', 'Deere & Co.',
       'Sirius XM Holdings Inc', 'CME Group Inc.', 'Accenture plc', 'Interpublic Group', 'Electronic Arts', 'Alphabet Class A',
       'PVH Corp.', 'JPMorgan Chase', 'The Bank of New York Mellon Corp.', 'Applied Materials Inc', 'Garmin Ltd.', 'PepsiCo Inc.', 'NetApp',
       'Illinois Tool Works', 'HP Inc.', 'Macerich', 'Boeing', 'Visa', 'Huntington Bancshares', 'Equifax Inc.', 'U.S. Bancorp',
       'F5 Networks', 'Rockwell Automation Inc.', 'MGM Resorts International', 'PPL Corp.', 'Advance Auto Parts',
       'Packaging Corporation of America', 'SL Green Realty', 'Torchmark Corp.', 'Celgene Corp', 'Noble Energy Inc',
       'Sealed Air', 'Citigroup Inc.', 'Boston Properties', 'Western Digital Corp', 'Eastman Chemical', 'Church & Dwight',
       'Host Hotels & Resorts', 'Apartment Investment & Management', 'Red Hat Inc.', 'E*Trade', 'Parker-Hannifin', 'Walmart',
       'Grainger (W.W.) Inc.', "Lowe's Cos.", 'SunTrust Banks', 'Principal Financial Group', 'Vodafone Group PLC', 'DaVita Inc.',
       'Whirlpool Corp.', 'Micron Technology Inc', 'Total System Services', 'DISH Network Corp',
       'Range Resources Corp.', 'Lam Research Corp', 'MetLife Inc.', 'Apple Inc', 'Prudential Financial', 'American Tower Corp A',
       'Nasdaq, Inc.', 'Republic Services Inc', 'Alexandria Real Estate Equities Inc', 'PACCAR Inc',
       'The Mosaic Company', 'Intl Flavors & Fragrances', 'Intuit Inc', 'Eversource Energy', 'Target Corp.', "Kohl's Corp.",
       'Air Products & Chemicals Inc', 'Fidelity National Information Services', 'The Hershey Company',
       'T-Mobile US Inc', 'Johnson & Johnson', "Moody's Corp", 'Quest Diagnostics', 'Fortive Corp', 'Gilead Sciences Inc',
       'Raymond James Financial Inc.', 'Duke Realty Corp', 'Texas Instruments Inc', 'The Clorox Company',
       'Occidental Petroleum', 'NASDAQ Composite', 'Salesforce.com', 'PG&E Corp.', 'Best Buy Co. Inc.', 'Alexion Pharmaceuticals Inc',
       "McDonald's", 'Adobe Systems Inc', 'Skyworks Solutions Inc', 'Xylem Inc.', 'Juniper Networks', 'LyondellBasell',
       'Leucadia National Corp.', 'Expedia Group Inc', 'Global Payments Inc.', 'Varian Medical Systems',
       'T. Rowe Price Group', 'Cummins Inc.', 'Cincinnati Financial', 'Flowserve Corporation', 'Carmax Inc', 'Constellation Brands',
       'Boston Scientific', 'Automatic Data Processing Inc', 'Envision Healthcare', 'Nucor Corp.', 'Newmont Mining Corporation',
       'Kansas City Southern', 'A.O. Smith Corp', 'Carnival Corp.', 'FirstEnergy Corp', 'DowDuPont Inc', 'IHS Markit Ltd.', 'S&P 500',
       'L-3 Communications Holdings', 'Affiliated Managers Group Inc', 'Amgen Inc', 'Vulcan Materials', 'L Brands Inc.',
       'Verisk Analytics Inc', 'Maxim Integrated Products Inc', 'Aetna Inc', 'FedEx Corporation', 'Corning Inc.',
       'BB&T Corporation', 'Brighthouse Financial', 'Pentair Ltd.', 'ConocoPhillips', 'Lennar Corp.', 'Biomarin Pharmaceutical Inc',
       'Regency Centers Corporation', 'Morgan Stanley', 'CSRA Inc.', 'Danaher Corp.', 'Avery Dennison Corp', 'KLA-Tencor Corp',
       'Genuine Parts', 'Nike', 'Citizens Financial Group','Lilly (Eli) & Co.', 'Goodyear Tire & Rubber', 'Tractor Supply Co', 'PPG Industries']

// autocomplete(document.getElementById("cityInput"), cities);

// autocomplete(document.getElementById("stockInput"), stocks);



function Addstock() {
    var stock = document.getElementById('stockInput').value;
    if (stock != ""){
        var iDiv = document.createElement('div');
        iDiv.id = stock;
        iDiv.className = 'stockAdded';
        iDiv.innerHTML = "x  " + stock;
        console.log(iDiv);
        document.getElementById('Addstocks').appendChild(iDiv);        
    }
    if (document.getElementsByClassName("stockAdded").length == 5){
        var x = document.getElementById("addbutton");
        x.style.display = "none";
    }
}

$('#Addstocks').on('click','.stockAdded',function()  { 
    this.style.display = "none";
});




