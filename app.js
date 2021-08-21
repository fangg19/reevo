const Application = PIXI.Application;

const app = new Application({
  width: 1000,
  height: 700,
  backgroundColor: 0xfbda66,
});

document.body.appendChild(app.view);

const container = new PIXI.Container();
const Graphics = PIXI.Graphics;

const randomX = Math.random() * app.screen.width;
const randomY = Math.random() * app.screen.height;

//get mouse coordinates
let mouseX = document.body.addEventListener('mousemove', (event) => {
  mouseX = event.x;
});

//create new shape
const createShape = () => {
  const triangle = new Graphics();

  triangle
    .beginFill(0x4361ee)
    .drawPolygon([400, 50, 350, 150, 450, 120])
    .endFill();

  container.addChild(triangle);
  app.stage.addChild(container);

  container.y = 0;
  container.x = mouseX;
  console.log(mouseX);
};

//onclick call createShape
document.body.addEventListener('click', createShape);

//ticker for shape movement
app.ticker.add((delta) => loop(delta));
function loop(delta) {
  container.y += 1;
}
