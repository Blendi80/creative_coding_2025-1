import BaseApp from "./BaseApp.js";

export default class App extends BaseApp {
  constructor() {
    super();

    this.audioFile = "./sound.mp3";

    this.audio = new Audio(this.audioFile);
    document.body.appendChild(this.audio);
    this.isPlaying = false;

    this.init();
  }

  init() {
    document.addEventListener("click", (e) => {
      if (!this.audioContext) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;

        this.audioContext = new AudioContext();

        this.setup();
      }

      const mouseX = e.clientX;

      const percent = mouseX / window.innerWidth;

      this.audio.currentTime = this.audio.duration * percent;

      if (this.isPlaying) {
        this.audio.pause();
        this.isPlaying = false;
      } else {
        this.audio.play();
        this.isPlaying = true;
      }
    });
  }

  setup() {
    this.source = this.audioContext.createMediaElementSource(this.audio);
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    this.draw();
  }

  draw() {
    this.analyser.getByteFrequencyData(this.dataArray);

    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    let average = sum / this.dataArray.length;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const blurAmount = Math.max(20 - average / 5, 0);
    this.ctx.filter = `blur(${blurAmount}px)`;

    this.ctx.font = "100px WagonBold";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillStyle = "#2433FF";

    let x = this.width / 2;
    let y = this.height / 2;

    const randomX = (Math.random() - 0.5) * average * 4;
    const randomY = (Math.random() - 0.5) * average * 4;

    x += randomX;
    y += randomY;

    this.ctx.fillText("NIGHT RIDER", x, y);

    requestAnimationFrame(this.draw.bind(this));
  }
}
