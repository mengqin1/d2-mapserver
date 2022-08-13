import { Level, ObjectType, Object, LevelList } from "../types/level.type";

export async function getWalkableExits(
  seedData: LevelList
): Promise<LevelList> {
  seedData.levels.map((levelData: Level) => {
    
    const openingWidth = getConnectionWidth(levelData.id);
    if (openingWidth > 0) {
      // console.log(levelData.id);
      // top
      seedData = topExit(seedData, levelData);
      //bottom
      seedData = bottomExit(seedData, levelData);
      //right 3226885
      seedData = rightExit(seedData, levelData);

      //left 5884
      seedData = leftExit(seedData, levelData);
    }
  });

  seedData = updateUnlabelledExit(seedData, 42, 43)
  seedData = updateUnlabelledExit(seedData, 44, 43)

  seedData = updateUnlabelledExit(seedData, 80, 81)
  seedData = updateUnlabelledExit(seedData, 81, 82)

  return seedData;
}

function topExit(seedData: LevelList, levelData: Level) {
  if (isValidTileConnectorWidth(levelData.map[1][1], levelData.id)) {
    let exitx = levelData.map[1][0] + (levelData.map[1][1] / 2);
    let exity = 1;
    seedData = addNewExit(seedData, levelData, exitx, exity);
    // console.log("found top1 " + exitx + " " + exity + " " + levelData.map[1][1]);
  }
  // console.log("found top1a " + levelData.map[1][0] + " " + levelData.map[1][1]);
  if (isValidTileConnectorWidth(levelData.map[1][3], levelData.id)) {
    let exitx = levelData.map[1][0] + levelData.map[1][1] + levelData.map[1][2] + (levelData.map[1][3] / 2);
    let exity = 1;
    seedData = addNewExit(seedData, levelData, exitx, exity);
    // console.log("found top2 " + exitx + " " + exity + " " + levelData.map[1][3]);
  }
  
  return seedData;
}

function bottomExit(seedData: LevelList, levelData: Level) {
  if (isValidTileConnectorWidth(levelData.map[levelData.map.length - 1][1], levelData.id)) {
    let exitx = levelData.map[levelData.map.length - 1][0] + (levelData.map[levelData.map.length - 1][1] / 2);
    let exity = levelData.size.height;
    seedData = addNewExit(seedData, levelData, exitx, exity);
    // console.log("found bottom1 " + exitx + " " + exity + " " + levelData.map[levelData.map.length - 1][1]);
  }
  if (isValidTileConnectorWidth(levelData.map[levelData.map.length - 1][3], levelData.id)) {
    let exitx = levelData.map[levelData.map.length - 1][0] + levelData.map[levelData.map.length - 1][1] + levelData.map[levelData.map.length - 1][2] + (levelData.map[levelData.map.length - 1][3] / 2);
    let exity = levelData.size.height;
    seedData = addNewExit(seedData, levelData, exitx, exity);
    // console.log("found bottom2 " + exitx + " " + exity + " " + levelData.map[levelData.map.length - 1][3]);
  }
  // console.log("found bottom " + levelData.map[levelData.map.length - 1]);
  return seedData;
}

function rightExit(seedData: LevelList, levelData: Level) {
  let rightCount = 0;
  let lastIndex = 0;
  levelData.map.forEach((coord, index) => {
    let alt = false;

    coord.forEach((num) => {
      alt = !alt;
    });
    if (alt) {
      rightCount++;
      lastIndex = index;
    } else {
      if (rightCount) {
        // console.log("found right " + rightCount);
        if (isValidTileConnectorWidth(rightCount, levelData.id)) {
          let exitx = levelData.size.width;
          let exity = lastIndex - (rightCount / 2);
          //console.log("Found row " + index + " had colsum " + colsum);
          // console.log("found right " + exitx + " " + exity + " " + rightCount);
          seedData = addNewExit(seedData, levelData, exitx, exity);
        }
      }
      rightCount = 0;
    }
  });
  // console.log("found right " + rightCount);
  return seedData;
}

function leftExit(seedData: LevelList, levelData: Level) {
  let leftCount = 0;
  let lastIndex2 = 0;
  levelData.map.forEach((coord, index) => {
    if (coord[0] == 0) {
      leftCount++;
      lastIndex2 = index;
    } else {
      if (leftCount) {
        // console.log("found left " + leftCount);
        if (isValidTileConnectorWidth(leftCount, levelData.id)) {
          let exitx = 0;
          let exity = lastIndex2 - (leftCount / 2);
          seedData = addNewExit(seedData, levelData, exitx, exity);
          
        }
      }
      leftCount = 0;
    }
  });
  
  return seedData;
}

function getConnectionWidth(levelid: number) {
    switch (levelid) {
        case 2: return 28;
        case 3: return 28;
        case 4: return 28;
        case 5: return 28;
        case 6: return 28;
        case 7: return 28;
        case 17: return 28;
        case 28: return 19;
        case 41: return 13;
        case 42: return 13;
        case 43: return 13;
        case 44: return 13;
        case 45: return 13;
        case 79: return 13;
        case 80: return 13;
        case 81: return 13;
        case 82: return 13;
        case 104: return 13;
        case 105: return 13;
        case 106: return 13;
        case 107: return 13;
        case 108: return 13;
        default: return 0;
    }
}

function isValidTileConnectorWidth(tileCount: number, levelid: number) {
    switch (levelid) {
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 17:
        if (tileCount == 28 || tileCount == 19) {
          return true
        }
        break;
      case 28: // barracks
        switch (tileCount) {
          case 5:
          case 19:
          case 39:
            return true
        }
        break;
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
        switch (tileCount) {
          case 8:
          case 9:
          case 11:
          case 13:
          case 19:
          case 22:
            return true
        }
        break;
      case 79:
      case 80:
      case 81:
        switch (tileCount) {
          case 10:
          case 15:
          case 20:
            return true
        }
        break;
      case 105:
        return (tileCount == 5)
      case 104:
      case 106:
        switch (tileCount) {
          case 5:
          case 6:
          case 9:
            return true
        }
        break;
      case 107:
        return (tileCount == 10)
    }
    return false;
}

function addNewExit(seedData: LevelList, levelData: Level, exitx: number, exity: number): LevelList {
  let newExit: Object = { id: 0, type: ObjectType.Exit, x: exitx, y: exity };
  switch (levelData.id) {
    case 2: // blood moor
      newExit.id = 3; // cold plains
      break;
    case 4:
      newExit.id = 3; // cold plains
      break;
    case 5:
      newExit.id = 6; // black marsh
      break;
    case 7:
      newExit.id = 6; // black marsh
      break;
    case 17:
      newExit.id = 3; // cold plains
      break;
    case 28:
      newExit.id = 27; // outer cloister
      break;
    case 41:
      newExit.id = 42; // dry hills
      break;
    case 45:
      newExit.id = 44; // lost city
      break;
    case 79:
      newExit.id = 80;
      break;
    case 104:
      newExit.id = 105;
      break;
    case 106:
      newExit.id = 105;
      break;
    case 107:
      newExit.id = 108;
      break;
  }
  if (newExit.id) {
    let otherExit = convertExit(seedData, levelData, newExit.id, exitx, exity);
    seedData = addOrUpdateExit(seedData, newExit.id, otherExit);
    // console.log(levelData.id);
    // console.log(seedData.levels.find((map) => map.id === newExit.id).objects.filter(ojb => ojb.type == "exit"));
  }
  seedData = addOrUpdateExit(seedData, levelData.id, newExit);
  
  return seedData;
}

function updateUnlabelledExit(seedData: LevelList, levelid: number, newExitId: number) {
  //console.log(seedData.levels.find((map) => map.id === levelid).objects.filter(ojb => ojb.type == "exit"));
  let exit = seedData.levels.find((map) => map.id === levelid).objects.find(ojb => ojb.type == "exit" && ojb.id == 0)
  if (exit) {
    // update exit num in current level
    seedData.levels.find((map) => map.id === levelid).objects.find(ojb => ojb.type == "exit" && ojb.id == 0).id = newExitId;
    
    // update same exit in connected level
    let levelData = seedData.levels.find((map) => map.id === levelid);
    let otherExit = convertExit(seedData, levelData, newExitId, exit.x, exit.y);
    seedData = addOrUpdateExit(seedData, newExitId, otherExit);
  }
  return seedData;
}

function addOrUpdateExit(seedData: LevelList, levelid: number, newExit: Object) {
    let foundExit = seedData.levels
      .find((map) => map.id === levelid)
      .objects.find(
        (ojb) => ojb.type == "exit" && Math.abs(ojb.x - newExit.x) < 3 && Math.abs(ojb.y - newExit.y) < 3
      );
    if (foundExit) {
        // if it's already added
        if (newExit.id > 0) {
          // console.log("updating exit " + newExit.id);
          seedData.levels.find((map) => map.id === levelid).objects.find((ojb) => ojb.type == "exit" && Math.abs(ojb.x - newExit.x) < 3 && Math.abs(ojb.y - newExit.y) < 3).id = newExit.id;
        }
    } else {
        seedData.levels.find((map) => map.id === levelid).objects.push(newExit);
    }
    // console.log(seedData.levels.find((map) => map.id === levelid).objects.filter(ojb => ojb.type == "exit"));
    return seedData;
}

function convertExit(seedData: LevelList, levelData: Level, exitid: number, exitx: number, exity: number): Object {
    let otherLevelData = seedData.levels.find((map) => map.id === exitid);
    let absoluteX = levelData.offset.x + exitx
    let absoluteY = levelData.offset.y + exity
    let newX = absoluteX - otherLevelData.offset.x
    let newY = absoluteY - otherLevelData.offset.y
    return { id: levelData.id, type: ObjectType.Exit, x: newX, y: newY };
}