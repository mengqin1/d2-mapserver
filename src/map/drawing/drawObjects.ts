import { NodeCanvasRenderingContext2D } from "canvas";
import { Level, ObjectType } from "../../types/level.type";
import { drawRectangle, drawImage, drawImageOutline, drawCenteredRectangle, drawCircle } from "./drawPrimatives";

export async function drawObjects(ctx: NodeCanvasRenderingContext2D, levelData: Level, scale: number) {
  // this part adds the special objects (doors, waypoints etc)
  levelData.objects.forEach((mapObject) => {
    let x = (mapObject.x * scale) + scale - 1.5;
    let y = (mapObject.y * scale) + scale + 0.4;

    if (mapObject.type === ObjectType.Object) {
      // waypoints
      if (mapObject.name == "Waypoint") {
        let size = 25;
        drawRectangle(ctx, x - size + 7, y - size / 2 - 3, size, size, "#FFFF00");
        //drawImage(ctx, x+11, y+21, "./build/static/waypoint.png", scale * 15, scale * 10);
      }

      // chests
      if (mapObject.name == "chest") {
        let size = 8;
        drawImage(ctx, x+6, y+16, "./build/static/chest.png", size * 2, size * 1.8);
      }
      if (mapObject.id == 580) { // super chest
        let size = 8;
        //drawImage(ctx, x-12, y+25, "./build/static/superchest.png", scale * 12, scale * 20);
        drawImageOutline(ctx, x-28, y+15, "./build/static/superchest.png", size * 3.25, size * 5.75, "gold");
      }
      if (mapObject.id == 581) { // super chest
        let size = 8;
        drawImage(ctx, x+8, y+16, "./build/static/chest.png", size, size * 0.9);
      }
      
      if (mapObject.name == "Shrine") {
        drawImage(ctx, x-15, y+17, "./build/static/shrine.png", 20, 32);
      }

      if (mapObject.name == "Well") {
        drawImage(ctx, x+13, y+21, "./build/static/well.png", 22, 18);
      }

      // portals in act 5
      if (mapObject.name == "Portal") {
        if (mapObject.id == 60) {
          drawImageOutline(ctx, x+95, y+85, "./build/static/rightportal.png", 50, 46, "#FF00FF");
        }
      }

      // yellow doors
      if (mapObject.name == "door" || mapObject.name == "Door") {
        // These are all the maps which have 'doors':
        // 26 Monastery Gate
        // 27 Outer Cloister
        // 28 Barracks
        // 29 Jail Level 1
        // 30 Jail Level 2
        // 31 Jail Level 3
        // 32 Inner Cloister
        // 33 Cathedral
        // 34 Catacombs Level 1
        // 35 Catacombs Level 2
        // 36 Catacombs Level 3
        // 37 Catacombs Level 4
        // 51 Harem Level 2
        // 52 Palace Cellar Level 1
        // 53 Palace Cellar Level 2
        // 54 Palace Cellar Level 3
        // 55 Stony Tomb Level 1
        // 56 Halls of the Dead Level 1
        // 57 Halls of the Dead Level 2
        // 58 Claw Viper Temple Level 1
        // 59 Stony Tomb Level 2
        // 60 Halls of the Dead Level 3
        // 64 Maggot Lair Level 3
        // 72 Tal Rasha's Tomb
        // 73 Duriel's Lair
        
        const doorLength = scale * 5;
        const doorThickness = (scale * 2);

        // cat lvl 4
        if (mapObject.id == 47) {
          drawRectangle(ctx, x - (doorLength /2), y - (doorThickness/2)+scale, doorLength*2, doorThickness, "#FFFF00"); // horizontal
        }
        switch(mapObject.id) {
          case 13:
          case 15:
          case 64:
          case 290: // harem
          case 292: // palace
          //case 294:
            drawCenteredRectangle(ctx, x+(scale*1), y+(scale*0.5), doorThickness, doorLength, "#FFFF00"); // vertical
            break;
          case 14:
          case 16:
          case 291:
          // case 293:
          case 295:
            drawCenteredRectangle(ctx, x+(scale*0.9), y+(scale*0.5), doorLength, doorThickness, "#FFFF00"); // horizontal
            break;
        }

        // stony tomb doors
        if (mapObject.id == 91) {
          drawRectangle(ctx, x+(scale/2), y-(scale/2), doorThickness, doorLength, "#FFFF00"); // vertical
        }
        if (mapObject.id == 92) {
          drawRectangle(ctx, x+(scale/2), y-(scale/2), doorLength, doorThickness, "#FFFF00"); // horizontal
        }

        // maggot lair doors
        if (mapObject.id == 230) {
          drawRectangle(ctx, x+(scale/3), y, doorThickness, doorLength, "#FFFF00"); // vertical
        }
        if (mapObject.id == 229) {
          drawRectangle(ctx, x+(scale), y-(scale/2), doorLength, doorThickness, "#FFFF00"); // horizontal
        }
      }
    }
  });
}
