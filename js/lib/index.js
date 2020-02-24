console.log('ahh');
var width = 600;
var height = 600;
var svg = d3.select("body svg")
  .attr("width", width)
  .attr("height", height);


var DURATION = 4000;

var randRange = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

var lineGenerator = d3.line().curve(d3.curveCardinal);

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
var getPointsForBlob = function() {
  var numPoints = 6;
  return Array(numPoints)
    .fill()
    .map(function(item, index) {
      var minRad = 100;
      var maxRad = 300
      return [
        (Math.PI * 2 + Math.random()) / numPoints * index, // arc
        Math.floor(Math.random() * (maxRad - minRad) + minRad) // radius
      ];
  });
}

var points = getPointsForBlob();

console.log(points)

var radialPathData = radialLineGenerator(points);

svg.append("path")
  .attr("class", "blob")
  .attr("d", radialPathData)
  .attr("transform", `translate(${width/2}, ${height/2})`);

var numPaths = 8;
var pathsArray = Array(numPoints)
    .fill()
    .map(function(item, index) {
      var pts = getPointsForBlob();
      return radialLineGenerator(pts);
});

// TODO: clean up these transitions so they're in a transition
// factory of some sort
d3.selectAll("path.blob")
  .transition()
  .duration(DURATION)
  .ease(d3.easeCubicInOut)
  .attrTween("d", function(d) {
    var currPath = d3.selectAll("path.blob").attr("d");
    return d3.interpolate(currPath, pathsArray[0]);
  })
  .transition()
  .duration(DURATION)
  .attrTween("d", function(d) {
    var currPath = d3.selectAll("path.blob").attr("d");
    return d3.interpolate(currPath, pathsArray[1]);
  })
  .transition()
  .duration(DURATION)
  .attrTween("d", function(d) {
    var currPath = d3.selectAll("path.blob").attr("d");
    return d3.interpolate(currPath, pathsArray[2]);
  })
  .transition()
  .duration(DURATION)
  .attrTween("d", function(d) {
    var currPath = d3.selectAll("path.blob").attr("d");
    return d3.interpolate(currPath, pathsArray[3]);
  })
  .transition()
  .duration(DURATION)
  .attrTween("d", function(d) {
    var currPath = d3.selectAll("path.blob").attr("d");
    return d3.interpolate(currPath, pathsArray[4]);
});