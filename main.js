const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

ctx.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.2;

const background = new Sprite({
  position: {
    x: 0,
    y: 0
  },
  imageSrc: './images/background.png'
})

let timer = 20
let timerId

const input = new Input()

const player = new Player({
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
  },
  type: 'player'
});

const enemy = new Player({
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
  },
  type: 'enemy'
});


window.addEventListener('keydown', (event) => {
  input.updateKeys(event)
  if (event.code === 'KeyW') {
    player.jump();
  }
  if (event.code === 'KeyF') {
    enemy.jump();
  }

  if (event.code === 'KeyS') {
    player.attack();
  }

  if (event.code === 'ArrowDown') {
    enemy.attack();
  }
})


window.addEventListener('keyup', (event) => {
  input.updateKeys(event)
})

function update() {
  ctx.fillStyle = 'black'

  background.update();
  player.update();
  enemy.update();
  checkAttack(player, enemy)
  checkAttack(enemy, player)
  if (player.health <= 0 || enemy.health <= 0) {
    determineWinner({ player, enemy })
  }
}

function checkCollision(player, enemy) {
  return (player.attackBox.position.x + player.width + player.attackBox.width >= enemy.position.x &&
    player.attackBox.position.x + player.width <= enemy.position.x + enemy.width &&
    player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
    player.attackBox.position.y <= enemy.position.y + enemy.height)
}

function checkAttack() {
  if (checkCollision(player, enemy) && player.isAttacking) {
    player.isAttacking = false
    enemy.health -= 20
    document.querySelector('#enemyHealth').style.width = enemy.health + '%'
  }
  if (checkCollision(player, enemy) && enemy.isAttacking) {
    enemy.isAttacking = false
    player.health -= 20
    document.querySelector('#playerHealth').style.width = player.health + '%'
  }
}

function determineWinner({ player, enemy }) {
  clearTimeout(timerId)
  document.querySelector('.messange').style.display = 'block'
  if (player.health === enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Tie'
  } else if (player.health > enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 1 Win'
  } else if (player.health < enemy.health) {
    document.querySelector('#displayText').innerHTML = 'Player 2 Win'
  }
}

function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }
  else {
    determineWinner({ player, enemy })
  }
}

decreaseTimer();


(function animate() {
  update();
  window.requestAnimationFrame(animate);
}());

