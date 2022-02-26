import { Canvas, createCanvas, CanvasRenderingContext2D } from "canvas";
import { RequestConfig } from "../../types/RequestConfig";

export function drawWatermark(ctx: CanvasRenderingContext2D, reqConfig: RequestConfig): Canvas {
  
    let watermarks = [];
    watermarks.push("이 서버는 PST 오후\n1시에 종료됩니다.");
    watermarks.push("Этот сервер отключается\nв 13:00 по тихоокеанскому\nстандартному времени.");
    watermarks.push("此服务器将于太平洋标准时间下午\n1 点关闭");   
    watermarks.push("Este servidor\nse cerrará a la\n1 p. m. PST");
    watermarks.push("Ce serveur s'arrête\nà 13h00 PST");
    watermarks.push("Бұл сервер PST 13:00-де жабылады");

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

 