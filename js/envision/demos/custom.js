$(function () {

  HSD.envisionExample('custom-demo', example);

  function example (container) {
    var
      E = envision,
      vis = new E.Visualization(),
      lines,
      linesOptions,
      points,
      pointsOptions;

    linesOptions = {
      height : 40,
      data : [[0,5,10],[0,5,10]],
      flotr : {}
    };

    pointsOptions = {
      height : 40,
      data : [[0,5,10],[0,5,10]],
      flotr : {}
    };

    lines = new E.Component(linesOptions);
    points = new E.Component(pointsOptions);

    vis
      .add(lines)
      .add(points)
      .render(container);
  }

});
