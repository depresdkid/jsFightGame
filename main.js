const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {

  constructor({ position, velocity }) {
    this.position = position;
    this.velocity = velocity;
    this.speed = 10;
    this.height = 150;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x, this.position.y, 50, this.height);
  }

  update() {
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0;
    } else this.velocity.y += gravity;
  }

  move() {

    player.velocity.x = input.inputGetAxis() * 2

  }
}

class Input {
  constructor() {
    this.keys = {}
  }

  updateKeys(key) {
    if (/^Key[AD]/.test(key.code)) {
      key.preventDefault();
      this.keys[key.code] = key.type === "keydown";
    }
  }

  inputGetAxis() {
    //Horosontal
    if (this.keys.KeyD && !this.keys.KeyA) {
      return 1
    }
    if (this.keys.KeyA && !this.keys.KeyD) {
      return -1
    }

    return 0
  }
}

const input = new Input()

const player = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 10
  }
});


player.draw();


window.addEventListener('keydown', (event) => {
  input.updateKeys(event)
  if (event.code === 'KeyW') {
    player.velocity.y = -5;
  }
})


window.addEventListener('keyup', (event) => {
  input.updateKeys(event)
})

function update() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  player.update();
  player.move();
}


(function animate() {
  update();
  window.requestAnimationFrame(animate);
}());

