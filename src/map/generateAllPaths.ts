import { Level, ObjectType, Object } from "../types/level.type";
import { getObject } from "./drawing/drawPaths";
import { generatePathFinding } from "./pathFinding";

export async function generateAllPaths(levelData: Level) {
  const pathfindingPoints = levelData.objects.filter(
    (object) => object.name == "Waypoint" || object.type == "exit"
  );
  let paths = [];
  if (pathfindingPoints.length > 1) {
    try {
      pathfindingPoints.forEach((startPoint) => {
        pathfindingPoints.forEach((endPoint) => {
          if (startPoint.id !== endPoint.id) {
            const pathfinding = generatePathFinding(
              levelData,
              startPoint,
              endPoint
            );
            let points = [];
            pathfinding.forEach((point) => {
              points.push([point.x, point.y]);
            });
            paths.push({
              start: startPoint.id,
              end: endPoint.id,
              points: points,
            });
          }
        });
      });
    } catch (e) {
      console.error("Error generating paths " + e.message);
    }
  }
  return paths;
}

export async function generatePath(levelData: Level, pathStart: string, pathEnd: string) {
  try {
    console.log("Generating path " + pathStart + " to " + pathEnd);
    const startPoint = getObject(levelData, pathStart);
    const endPoint = getObject(levelData, pathEnd);

    // nasty hack to avoid the exit starting inside the wall
    startPoint.x = startPoint.x + 3;
    const newEndpoint: Object = { id: 0, type: ObjectType.Exit, x: endPoint.x + 5, y: endPoint.y + 1 }
    const pathfinding = generatePathFinding(levelData, startPoint, newEndpoint);
    let paths = [];
    let points = [];
    pathfinding.forEach((point) => {
      points.push([point.x, point.y]);
    });
    paths.push({
      start: startPoint.id,
      end: endPoint.id,
      points: points,
    });
    return paths;
  }catch (e) {
    console.error("Error generating path " + pathStart + " " + pathEnd + " " + e.message);
  }
}