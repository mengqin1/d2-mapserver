import { Level, LevelList } from "../types/level.type";
import * as fs from "fs";
import * as path from "path";
import { getFromWine } from "./getFromWine";
import { performance } from "perf_hooks";
import { getFromWindowsExe } from "./getFromWindowsExe";

export async function getMapData(
  seed: string,
  difficulty: string,
  mapid: number
): Promise<Level> {
  const seedData: LevelList = await getAllMapData(seed, difficulty);
  return seedData.levels.find((map) => map.id === mapid);
}

export async function getAllMapData(
  seed: string,
  difficulty: string
): Promise<LevelList> {
  const start = performance.now();
  let cachedFile = `./cache/${seed}_${difficulty}.json`;
  // fetch the data from the web and save to ./build/data folder
  let seedData: LevelList;
  if (fs.existsSync(cachedFile)) {
    // if it was previously saved, use the same file
    seedData = await getAllMapsFromCache(cachedFile);
    const end = performance.now();
    console.log(
      `Read cached file ${path.resolve(cachedFile)}, took ${Math.trunc(
        end - start
      )}ms`
    );
  } else {
    seedData = await generateMapsOnce(seed, difficulty, cachedFile);
    const end = performance.now();
    console.log(
      `Generated full map data for ${seed} ${difficulty}, took ${Math.trunc(
        end - start
      )}ms`
    );
  }
  return seedData;
}

function saveFile(fileName: string, data: string) {
  if (!fs.existsSync(path.dirname(fileName)))
    fs.mkdirSync(path.dirname(fileName), { recursive: true });
  fs.writeFileSync(fileName, data);
  console.log(`Saved JSON ${fileName}`);
}


export async function generateMapsOnce(
  seed: string,
  difficulty: string,
  cachedFile: string
): Promise<LevelList> {
  let skipGeneration: boolean = await isInQueue(cachedFile);
  if (!skipGeneration) {
    // dont execute if there's an existing request
    return generateMapData(seed, difficulty, cachedFile);
  } else {
    let found = await waitForFileExists(cachedFile);
    if (!found) { // try to create anyway
      return generateMapData(seed, difficulty, cachedFile);
    } else {
      return getAllMapsFromCache(cachedFile);
    }
  }
}

async function generateMapData(
  seed: string,
  difficulty: string,
  cachedFile: string
): Promise<LevelList> {
  let mapsData: Level[];
  if (process.env.WINEARCH) {
    mapsData = await getFromWine(seed, difficulty);
  } else {
    mapsData = await getFromWindowsExe(seed, difficulty);
  }
  if (mapsData.length == 0) {
    throw new Error("Failed generating data, likely a problem with your D2 Lod Game files");
  }
  const seedData: LevelList = {
    seed: seed,
    difficulty: difficulty,
    levels: mapsData,
  };
  saveFile(cachedFile, JSON.stringify(seedData));
  return seedData;
}

async function isInQueue(cachedFile: string): Promise<boolean> {
  const generationQueue = path.resolve("./cache/queue.txt");
  let skipGeneration: boolean = false;
  if (fs.existsSync(generationQueue)) {
    const queue = fs.readFileSync(generationQueue, { encoding: "utf8" });
    if (queue.includes(cachedFile)) {
      console.log("Skipping generating data for " + cachedFile);
      skipGeneration = true; // this prevents the map data being generated a second time
    } else {
      fs.appendFileSync(generationQueue, cachedFile + "\n");
      skipGeneration = false;
    }
  } else {
    fs.appendFileSync(generationQueue, cachedFile + "\n");
    skipGeneration = false;
  }
  return skipGeneration;
}

async function getAllMapsFromCache(cachedFile: string): Promise<LevelList> {
  // if it was previously saved, use the same file
  console.log("Reading cache file " + cachedFile);
  const seedData: LevelList = JSON.parse(
    fs.readFileSync(path.resolve(cachedFile), { encoding: "utf8" })
  );
  if (seedData?.levels?.length == 0) {
    console.error(
      "Error found with cached file, deleting file, please try again"
    );
    fs.unlinkSync(cachedFile);
  }
  return seedData;
}

async function waitForFileExists(filePath, currentTime = 0, timeout = 10000) {
  if (fs.existsSync(filePath)) return true;
  if (currentTime === timeout) return false;
  // wait for 1 second
  await new Promise((resolve, reject) => setTimeout(() => resolve(true), 100));
  // waited for 1 second
  return waitForFileExists(filePath, currentTime + 100, timeout);
}