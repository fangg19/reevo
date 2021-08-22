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

const canvas = document.querySelector('#canvas-wrapper').appendChild(app.view);

//generating graphics and turning them into sprites
const Graphics = PIXI.Graphics;
const rectangle = new Graphics();

let texture = app.renderer.generateTexture(rectangle);
let sprite = new PIXI.Sprite(texture);

function destroy() {
  sprite.destroy(true);
}

sprite.interactive = true;
sprite.buttonMode = true;
sprite.on('pointerdown', destroy);

let shapes = [];

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
const createShape = () => {
  rectangle
    .beginFill(0x4361ee)
    .drawRect(mousePosition.x - 100 / 2, 0, 100, 100)
    .endFill();
  shapes.push(sprite);

  sprite.addChild(rectangle);
  app.stage.addChild(sprite);

  console.log(sprite);
  console.log(shapes);

  shapesCounter.innerText = `No. of current shapes: ${shapes.length}`;
  occupiedArea.innerText = `10% of the area is occupied.`;
};

//onclick call createShape
canvas.addEventListener('pointerdown', createShape);

//ticker for shape movement
app.ticker.add((delta) => loop(delta));
const loop = (delta) => {
  // rectangle.y += 1;
};
