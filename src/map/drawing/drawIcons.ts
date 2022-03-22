import { Level, ObjectType } from "../../types/level.type";
import * as fs from "fs";
import { drawImage } from "./drawPrimatives";
import { CanvasRenderingContext2D } from "canvas";
import path = require("path");

export async function drawIcons(ctx: CanvasRenderingContext2D, levelData: Level, scale: number) {
  levelData.objects.forEach(async (mapObject) => {
    let x = mapObject.x * scale;
    let y = mapObject.y * scale;

    // Exits
    if (mapObject.type === ObjectType.Exit) {
      if (levelData.id === 46) {
        let fileName = "";
        switch (mapObject.id) {
          case 69:
            fileName = path.join(__dirname, "../../../build/static/tal_4_circle.png");
            break;
          case 70:
            fileName = path.join(__dirname, "../../../build/static/tal_5_chevron.png");
            break;
          case 71:
            fileName = path.join(__dirname, "../../../build/static/tal_6_triangle.png");
            break;
          case 72:
            fileName = path.join(__dirname, "../../../build/static/tal_7_crescentmoon.png");
            break;
          case 66:
            fileName = path.join(__dirname, "../../../build/static/tal_1_star.png");
            break;
          case 67:
            fileName = path.join(__dirname, "../../../build/static/tal_2_square.png");
            break;
          case 68:
            fileName = path.join(__dirname, "../../../build/static/tal_3_crescent.png");
            break;
        }
        if (fs.existsSync(fileName)) {
          drawImage(ctx, x-70, y-20, fileName, 76, 69);
        }
      }
    }
  });
}

