import * as fs from "fs";
import { getAllMapData } from "../data/getMapData";
import { generateMapImage } from "../map/generateMapImage";
import { LevelList } from "../types/level.type";
import { LevelImage } from "../types/LevelImage";
import { RequestConfig } from "../types/RequestConfig";

// this is very lazy, sue me
async function test() {
  const seed = "354555"
  const start = performance.now();
  const seedData = await getAllMapData(seed, "2");
  await Promise.allSettled([
    createImage(seedData, 1, "Rogue Encampment"),
    createImage(seedData, 2, "Blood Moor"),
    createImage(seedData, 3, "Cold Plains"),
    createImage(seedData, 4, "Stony Field"),
    createImage(seedData, 5, "Dark Wood"),
    createImage(seedData, 6, "Black Marsh"),
    createImage(seedData, 7, "Tamoe Highland"),
    createImage(seedData, 8, "Den of Evil"),
    createImage(seedData, 9, "Cave Level 1"),
    createImage(seedData, 10, "Underground Passage Level 1"),
    createImage(seedData, 11, "Hole Level 1"),
    createImage(seedData, 12, "Pit Level 1"),
    createImage(seedData, 13, "Cave Level 2"),
    createImage(seedData, 14, "Underground Passage Level 2"),
    createImage(seedData, 15, "Hole Level 2"),
    createImage(seedData, 16, "Pit Level 2"),
    createImage(seedData, 17, "Burial Grounds"),
    createImage(seedData, 18, "Crypt"),
    createImage(seedData, 19, "Mausoleum"),
    createImage(seedData, 20, "Forgotten Tower"),
    createImage(seedData, 21, "Tower Cellar Level 1"),
    createImage(seedData, 22, "Tower Cellar Level 2"),
    createImage(seedData, 23, "Tower Cellar Level 3"),
    createImage(seedData, 24, "Tower Cellar Level 4"),
    createImage(seedData, 25, "Tower Cellar Level 5"),
    createImage(seedData, 26, "Monastery Gate"),
    createImage(seedData, 27, "Outer Cloister"),
    createImage(seedData, 28, "Barracks"),
    createImage(seedData, 29, "Jail Level 1"),
    createImage(seedData, 30, "Jail Level 2"),
    createImage(seedData, 31, "Jail Level 3"),
    createImage(seedData, 32, "Inner Cloister"),
    createImage(seedData, 33, "Cathedral"),
    createImage(seedData, 34, "Catacombs Level 1"),
    createImage(seedData, 35, "Catacombs Level 2"),
    createImage(seedData, 36, "Catacombs Level 3"),
    createImage(seedData, 37, "Catacombs Level 4"),
    createImage(seedData, 38, "Tristram"),
    createImage(seedData, 39, "Moo Moo Farm"),
    createImage(seedData, 40, "Lut Gholein"),
    createImage(seedData, 41, "Rocky Waste"),
    createImage(seedData, 42, "Dry Hills"),
    createImage(seedData, 43, "Far Oasis"),
    createImage(seedData, 44, "Lost City"),
    createImage(seedData, 45, "Valley of Snakes"),
    createImage(seedData, 46, "Canyon of the Magi"),
    createImage(seedData, 47, "Sewers Level 1"),
    createImage(seedData, 48, "Sewers Level 2"),
    createImage(seedData, 49, "Sewers Level 3"),
    createImage(seedData, 50, "Harem Level 1"),
    createImage(seedData, 51, "Harem Level 2"),
    createImage(seedData, 52, "Palace Cellar Level 1"),
    createImage(seedData, 53, "Palace Cellar Level 2"),
    createImage(seedData, 54, "Palace Cellar Level 3"),
    createImage(seedData, 55, "Stony Tomb Level 1"),
    createImage(seedData, 56, "Halls of the Dead Level 1"),
    createImage(seedData, 57, "Halls of the Dead Level 2"),
    createImage(seedData, 58, "Claw Viper Temple Level 1"),
    createImage(seedData, 59, "Stony Tomb Level 2"),
    createImage(seedData, 60, "Halls of the Dead Level 3"),
    createImage(seedData, 61, "Claw Viper Temple Level 2"),
    createImage(seedData, 62, "Maggot Lair Level 1"),
    createImage(seedData, 63, "Maggot Lair Level 2"),
    createImage(seedData, 64, "Maggot Lair Level 3"),
    createImage(seedData, 65, "Ancient Tunnels"),
    createImage(seedData, 66, "Tal Rasha's Tomb"),
    createImage(seedData, 67, "Tal Rasha's Tomb"),
    createImage(seedData, 68, "Tal Rasha's Tomb"),
    createImage(seedData, 69, "Tal Rasha's Tomb"),
    createImage(seedData, 70, "Tal Rasha's Tomb"),
    createImage(seedData, 71, "Tal Rasha's Tomb"),
    createImage(seedData, 72, "Tal Rasha's Tomb"),
    createImage(seedData, 73, "Duriel's Lair"),
    createImage(seedData, 74, "Arcane Sanctuary"),
    createImage(seedData, 75, "Kurast Docktown"),
    createImage(seedData, 76, "Spider Forest"),
    createImage(seedData, 77, "Great Marsh"),
    createImage(seedData, 78, "Flayer Jungle"),
    createImage(seedData, 79, "Lower Kurast"),
    createImage(seedData, 80, "Kurast Bazaar"),
    createImage(seedData, 81, "Upper Kurast"),
    createImage(seedData, 82, "Kurast Causeway"),
    createImage(seedData, 83, "Travincal"),
    createImage(seedData, 84, "Spider Cave"),
    createImage(seedData, 85, "Spider Cavern"),
    createImage(seedData, 86, "Swampy Pit Level 1"),
    createImage(seedData, 87, "Swampy Pit Level 2"),
    createImage(seedData, 88, "Flayer Dungeon Level 1"),
    createImage(seedData, 89, "Flayer Dungeon Level 2"),
    createImage(seedData, 90, "Swampy Pit Level 3"),
    createImage(seedData, 91, "Flayer Dungeon Level 3"),
    createImage(seedData, 92, "Sewers Level 1"),
    createImage(seedData, 93, "Sewers Level 2"),
    createImage(seedData, 94, "Ruined Temple"),
    createImage(seedData, 95, "Disused Fane"),
    createImage(seedData, 96, "Forgotten Reliquary"),
    createImage(seedData, 97, "Forgotten Temple"),
    createImage(seedData, 98, "Ruined Fane"),
    createImage(seedData, 99, "Disused Reliquary"),
    createImage(seedData, 100, "Durance of Hate Level 1"),
    createImage(seedData, 101, "Durance of Hate Level 2"),
    createImage(seedData, 102, "Durance of Hate Level 3"),
    createImage(seedData, 103, "The Pandemonium Fortress"),
    createImage(seedData, 104, "Outer Steppes"),
    createImage(seedData, 105, "Plains of Despair"),
    createImage(seedData, 106, "City of the Damned"),
    createImage(seedData, 107, "River of Flame"),
    createImage(seedData, 108, "Chaos Sanctum"),
    createImage(seedData, 109, "Harrogath"),
    createImage(seedData, 110, "Bloody Foothills"),
    createImage(seedData, 111, "Rigid Highlands"),
    createImage(seedData, 112, "Arreat Plateau"),
    createImage(seedData, 113, "Crystalized Cavern Level 1"),
    createImage(seedData, 114, "Cellar of Pity"),
    createImage(seedData, 115, "Crystalized Cavern Level 2"),
    createImage(seedData, 116, "Echo Chamber"),
    createImage(seedData, 117, "Tundra Wastelands"),
    createImage(seedData, 118, "Glacial Caves Level 1"),
    createImage(seedData, 119, "Glacial Caves Level 2"),
    createImage(seedData, 120, "Rocky Summit"),
    createImage(seedData, 121, "Nihlathaks Temple"),
    createImage(seedData, 122, "Halls of Anguish"),
    createImage(seedData, 123, "Halls of Death's Calling"),
    createImage(seedData, 124, "Halls of Vaught"),
    createImage(seedData, 125, "Hell1"),
    createImage(seedData, 126, "Hell2"),
    createImage(seedData, 127, "Hell3"),
    createImage(seedData, 128, "The Worldstone Keep Level 1"),
    createImage(seedData, 129, "The Worldstone Keep Level 2"),
    createImage(seedData, 130, "The Worldstone Keep Level 3"),
    createImage(seedData, 131, "Throne of Destruction"),
    createImage(seedData, 132, "The Worldstone Chamber")
  // createImage("65464564", "2", "124", "vaught-topleft");
  // createImage("35481586", "2", "124", "vaught-topright");
  // createImage("33333", "2", "124", "vaught-bottomleft");
  // createImage("543523", "2", "124", "vaught-bottomright");
  ]);
  const end = performance.now();
  console.log(` ${Math.trunc(end - start)}ms`);
}

async function createImage(
  seedData: LevelList,
  mapid: number,
  filename: string
): Promise<void> {
  console.log(`Getting ${mapid}`);

  const reqConfig = new RequestConfig(
    seedData.seed,
    seedData.difficulty,
    mapid,
    false, //verbose
    false, //trim
    false, //isometric
    true, //edge
    0.8,
    2,
    150,
    false,
    "#AAA",
    false,
    false,
    true,  //rotate
    false, // show objs
    true,   // nostitch
    false
  );
  
  return generateMapImage(reqConfig, seedData).then(levelImage => {;
    fs.writeFileSync(
      "./build/" + reqConfig.mapid + "-" + filename + ".png",
      levelImage.canvas.toBuffer("image/png")
    );
  });

  // const reqConfig2 = new RequestConfig(
  //   seed,
  //   difficulty,
  //   mapid,
  //   false, //verbose
  //   false, //trim
  //   false, //isometric
  //   true, //edge
  //   0.8,
  //   2,
  //   150
  // );

  // let levelImage2: LevelImage = await generateMapImage(reqConfig2, seedData);
  // fs.writeFileSync(
  //   "./build/" + reqConfig2.mapid + "-" + filename + "_4.png",
  //   levelImage2.canvas.toBuffer("image/png")
  // );
}

test();
