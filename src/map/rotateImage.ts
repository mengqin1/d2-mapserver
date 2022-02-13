import { createCanvas } from "canvas";
import { LevelImage } from "../types/LevelImage";

export async function rotateImage(levelImage: LevelImage): Promise<LevelImage> {
    const mapWidth = levelImage.canvas.width;
    const mapHeight = levelImage.canvas.height;
    const pi = Math.PI
    const TAngle = 45*(pi/180)
    const RWidth = Math.abs(mapWidth*Math.cos(TAngle))+Math.abs(mapHeight*Math.sin(TAngle))
    const RHeight = Math.abs(mapWidth*Math.sin(TAngle))+Math.abs(mapHeight*Math.cos(TAngle))
    const canvas2 = createCanvas(RWidth, RHeight);
    const ctx2 = canvas2.getContext("2d");
    ctx2.translate(RWidth / 2, RHeight / 2);
    ctx2.rotate((45 * Math.PI) / 180);
    ctx2.translate(-(RWidth / 2), -(RHeight / 2));
    ctx2.drawImage(levelImage.canvas, (RWidth-mapWidth)/2, (RHeight-mapHeight)/2);
    levelImage.canvas = canvas2;
    return levelImage;
}