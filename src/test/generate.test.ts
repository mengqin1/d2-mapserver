// const { getMapData } = require("../wine/getMapData");
import { Canvas } from "canvas";
import { getAllMapData } from "../data/getMapData";
import { generateMapImage } from "../map/generateMapImage";
import { LevelImage } from "../types/LevelImage";
import { RequestConfig } from "../types/RequestConfig";

describe("All maps can generate without error", async () => {
  console.log = jest.fn();
  const seed = "1034522";
  const difficulty = "2";
  const seedData = await getAllMapData(seed, difficulty);

  for (let i = 1; i < 126; i++) {
    test("Successfully generate map " + i, async () => {
      
      const mapid = i;

      const reqConfig = new RequestConfig(
        seed,
        difficulty,
        mapid,
        false, //verbose
        true, //trim
        true, //isometric
        true, //edge
        0.8,
        2
      );

      const levelImage: LevelImage = await generateMapImage(reqConfig, seedData);
      expect(levelImage.mapData.id).toEqual(i);
      expect(levelImage.canvas instanceof Canvas).toBe(true);
    });
  }
});
