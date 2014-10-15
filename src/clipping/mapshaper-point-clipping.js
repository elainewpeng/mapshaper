/* @requires
mapshaper-path-index
mapshaper-shape-utils
*/

//
MapShaper.clipPoints = function(points, clipShapes, arcs, type, opts) {
  var index = new PathIndex(clipShapes, arcs);

  var points2 = points.reduce(function(memo, feat) {
    var n = feat ? feat.length : 0,
        feat2 = [],
        enclosed;

    for (var i=0; i<n; i++) {
      enclosed = index.findEnclosingShape(feat[i]) > -1;
      if (type == 'clip' && enclosed || type == 'erase' && !enclosed) {
        feat2.push(feat[i].concat());
      }
    }

    memo.push(feat2.length > 0 ? feat2 : null);
    return memo;
  }, []);

  return points2;
};
