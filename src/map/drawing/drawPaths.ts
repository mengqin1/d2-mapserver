import { Level, Object, ObjectType } from "../../types/level.type";
import { RequestConfig } from "../../types/RequestConfig";
import { generatePathFinding } from "../pathFinding";

export async function drawPaths(
  ctx: CanvasRenderingContext2D,
  levelData: Level,
  scale: number,
  reqConfig: RequestConfig
) {
  if (reqConfig.pathFinding) {
    if (reqConfig.pathStart && reqConfig.pathEnd) {
      try {
          console.log("Generating path " + reqConfig.pathStart + " to " + reqConfig.pathEnd);
          const startPoint = getObject(levelData, reqConfig.pathStart);
          const endPoint = getObject(levelData, reqConfig.pathEnd);

          // nasty hack to avoid the exit starting inside the wall
          //startPoint.x = startPoint.x;
          const newEndpoint: Object = { id: 0, type: ObjectType.Exit, x: endPoint.x, y: endPoint.y}
          const pathfinding = generatePathFinding(levelData, startPoint, newEndpoint);
          pathfinding.forEach((point) => {
            ctx.beginPath();
            ctx.fillStyle = reqConfig.pathColour;
            ctx.fillRect(
              point.y * scale,
              point.x * scale,
              scale * reqConfig.wallthickness,
              scale * reqConfig.wallthickness
            );
            ctx.stroke();
          });
        
      } catch (e) {
        console.error("Paths not valid " + reqConfig.pathStart + " " + reqConfig.pathEnd);
      }
    } else {
      console.log("Generating all paths");
      const pathfindingPoints = levelData.objects.filter(
        (object) => object.name == "Waypoint" || object.type == "exit"
      );
      if (pathfindingPoints.length > 1) {
          try {
            pathfindingPoints.forEach((startPoint) => {
                pathfindingPoints.forEach((endPoint) => {
                    const pathfinding = generatePathFinding(levelData, startPoint, endPoint);
                    pathfinding.forEach((point) => {
                    ctx.beginPath();
                    ctx.fillStyle = reqConfig.pathColour;
                    ctx.fillRect(
                        point.y * scale,
                        point.x * scale,
                        scale * reqConfig.wallthickness,
                        scale * reqConfig.wallthickness
                    );
                    ctx.stroke();
                    });
                });
            });
        } catch (e) {
            console.error("Error generating paths " + e.message);
        }
      }
    }
  }
}

export function getObject(levelData: Level, id: string) {
  if (id == "wp") {  // is waypoint
    return levelData.objects.find((object) => object.name == "Waypoint");
  } else if (id.includes(",")) {
    const coords = id.split(",");
    const newObj: Object = { id: 0, type: ObjectType.Exit, x: parseInt(coords[0]) - levelData.offset.x, y: parseInt(coords[1]) - levelData.offset.y }
    return newObj;
  } else {  // if specifying the object id e.g. exit number
    let obj = levelData.objects.find((object) => object.id == parseInt(id));
    obj.x = obj.x + 1
    obj.y = obj.y + 1
    return obj
  }
}
