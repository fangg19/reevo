const Application = PIXI.Application;

const app = new Application({
  width: 1000,
  height: 700,
  backgroundColor: 0xfbda66,
  antialias: true,
});
app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';

let shapesCounter = document.getElementById('shapes-counter');
let occupiedArea = document.getElementById('occupied-area');

let shapesPerSecond = document.getElementById('shapes-per-second');
let gravityValue = document.getElementById('gravity-value');

const canvas = document.querySelector('#canvas-wrapper').appendChild(app.view);

let shapes = [];
let speed = 5;

let area = 0;

//get mouse coordinates
let mousePosition;
function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}
canvas.addEventListener(
  'mousemove',
  function (evt) {
    let mousePos = getMousePos(canvas, evt);
    mousePosition = mousePos;
  },
  false
);

//create new shape
const createShape = (xPosition) => {
  const Graphics = PIXI.Graphics;
  const shape = new Graphics();

  let texture = app.renderer.generateTexture(shape);
  let sprite = new PIXI.Sprite(texture);

  shape
    .beginFill(0x4361ee)
    .drawRect(xPosition - 100 / 2, -100, 100, 100)
    .endFill();

  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.speed = speed;

  shapes.push(sprite);
  sprite.addChild(shape);
  app.stage.addChild(sprite);

  console.log(shapes);

  return sprite;
};

//onclick call createShape
window.app = app;
app.renderer.plugins.interaction.on('pointerdown', () => {
  createShape(mousePosition.x);
});

//ticker for shape movement
app.ticker.add(updateShapes);

function updateShapes(delta) {
  //move shapes and clear them from stage and array after getting out of stage
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].position.y += shapes[i].speed;
    area =
      shapes[i].children[0].width *
      shapes[i].children[0].height *
      shapes.length;

    if (shapes[i].position.y > app.screen.height) {
      shapes[i].dead = true;
    }
    if (shapes[i].dead) {
      app.stage.removeChild(shapes[i]);
      shapes.splice(i, 1);
      area = 0;
    }
  }
  //keep the info updated

  speed = Number(gravityValue.value) || 5;
  shapesCounter.innerText = `No. of current shapes on the screen: ${shapes.length}`;
  occupiedArea.innerText = `${area}p^2 of the area is occupied by the shapes.`;
}

const shapesInterval = setInterval(() => {
  createShape(Math.random() * app.screen.width);
}, 1000);
