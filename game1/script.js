import { playerAnimationStates } from "./playerAnimations.js";

const initCanvas = () => {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const frameRate = 3;
  const gameFrame = 0;
  return {
    canvas,
    ctx,
    frameRate,
    gameFrame,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
  };
};

const canvasObj = initCanvas();

const loadPlayerSprite = (path, frames, animations) => {
  const playerImage = new Image();
  playerImage.src = path;

  const width = playerImage.width / frames;
  const height = playerImage.height / animations;

  const render = (animations) => {
    let position =
      Math.floor(canvasObj.gameFrame / canvasObj.frameRate) %
      animations[currentAnimation].loc.length;
    let frameX = width * position;
    let frameY = animations[currentAnimation].loc[position].y;

    canvasObj.ctx.drawImage(
      playerImage,
      frameX,
      frameY,
      width,
      height,
      0,
      0,
      width,
      height
    );
  };

  return {
    playerImage,
    width,
    height,
    render,
  };
};

const loadAnimations = (animationArray, spriteWidth, spriteHeight) => {
  const animations = [];
  animationArray.forEach((state, index) => {
    let frames = {
      loc: [],
    };

    for (let j = 0; j < state.frames; j++) {
      let positionX = j * spriteWidth;
      let positionY = index * spriteHeight;
      frames.loc.push({ x: positionX, y: positionY });
    }
    animations[state.name] = frames;
  });

  return animations;
};

const player = loadPlayerSprite("images/dog.png", 12, 10);
const playerAnimations = loadAnimations(
  playerAnimationStates,
  player.width,
  player.height
);

let currentAnimation = "idle";

function animate() {
  canvasObj.ctx.clearRect(
    0,
    0,
    canvasObj.CANVAS_WIDTH,
    canvasObj.CANVAS_HEIGHT
  );

  player.render(playerAnimations);

  canvasObj.gameFrame++;
  requestAnimationFrame(animate);
}
animate();
