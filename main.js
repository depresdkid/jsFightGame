const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

let timer = 20
function decreaseTimer() {
  setTimeout(decreaseTimer, 1000)
  if (timer > 0) {
    timer--
    document.querySelector('#timer').innerHTML = timer
  }
}

decreaseTimer()

class Sprite {

  constructor({ position, velocity, color, offset }) {
    this.position = position;
    this.velocity = velocity;
    this.speed = 10;
    this.height = 150;
    this.width = 50;
    this.isGround = true;
    this.health = 100,
      this.attackBox = {
        position: {
          x: this.position.x,
          y: this.position.y
        },
        offset,
        width: 100,
        height: 50
      }
    this.color = color;
    this.isAttacking = false
    this.attackSpeed = 100
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
    this.attackBox.position.x = this.position.x - this.attackBox.offset.x
    this.attackBox.position.y = this.position.y

    this.position.y += this.velocity.y
    this.position.x += this.velocity.x
    if (this.position.y + this.height + this.velocity.y >= canvas.height) {
      this.velocity.y = 0
      this.isGround = true
    } else {
      this.velocity.y += gravity
      this.isGround = false
    };

    this.move();


  }

  move() {
    player.velocity.x = input.inputGetAxis() * 2
  }

  jump() {
    if (this.isGround) {
      player.velocity.y = -10;
    }
  }

  attack() {
    this.isAttacking = true
    setTimeout(() => {
      this.isAttacking = false
    }, this.attackSpeed)
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
  color: 'blue',
  offset: {
    x: 0,
    y: 0
  }
});

const enemy = new Sprite({
  position: {
    x: 500,
    y: 0
  },
  velocity: {
    x: 0,
    y: 10
  },
  color: 'red',
  offset: {
    x: 150,
    y: 0
  }
});

player.draw();


window.addEventListener('keydown', (event) => {
  input.updateKeys(event)
  if (event.code === 'KeyW') {
    player.jump();
  }

  if (event.code === 'Space') {
    player.attack();
  }
})


window.addEventListener('keyup', (event) => {
  input.updateKeys(event)
})

function update() {
  ctx.fillStyle = 'black'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  player.update();
  enemy.update();
  CheckAttack(player, enemy)
}

function checkCollision(player, enemy) {
  return (player.attackBox.position.x + player.width + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x + player.width <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height)
}

function CheckAttack() {
  if (checkCollision(player, enemy) && player.isAttacking) {
    player.isAttacking = false
    enemy.health -= 20
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
  }
}

(function animate() {
  update();
  window.requestAnimationFrame(animate);
}());

