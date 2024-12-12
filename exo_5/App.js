import BaseApp from "./BaseApp.js";
import Letter from "./Letter.js";
import Webcam from "./Webcam.js";

export default class App extends BaseApp {
  constructor() {
    super();
    this.ctx.willReadFrequently = true;
    this.ctx.font = `14px monospace`;
    this.letters = [];
    this.pixelColors = [];
    this.imageLoaded = false;
    this.init();

    this.backgroundImage = new Image();
    this.backgroundImage.src = "./image/imageB2.jpg";
    this.backgroundImage.onload = () => {
      this.imageLoaded = true;
      this.draw();
    };
    this.backgroundImage.onerror = () => {
      console.error("Failed to load background image.");
    };
  }

  loadVideo() {
    return new Promise((resolve) => {
      this.video = new Webcam();
      this.video.video.addEventListener("loadeddata", resolve);
    });
  }

  async init() {
    await this.loadVideo();
    for (let i = 0; i < 80; i++) {
      for (let j = 0; j < 80; j++) {
        this.letters.push(new Letter(this.ctx, "B", i * 10, j * 10));
      }
    }
    if (this.imageLoaded) {
      this.draw();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.backgroundImage.complete && this.imageLoaded) {
      this.ctx.drawImage(
        this.backgroundImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    }

    this.ctx.drawImage(this.video.video, 0, 0, 1000, 1000);
    const pixels = this.ctx.getImageData(0, 0, 1000, 1000).data;

    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.letters.forEach((letter) => {
      const i = (letter.y * 800 + letter.x) * 4;
      const luminance = this.getLuminence([
        pixels[i],
        pixels[i + 1],
        pixels[i + 2],
      ]);

      if (luminance > 0.9) {
        this.ctx.save();
        this.ctx.globalAlpha = luminance;
        this.ctx.drawImage(
          this.backgroundImage,
          letter.x,
          letter.y,
          10,
          10,
          letter.x,
          letter.y,
          10,
          10
        );
        this.ctx.restore();
      } else {
        const grayValue = Math.floor(luminance * 255);
        letter.color = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${luminance})`;
      }

      letter.scale = luminance;
    });

    this.letters.forEach((letter) => {
      letter.draw();
    });

    requestAnimationFrame(() => this.draw());
  }

  getLuminence(rgb) {
    return (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  }
}
