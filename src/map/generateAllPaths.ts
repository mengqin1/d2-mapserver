import { Level } from "../types/level.type";
import { generatePathFinding } from "./pathFinding";

export async function generatePaths(levelData: Level) {
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
