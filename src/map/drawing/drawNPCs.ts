import { CanvasRenderingContext2D } from "canvas";
import { Level, ObjectType } from "../../types/level.type";
import { RequestConfig } from "../../types/RequestConfig";
import { drawCircle, drawText } from "./drawPrimatives";

export async function drawNPCs(ctx: CanvasRenderingContext2D, levelData: Level, scale: number, reqConfig: RequestConfig) {
  // add NPCs
  levelData.objects.forEach((mapObject) => {
    let x = mapObject.x * scale;
    let y = mapObject.y * scale;

    if (levelData.name == "Arcane Sanctuary") {
      if (mapObject.id == 250) {
        if (reqConfig.showTextLabels) {
          drawText(ctx, x - 10, y - 10, 14, "Summoner", "#FFFFFF");
        }
        drawCircle(ctx, x - 5, y - 15, scale * 5, "#FF0000"); //extra large red dot
      }
    }

    if (mapObject.type === ObjectType.NPC) {
      switch (levelData.name) {
        case "Plains of Despair": // izual
          if (reqConfig.showTextLabels) {
            drawText(ctx, x - 5, y + 5, 14, "Izual", "#FFFFFF");
          }
          drawCircle(ctx, x, y, 2 * 10, "#FF0000"); //extra large red dot
          break;
        case "Maggot Lair Level 3": // maggot boss
          if (reqConfig.showTextLabels) {
            drawText(ctx, x - 5, y + 5, 14, "Maggot Boss", "#FFFFFF");
          }
          drawCircle(ctx, x, y, 2 * 10, "#FF0000"); //extra large red dot
          break;
        case "Sewers Level 3": // radament
          if (mapObject.id == 744) {
            if (reqConfig.showTextLabels) {
              drawText(ctx, x - 5, y + 5, 14, "Radament", "#FFFFFF");
            }
            drawCircle(ctx, x, y, 2 * 10, "#FF0000"); //extra large red dot
          }
          break;
        case "Halls of Vaught": // nihlithak
          // there is only one NPC in halls of vaught
          // nihlithak appears in the oppositie side to that NPC
          drawCircle(ctx, x, y, 2 * 2, "#FF0000");
          x = x / scale;
          y = y / scale;
          if (x == 30 && y == 208) {
            x = 392;
            y = 201;
          }
          if (x == 206 && y == 32) {
            x = 207;
            y = 386;
          }
          if (x == 207 && y == 393) {
            x = 207;
            y = 16;
          }
          if (x == 388 && y == 216) {
            x = 22;
            y = 201;
          }
          x = x * scale;
          y = y * scale;
          if (reqConfig.showTextLabels) {
            drawText(ctx, x, y, 14, "Nihlathak", "#FFFFFF");
          }
          drawCircle(ctx, x, y, 2 * 10, "#FF0000");
          break;
      }
    }
  });
}
