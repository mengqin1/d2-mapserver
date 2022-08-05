export class RequestConfig {
  verbose: boolean;
  flat: boolean;
  isometric: boolean;
  trim: boolean;
  edge: boolean;
  wallthickness: number;
  serverScale: number;
  watermark: boolean;
  wallColor: string;
  showTextLabels: boolean;
  showLevelTitles?: boolean;
  padding: number;
  rotate: boolean;
  showObjects?: boolean;
  nostitch: boolean;
  pathFinding?: boolean;
  pathStart?: string;
  pathEnd?: string;
  pathColour?: string;

  seed: string;
  difficulty: string;
  mapid: number;

  constructor(
    seed: string,
    difficulty: string,
    mapid: number,
    verbose: boolean,
    trim: boolean,
    isometric: boolean,
    edge: boolean,
    wallthickness: number,
    serverScale: number,
    padding: number = 150,
    watermark: boolean = false,
    wallColor: string = "#AAA",
    showTextLabels: boolean = true,
    showLevelTitles: boolean = false,
    rotate: boolean = false,
    showObjects: boolean = true,
    nostitch: boolean = false,
    pathFinding: boolean = true,
    pathStart: string = "",
    pathEnd: string = "",
    pathColour: string = "F00"
  ) {
    this.seed = seed;
    this.difficulty = difficulty;
    this.mapid = mapid;
    this.verbose = verbose;
    this.trim = trim;
    this.isometric = isometric;
    this.edge = edge;
    this.wallthickness = wallthickness ? wallthickness : 1;
    this.serverScale = serverScale ? serverScale : 2;
    this.watermark = watermark;
    this.wallColor = wallColor;
    this.showTextLabels = showTextLabels;
    this.showLevelTitles = showLevelTitles;
    this.padding = padding;
    this.rotate = rotate;
    this.showObjects = showObjects;
    this.nostitch = nostitch;
    this.pathFinding = pathFinding;
    this.pathStart = pathStart
    this.pathEnd = pathEnd
    this.pathColour = pathColour

    if (isNaN(this.wallthickness)) this.wallthickness = 1;
    if (this.wallthickness > 10) this.wallthickness = 10;
    if (this.wallthickness < 1) this.wallthickness = 1;

    if (isNaN(this.serverScale)) this.serverScale = 2;
    if (this.serverScale > 10) this.serverScale = 10;
    if (this.serverScale < 2) this.serverScale = 2;
  }

  getUniqueId() {
    let str = `${this.seed}_${this.difficulty}_${this.mapid}_`
    str += this.verbose ? "1_" : "0_"
    str += this.trim ? "1_" : "0_"
    str += this.isometric ? "1_" : "0_"
    str += this.edge ? "1_" : "0_"
    str += this.wallthickness.toFixed(4) + "_"
    str += this.serverScale.toFixed(4) + "_"
    str += this.watermark ? "1_" : "0_"
    str += this.wallColor.toString().replace('#', '') + "_"
    str += this.showTextLabels ? "1_" : "0_"
    str += this.showLevelTitles ? "1_" : "0_"
    str += this.padding.toString() + "_";
    str += this.rotate ? "1_" : "0_"
    str += this.pathStart.toString() + "_";
    str += this.pathEnd.toString();
    str += this.pathColour.toString();
    return str;
  }
}
