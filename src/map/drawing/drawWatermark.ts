import { Canvas, createCanvas, CanvasRenderingContext2D } from "canvas";
import { RequestConfig } from "../../types/RequestConfig";

export function drawWatermark(ctx: CanvasRenderingContext2D, reqConfig: RequestConfig): Canvas {
  
    let watermarks = [];
    watermarks.push("If you paid for this\nyou have been scammed");
    watermarks.push("如果您為此付出了，\n您已經被騙了");
    watermarks.push("Wenn Sie dafür bezahlt haben, \nwurden Sie betrogen");
    watermarks.push("Si pagaste por esto, \nhas sido estafado");
    watermarks.push("Si vous avez payé pour cela, \nvous avez été arnaque");
    watermarks.push("Se hai pagato per questo \nsei stato truffato");
    watermarks.push("당신이 이것을 지불했다면 \n당신은 사기를당했습니다");
    watermarks.push("Jeśli za to zapłaciłeś, \nzostałeś oszukany");
    watermarks.push("Si pagaste por esto, \nhas sido estafado");
    watermarks.push("あなたがこれに対して支払った場合、\nあなたは詐欺されています");
    watermarks.push("Se você pagou por isso, \nfoi enganado");
    watermarks.push("Если вы заплатили за это, \nвас обманули");

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

 