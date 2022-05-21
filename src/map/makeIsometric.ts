import { createCanvas } from "canvas";
import { Level } from "../types/level.type";
import trimCanvas from "trim-canvas";
import { LevelImage } from "../types/LevelImage";

export async function makeIsometric(levelImage: LevelImage): Promise<LevelImage> {
    const levelData: Level = levelImage.mapData;
    // make the image isometric
    const mapWidth = levelImage.canvas.width;
    const mapHeight = levelImage.canvas.height;
    const hypot = Math.sqrt(mapWidth * mapWidth + mapHeight * mapHeight);
    const canvas2 = createCanvas(hypot, hypot/2);
    const ctx2 = canvas2.getContext("2d");
    ctx2.translate(hypot / 2, hypot/4);
    ctx2.scale(1, 0.5);
    ctx2.rotate((45 * Math.PI) / 180);
    ctx2.translate(-(mapWidth / 2), -(mapHeight / 2));
    
    ctx2.drawImage(levelImage.canvas, 0, 0);
    
    // ctx2.beginPath();
    // ctx2.strokeStyle = 'blue';
    // ctx2.strokeRect(0, 0, mapWidth, mapHeight);
    // ctx2.stroke();

    // trim empty space
    // trimCanvas(ctx2.canvas);
    levelImage.canvas = canvas2;
    return levelImage;
}