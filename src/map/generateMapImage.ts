import { generatePNG } from "./generatePNG";
import { makeIsometric } from "./makeIsometric";
import { getOutdoorConnectedMapIds, stitchOutdoorMaps } from "./outdoor";
import trim from 'trim-canvas';
import { RequestConfig } from "../types/RequestConfig";
import { LevelImage } from "../types/LevelImage";
import { LevelList } from "../types/level.type";
import { rotateImage } from "./rotateImage";

export async function generateMapImage(reqConfig: RequestConfig, seedData: LevelList): Promise<any> {
    
    let levelImage = new LevelImage();
    levelImage.padding = reqConfig.padding;
    
    levelImage.seedData = seedData;
    levelImage.mapData = levelImage.seedData.levels.find((map) => map.id === (reqConfig.mapid));
    const connectedMaps = await getOutdoorConnectedMapIds(reqConfig.mapid);
    if (connectedMaps.length > 0) {
      // if outdoors then force downloading of all seed data
      levelImage = await stitchOutdoorMaps(levelImage, reqConfig, connectedMaps);
    } else {
      levelImage = await generatePNG(levelImage, reqConfig);  
    }

    if (reqConfig.isometric) {
      levelImage = await makeIsometric(levelImage)
    }

    if (reqConfig.rotate) {
      levelImage.rotate = "true";
      levelImage = await rotateImage(levelImage)
    }
    
    if (reqConfig.trim) {
      let leftBeforeTrim = levelImage.canvas.width;
      let topBeforeTrim = levelImage.canvas.height;
      levelImage.canvas = await trim(levelImage.canvas, levelImage.padding)
      levelImage.leftTrimmed = leftBeforeTrim - levelImage.canvas.width;
      levelImage.topTrimmed = topBeforeTrim - levelImage.canvas.height;
    }
    return levelImage;
}