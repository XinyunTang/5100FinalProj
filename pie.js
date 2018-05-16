var nb_sliders = null; // nb of range sliders
var moving_id = null; // id of the moved slider
var oldValue = []; // previous values of the sliders
colors = {"rect1": "#E2C843", "rect2": "#85BB4B", "rect3": "#F5BAC7"}
console.log(colors.rect1)
// pie chart radius
var radius = 200;

// setup the margins so we don't clip the outter labels
var margin = {
  top: 200,
  right: 100,
  bottom: 100,
  left: 100
};

width = 800;
height = 300;

var svg = d3.select("#slider");
var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + 0 + ")");

var x = d3.scaleLinear()
    .domain([0, 100])
    .range([width/4, width*3/4])
    .clamp(true);

console.log(slider)
var rect1 = slider.append("rect")
    .attr("class", "track")
    // .attr("x", 20)
    // .attr("y", 150)
    .attr("height", 240)
    .attr("width", 20)
    .attr("fill", "pink")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-inset")
  .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
    .attr("class", "track-overlay")
    .call( d3.drag()
        .on("start.interrupt", function() { 
          console.log("interrupt is called");
          hue(d3.event.y) 
          slider.interrupt(); 
        })
        .on("start drag", function() { 
          console.log("drag is called");
          hue(d3.event.y); 
        })
        );

var handle1 = slider.append("rect", ".track-overlay")
    .attr("width", 25)
    .attr("height",10)
    .attr("id", "handle1")
    .attr("fill", "black")
    .attr("x", -2)
    .attr("y", 80)
    .attr("class", "handle")
    // .attr("cy")
    .attr("r", 9);

console.log(handle1)

var handle2 = slider.append("rect", ".track-overlay")
  .attr("width", 25)
  .attr("height",10)
  .attr("id", "handle2")
  .attr("fill", "black")
  .attr("x", -2)
  .attr("y", 160)
  .attr("class", "handle")
  .attr("r", 9);

slider.transition() // Gratuitous intro!
    .duration(750)
    .call(function() {
      console.log("transition callback function")
      var i = d3.interpolate(0, 70);
      return function(t) { hue(i(t)); };
    })

function hue(h) {
  var handle1_pos = parseInt(d3.select("#handle1").attr("y"));
  var handle2_pos = parseInt(d3.select("#handle2").attr("y"));
  var handle1_diff =  Math.abs(h - parseInt(d3.select("#handle1").attr("y")));
  var handle2_diff =  Math.abs(h - parseInt(d3.select("#handle2").attr("y")));

  var ratio1 = handle1_pos/250;
  var ratio2 = handle2_pos/250 - ratio1;
  var ratio3 = 1 - ratio1 - ratio2;

  console.log(ratio1, ratio2, ratio3)
  if (handle1_diff < 20) {
    move_handle1(h, handle1_pos, handle2_pos);
  }
  else if (handle2_diff < 20) {
    move_handle2(h, handle1_pos, handle2_pos);
  }
  // svg.style("background-color", d3.hsl(h, 0.8, 0.8));
}


function move_handle1(h, pos1, pos2) {
  handle1.attr("y", h)

  d3.select("#rect1").remove();
  slider.append("rect")
  .attr("id", "rect1")
  .attr("width", 22)
  .attr("height", h)
  .attr("fill", colors.rect1)
  .call( d3.drag()
  .on("start.interrupt", function() { 
    console.log("interrupt is called");
    hue(d3.event.y) 
    slider.interrupt(); 
  })
  .on("start drag", function() { 
    console.log("drag is called");
    hue(d3.event.y); 
  })
  );

  d3.select("#rect2").remove();
  slider.append("rect")
  .attr("id", "rect2")
  .attr("width", 22)
  .attr("height", pos2 - pos1 - 10)
  .attr("y", parseInt(pos1) + 10)
  .attr("fill", colors.rect2)
  .call( d3.drag()
    .on("start.interrupt", function() { 
      console.log("interrupt is called");
      hue(d3.event.y) 
      slider.interrupt(); 
    })
    .on("start drag", function() { 
      console.log("drag is called");
      hue(d3.event.y); 
    })
    );
}

function move_handle2(h, pos1, pos2) {
  handle2.attr("y", h)
  d3.select("#rect3").remove();
  slider.append("rect")
  .attr("id", "rect3")
  .attr("width", 22)
  .attr("height", 250-h)
  .attr("y", h + 10)
  .attr("fill", colors.rect3)
  .call( d3.drag()
      .on("start.interrupt", function() { 
        console.log("interrupt is called");
        hue(d3.event.y) 
        slider.interrupt(); 
      })
      .on("start drag", function() { 
        console.log("drag is called");
        hue(d3.event.y); 
      })
      );

  d3.select("#rect2").remove();
  slider.append("rect")
  .attr("id", "rect2")
  .attr("width", 22)
  .attr("height", h - pos1 - 10)
  .attr("y", parseInt(pos1) + 10)
  .attr("fill", colors.rect2)
  .call( d3.drag()
    .on("start.interrupt", function() { 
      console.log("interrupt is called");
      hue(d3.event.y) 
      slider.interrupt(); 
    })
    .on("start drag", function() { 
      console.log("drag is called");
      hue(d3.event.y); 
    })
    );
  }
    