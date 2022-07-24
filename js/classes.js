class Sprite {
    constructor({ position, imageSrc }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
    }

    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)

    }

    update() {
        this.draw()
    }
}

class Player {

    constructor({ position, velocity, color, offset, type }) {
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
        this.type = type
    }

    draw() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)

        //attack
        if (this.isAttacking) {
            ctx.fillStyle = 'green'
            ctx.fillRect(this.attackBox.position.x + this.width, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
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
        this.velocity.x = input.inputGetAxis(this.type) * 2
    }

    jump() {
        if (this.isGround) {
            this.velocity.y = -10;
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
        if (/^Key[WAD]/.test(key.code) || /^Arrow[RightLeftDown]/.test(key.code)) {
            console.log(key);
            key.preventDefault();
            this.keys[key.code] = key.type === "keydown";
        }
    }

    inputGetAxis(player) {
        //Horosontal
        if (player === 'player') {
            if (this.keys.KeyD && !this.keys.KeyA) {
                return 1
            }
            if (this.keys.KeyA && !this.keys.KeyD) {
                return -1
            }
        }
        if (player === 'enemy') {
            if (this.keys.ArrowRight && !this.keys.ArrowLeft) {
                return 1
            }
            if (this.keys.ArrowLeft && !this.keys.ArrowRight) {
                return -1
            }
        }

        return 0
    }


}