import { Level, Object } from "../types/level.type";

import { astar, Graph } from "./astar.js";

export function generatePathFinding(mapData: Level, starting: Object, ending: Object) {
    const mapWidth = mapData.size.width;
    const imgHeight = mapData.size.height;
  
    var rows = []
    mapData.map.forEach((coord, index) => {
      let fill = false;
      let x = 1;
      var thisRow = []
      for (var j = 0; j< mapWidth; j++) {
          thisRow[j] = 0;
      }
      const lastCoord = coord.length -1;
      coord.forEach((plotx, idx) => {
        // only the first (every odd) number is used
        // the second value is void space and not necessary
        let width = plotx;
        fill = !fill;
        if (!fill) {
          for (var i = x; i < (x+width); i++) {
            thisRow[i] = 1;
          }
        }
        x = x + width;
        if ((idx == lastCoord) && fill) {
          const extrax = mapWidth - x;
          for (var i = x; i < (x+extrax); i++) {
            thisRow[i] = 1;
          }
        }
      });
      rows[index] = thisRow;
    //   rows.push(thisRow);
    });
    var graph = new Graph(rows);
	var start = graph.grid[starting.y][starting.x];
	var end = graph.grid[ending.y][ending.x];
	var pathFindingArr = astar.search(graph, start, end, {});

    return pathFindingArr
}
