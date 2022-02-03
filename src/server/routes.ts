import { validationResult } from "express-validator";
import path = require("path");
import { generateMapImage } from "../map/generateMapImage";
import { ImageResponse } from "../types/ImageResponse";
import * as fs from "fs";
import { getAllMapData, getMapData } from "../data/getMapData";
import { Level, LevelList } from "../types/level.type";
import { PrefetchRequest } from "../types/PrefetchRequest";
import { LevelImage } from "../types/LevelImage";
import { RequestConfig } from "../types/RequestConfig";

export async function mapImage(req, res) {
  try {
    validationResult(req).throw();
    const start = performance.now();
    const seed: string = req.params.seed;
    const difficulty: string = req.params.difficulty;
    const mapid: number = parseInt(req.params.mapid);
    console.log(`New request for image ${seed} ${difficulty} ${mapid}...`);
    let showTextLabels = true;
    if (req.query.showTextLabels == "false") {
      showTextLabels = false;
    }
    let showLevelTitles = true;
    if (req.query.showLevelTitles == "false") {
      showLevelTitles = false;
    }
    const reqConfig = new RequestConfig(
      seed,
      difficulty,
      mapid,
      req.query.verbose == "true",
      req.query.trim == "true",
      req.query.isometric == "true",
      req.query.edge == "true",
      parseFloat(req.query.wallthickness),
      parseFloat(req.query.serverScale),
      150,
      process.env.ENABLE_WATERMARK ? true : false,
      "#AAA",
      showTextLabels,
      showLevelTitles,
    );
    
    const cacheFileName = `./cache/image_${reqConfig.getUniqueId()}.json`;
    let cached = false;
    let responseData: ImageResponse;
    if (fs.existsSync(cacheFileName)) {
      try {
        const cachedText = fs.readFileSync(path.resolve(cacheFileName), {
          encoding: "utf8",
        });
        responseData = JSON.parse(cachedText);
        console.log("Reading cached image " + cacheFileName);
        cached = true;
      } catch (err) {
        console.error("Error reading cached image " + cacheFileName);
      }
    }
    if (!cached) {
      const seedData = await getAllMapData(reqConfig.seed, reqConfig.difficulty);
      responseData = await createImage(reqConfig, seedData, cacheFileName)
    }

    const img = Buffer.from(responseData.base64Data, "base64");
    res.writeHead(200, {
      "Content-Type": "image/png",
      "Content-Length": img?.length,
      leftTrimmed: responseData?.leftTrimmed,
      topTrimmed: responseData?.topTrimmed,
      offsetx: responseData?.offsetx,
      offsety: responseData?.offsety,
      mapwidth: responseData?.mapwidth,
      mapheight: responseData?.mapheight,
      exits: responseData?.exits,
      waypoint: responseData?.waypoint,
      bosses: responseData?.bosses,
      quests: responseData?.quests,
      serverScale: responseData?.serverScale,
      info: "AUTOKEYCLICK IS A SCAM",
      info2: "D2RESURREKTED IS A SCAM",
      info3: "YOU SHOULD NOT HAVE PAID FOR THIS",
      website: "https://github.com/joffreybesos/d2r-mapview",
    });
    const end = performance.now();
    console.log(
      `Generated image for map ${responseData.mapId} '${
        responseData.mapName
      }', took ${Math.trunc(end - start)}ms total`
    );
    res.end(img);
  } catch (err) {
    res.status(500).send("Server error generating map image, look at map server logs for more info\n" + err);
  }
}

async function createImage(reqConfig: RequestConfig, seedData: LevelList, cacheFileName: string): Promise<ImageResponse> {
  
  const levelImage: LevelImage = await generateMapImage(reqConfig, seedData);
  const base64Data = await levelImage.canvas
    .toBuffer("image/png")
    .toString("base64")
    .replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
  const responseData = new ImageResponse(levelImage, base64Data); // serialize the response data for caching
  fs.writeFile(cacheFileName, JSON.stringify(responseData), function (err) {
    if (err) {
      console.error("Error writing cache file " + cacheFileName);
      return console.error(err);
    }
  });
  return responseData;
}


export async function mapData(req, res) {
    try {
        validationResult(req).throw();
        if (!process.env.DISABLE_JSON) {  // disable JSON on public server
            const start = performance.now();
            const seed: string = req.params.seed;
            const difficulty: string = req.params.difficulty;
            const mapid: number = parseInt(req.params.mapid);
            console.log(`New request for data ${seed} ${difficulty} ${mapid}...`);
            const mapData: Level = await getMapData(seed, difficulty, mapid);
            const end = performance.now();
            console.log(`Generated JSON for map ${mapData.id} '${mapData?.name}', took ${Math.trunc(end - start)}ms total`);
            res.json(mapData);
        } else {
            res.send("Please run your own server for raw JSON data");
        }
    } catch (err) {
        res.status(500).send("Server error generating map, look at map server logs for more info\n" + err);
    }
}

export async function prefetch(req, res) {
    try {
        const pf: PrefetchRequest = req.body;
        if (!process.env.DISABLE_PREFETCH) {
          const seed: string = pf.seed;
          const difficulty: string = pf.difficulty;
          if (pf.seed == undefined || pf.difficulty == undefined) {
            throw new Error("Invalid prefetch request");
          }
          res.status(200).send(`Prefetched ${pf.mapIds.length} maps`);
          getAllMapData(seed, difficulty).then(seedData => {
            try {
              pf.mapIds.forEach(mapId => {
                const reqConfig = new RequestConfig(
                  seed,
                  difficulty,
                  mapId,
                  pf.verbose == "true",
                  pf.trim == "true",
                  pf.isometric == "true",
                  pf.edge == "true",
                  parseFloat(pf.wallthickness),
                  parseFloat(pf.serverScale),
                  150,
                  process.env.ENABLE_WATERMARK ? true : false
                );
                const cacheFileName = `./cache/image_${reqConfig.getUniqueId()}.json`;
                if (!fs.existsSync(cacheFileName)) {
                  createImage(reqConfig, seedData, cacheFileName);
                }
              });
              pf.mapIds.forEach(mapId => {
                const reqConfig = new RequestConfig(
                  seed,
                  difficulty,
                  mapId,
                  pf.verbose == "true",
                  pf.trim == "true",
                  pf.isometric == "true",
                  pf.edge == "true",
                  parseFloat(pf.wallthickness),
                  parseFloat(pf.centerServerScale),
                  150,
                  process.env.ENABLE_WATERMARK ? true : false
                );
                const cacheFileName = `./cache/image_${reqConfig.getUniqueId()}.json`;
                if (!fs.existsSync(cacheFileName)) {
                  createImage(reqConfig, seedData, cacheFileName);
                }
              });
            } catch (e) {
              console.log("Error prefetching");
            }
          });
        } else {
          res.send("Prefetch not available on public free server.\nPlease run your own server\nRefer to this guide https://github.com/joffreybesos/d2r-mapview/blob/master/SERVER.md");
        }
    } catch (e) {
        res.status(500).send("Error prefetching\n" + e);
    }
}