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
  var numPoints = 8;
  return Array(numPoints)
    .fill()
    .map(function(item, index) {
      var minRad = 40;
      var maxRad = 100
      return [
        Math.PI * 2 / numPoints * index,
        Math.floor(Math.random() * (maxRad - minRad) + minRad)
      ];
  });
}

var points = getPointsForBlob();

console.log(points)

var radialPathData = radialLineGenerator(points);

svg.append("path")
  .attr("class", "line")
  .attr("d", pathData)
  .attr("fill", "none")
  .attr("stroke", "blue");


svg.append("path")
  .attr("class", "blob")
  .attr("d", radialPathData)
  .attr("transform", "translate(190, 100)")
  .attr("fill", "orange")
  .attr("stroke", "red");

d3.selectAll("path.blob")
  .transition()
  .duration(3000)
  .attrTween("fill", function() {
    return d3.interpolateRgb("#FF5733", "#FFD133");
  })
  .transition()
  .duration(3000)
  .attrTween("fill", function() {
    return d3.interpolateRgb("#FFD133", "#FF5733");
  });

