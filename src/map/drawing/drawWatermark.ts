import { Canvas, createCanvas, CanvasRenderingContext2D } from "canvas";
import { RequestConfig } from "../../types/RequestConfig";

export function drawWatermark(ctx: CanvasRenderingContext2D, reqConfig: RequestConfig): Canvas {
  
    let watermarks = [];
    watermarks.push("If you paid for this you \nhave been scammed\nSearch 'd2r-mapview' on Github");
    watermarks.push("You are using the free map server\nRun your own to remove this watermark");
    watermarks.push("This free map server is\nshutting down 6pm 13 Feb PST");   
    watermarks.push("如果您为此付款，您就被骗了。\n在 Github 上搜索 d2r-mapview");
    watermarks.push("收费行为均为诈骗");
    watermarks.push("당신이 이것을 지불했다면\n당신은 사기를 당한 것입니다.\nGithub에서 'd2r-mapview' 검색");
    watermarks.push("이 무료 지도 서버는 몇\n주 후에 종료됩니다.");
    watermarks.push("Этот бесплатный\nкартографический сервер закрывается\nчерез несколько недель.");
    watermarks.push("Если вы заплатили\nза это, вас обманули\nНайдите «d2r-mapview» на Github");

    let watermarkText = watermarks[Math.floor(Math.random()*watermarks.length)];
    if (!reqConfig.watermark) watermarkText = "";
    
    const canvas2: Canvas = createCanvas(ctx.canvas.width, ctx.canvas.height+20);
    const ctx2: CanvasRenderingContext2D = canvas2.getContext("2d");
    ctx2.drawImage(ctx.canvas, 0,0);
    ctx2.save();
    
    ctx2.font = `400 16px "Roboto"`;
    ctx2.textAlign = "center";
    
    ctx2.strokeStyle = "black";
    ctx2.lineWidth = 1;
    if (Math.random() < 0.5) {
      // text on top
      ctx2.textBaseline = "top";
      ctx2.translate(110, 70);
    } else {
      // text on bottom
      ctx2.textBaseline = "bottom";
      ctx2.translate(canvas2.width-140, canvas2.height-140);
    }
    ctx2.rotate((-45 * Math.PI) / 180);
    ctx2.scale(1, 2);
    ctx2.strokeText(watermarkText, 0, 0);
    ctx2.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx2.fillText(watermarkText, 0, 0);
    ctx2.restore();
    return canvas2;
  }

 