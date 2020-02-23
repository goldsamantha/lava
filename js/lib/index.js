console.log('ahh');
var width = 600;
var height = 600;
var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);


var randRange = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

var lineGenerator = d3.line().curve(d3.curveCardinal);
var points = [[40, 60], [300, 200], [400, 60], [500, 80], [400, 190], [140, 200]];
var points = [
  [0, 80],
  [100, 100],
  [200, 30],
  [300, 50],
  [400, 40],
  [500, 80]
];

var numPoints = 10;
var points = Array(numPoints)
  .fill()
  .map(function(item, index) {
    return [
      index*100,
      randRange(30, height)
    ];
  }); 
var pathData = lineGenerator(points);

var radialLineGenerator = d3.radialLine().curve(d3.curveBasisClosed);

var points = [
  [0, 80],
  [Math.PI * 0.25, 80],
  [Math.PI * 0.5, 30],
  [Math.PI * 0.75, 80],
  [Math.PI, 80],
  [Math.PI * 1.25, 80],
  [Math.PI * 1.5, 80],
  [Math.PI * 1.75, 80],
  [Math.PI * 2, 80]
];
var numPoints = 8;

var points = Array(numPoints)
  .fill()
  .map(function(item, index) {
    var minRad = 40;
    var maxRad = 100
    return [
      Math.PI * 2 / numPoints * index,
      Math.floor(Math.random() * (maxRad - minRad) + minRad)
    ];
});

console.log(points)

var radialPathData = radialLineGenerator(points);

svg.append("path")
  .attr("class", "line")
  .attr("d", pathData)
  .attr("fill", "none")
  .attr("stroke", "blue");


svg.append("path")
  .attr("class", "line")
  .attr("d", radialPathData)
  .attr("transform", "translate(190, 100)")
  .attr("fill", "orange")
  .attr("stroke", "red");
