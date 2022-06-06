import { Level } from "../../types/level.type";
import { RequestConfig } from "../../types/RequestConfig";
import { generatePathFinding } from "../pathFinding";

export async function drawPaths(
  ctx: CanvasRenderingContext2D,
  levelData: Level,
  scale: number,
  reqConfig: RequestConfig
) {
  if (reqConfig.pathFinding) {
    if (reqConfig.paths) {
        console.log("Generating paths " + reqConfig.paths);
      try {
        const paths = reqConfig.paths.split(",");
        for (var i = 0; i < paths.length; i += 2) {
          console.log("Generating path " + paths[i] + " " + paths[i+1]);
          const startPoint = getObject(levelData, paths[i]);
          const endPoint = getObject(levelData, paths[i + 1]);
          startPoint.x = startPoint.x + 3;
          endPoint.x = endPoint.x + 3;
          const pathfinding = generatePathFinding(levelData, startPoint, endPoint);
          pathfinding.forEach((point) => {
            ctx.beginPath();
            ctx.fillStyle = "#F00";
            ctx.fillRect(
              point.y * scale,
              point.x * scale,
              scale * reqConfig.wallthickness,
              scale * reqConfig.wallthickness
            );
            ctx.stroke();
          });
        }
      } catch (e) {
        console.error("Paths not valid " + reqConfig.paths);
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
                    ctx.fillStyle = "#F00";
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

function getObject(levelData: Level, id: string) {
  if (id == "wp") {
    return levelData.objects.find((object) => object.name == "Waypoint");
  } else {
    return levelData.objects.find((object) => object.id == parseInt(id));
  }
}
