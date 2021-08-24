const Application = PIXI.Application;

const app = new Application({
  width: window.innerWidth,
  height: 600,
  backgroundColor: 0xfbda66,
  antialias: true,
});

console.log(app);
console.log(app.renderer);
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

//create new shape
const createShape = (xPosition) => {
  const Graphics = PIXI.Graphics;
  const shape = new Graphics();

  let texture = app.renderer.generateTexture(shape);
  let sprite = new PIXI.Sprite(texture);

  shape
    .beginFill(Math.random() * 0xffffff)
    .drawRect(xPosition - 100 / 2, -100, 100, 100)
    .endFill();

  sprite.interactive = true;
  sprite.buttonMode = true;
  sprite.speed = speed;
  sprite.on('pointerdown', destroyShape);
  // sprite.on('tap', destroyShape);
  shapes.push(sprite);

  sprite.addChild(shape);
  app.stage.addChild(sprite);

  console.log(shapes);

  return sprite;
};

//onclcik destroy shape
function destroyShape() {
  this.dead = true;
}

//onclick call createShape
window.app = app;
app.renderer.plugins.interaction.on('pointerdown', () => {
  createShape(app.renderer.plugins.interaction.mouse.global.x);
});

//ticker for shape movement
app.ticker.add(updateShapes);

function updateShapes() {
  //move shapes and clear them from stage and array after getting out of stage
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].position.y += shapes[i].speed;

    //get the area of each shape * no. of shapes
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

  //keep the info on the screen updated
  speed = Number(gravityValue.value) || 5;
  shapesCounter.innerText = `No. of current shapes on the screen: ${shapes.length}`;
  occupiedArea.innerText = `${area}p^2 of the area is occupied by the shapes.`;
}

const shapesInterval = setInterval(() => {
  createShape(Math.random() * app.screen.width);
}, 1000);
