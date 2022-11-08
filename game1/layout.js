import { backgrounds } from "./playerAnimations.js";

const initCanvas = () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 700;
  const frameRate = 3;
  const gameFrame = 0;
  const gameSpeed = 3;
  return {
    canvas,
    ctx,
    frameRate,
    gameFrame,
    gameSpeed,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
  };
};

const canvasObj = initCanvas();

const loadBackgrounds = (images) => {
  const backgrounds = images.map((item) => {
    const bgLayer = new Image();
    bgLayer.src = item.path;
    return bgLayer;
  });

  return {
    backgrounds,
  };
};

class Layer {
  constructor(image, speedModifier, canvas) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = canvas.gameSpeed * this.speedModifier;
    this.canvas = canvas;
  }

  update() {
    this.speed = this.canvas.gameSpeed * this.speedModifier;
    if (this.x <= -this.width) {
      this.x = this.width + this.x2 - this.speed;
    }

    if (this.x2 <= -this.width) {
      this.x2 = this.width + this.x - this.speed;
    }

    this.x = Math.floor(this.x - this.speed);
    this.x2 = Math.floor(this.x2 - this.speed);
  }

  draw() {
    this.canvas.ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.canvas.ctx.drawImage(
      this.image,
      this.x2,
      this.y,
      this.width,
      this.height
    );
  }
}

const layers = loadBackgrounds(backgrounds);
const layer0 = new Layer(layers.backgrounds[0], 0.1, canvasObj);
const layer1 = new Layer(layers.backgrounds[1], 0.4, canvasObj);
const layer2 = new Layer(layers.backgrounds[2], 0.6, canvasObj);
const layer3 = new Layer(layers.backgrounds[3], 0.2, canvasObj);
const layer4 = new Layer(layers.backgrounds[4], 0.9, canvasObj);

const gameObjects = [layer0, layer1, layer2, layer3, layer4];

function animate() {
  canvasObj.ctx.clearRect(
    0,
    0,
    canvasObj.CANVAS_WIDTH,
    canvasObj.CANVAS_HEIGHT
  );

  gameObjects.forEach((layer) => {
    layer.update();
    layer.draw();
  });

  requestAnimationFrame(animate);
}

animate();
