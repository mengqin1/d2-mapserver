import { Level } from "../types/level.type";
import * as fs from "fs";
import { spawn } from "child_process";
import { performance } from "perf_hooks";
import path = require("path");


export async function testInstallation(): Promise<string> {
    const start = performance.now();
    const D2_GAME_FILES = process.env.D2_GAME_FILES || "game";
    const cmd = [
      path.resolve(D2_GAME_FILES),
      "--seed",
      "12345",
      "--difficulty",
      "1",
      "--map",
      "1"
    ];
    
    console.log("Running test: bin/d2-map.exe " + cmd.join(" ").toString());
    let scriptOutput: string = "";
    const errorFile = "./cache/windowserrors.log";
    
    let successful = false;
    return new Promise((resolve) => {
      let errorStream = fs.createWriteStream(errorFile, { flags: "a" });
      var child = spawn("bin/d2-map.exe", cmd);
      child.stdout.setEncoding("utf8");
      child.stdout.on("data", function (data) {
        data = data.toString();
        scriptOutput += data;
        if (data.includes("Map:Generation:Done")) {
            console.log("Test successful!");
            successful = true;
            return resolve("");
        }
      });
      child.stderr.setEncoding("utf8");
      child.stderr.on("data", (data) => {
        scriptOutput += data;
        errorStream.write(data.toString());
      });
  
      child.on("close", function (code) {
        if (successful) {
            return resolve("");
        } else {
            return resolve(scriptOutput);
        }
      });
    });
  }
  