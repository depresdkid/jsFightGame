const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

class Sprite {

  constructor({ position, velocity, color }) {
    this.position = position;
    this.velocity = velocity;
    this.speed = 10;
    this.height = 150;
    this.width = 50;
    this.isGround = true;
    this.attackBox = {
      position: this.position,
      width: 100,
      height: 50
    }
    this.color = color;
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

    //attack
    ctx.fillStyle = 'green'
    ctx.fillRect(this.attackBox.position.x + this.width, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

  }

  update() {
    this.draw()
    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
      this.isGround = true
    } else {
      this.velocity.y += gravity
      this.isGround = false
    };
  }

  move() {
    player.velocity.x = input.inputGetAxis() * 2
  }

  jump() {
    if (this.isGround) {
      player.velocity.y = -10;
    }
  }
}

class Input {
  constructor() {
    this.keys = {}
  }

  updateKeys(key) {
    if (/^Key[WAD]/.test(key.code)) {
      key.preventDefault();
      this.keys[key.code] = key.type === "keydown";
    }
  }

  inputGetAxis(orentation) {
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
  },
  color: 'blue'
});


player.draw();


window.addEventListener('keydown', (event) => {
  input.updateKeys(event)
  if (event.code === 'KeyW') {
    player.jump();
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

