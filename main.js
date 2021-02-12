var game = new Phaser.Game(800, 600, Phaser.Auto, '', {
    preload: preload,
    create: create,
    update: update
});

var platforms
var player
var diamonds
var score = 0


function preload() {
    game.load.image('sky', 'assets/sky.png')
    game.load.image('landscape', 'assets/landscape.png')
    game.load.image('ground', 'assets/platform.png')
    game.load.image('diamond', 'assets/diamond.png')
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32)
}

function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0, 0, 'sky')
    // game.add.sprint(0, 0, 'landscape')

    platforms = game.add.group()
    platforms.enableBody = true

    var ground = platforms.create(0, game.world.height - 64, 'ground')
    ground.scale.setTo(2, 2)
    ground.body.immovable = true

    var ledge = platforms.create(400, 450, 'ground')
    ledge.body.immovable = true

    ledge = platforms.create(-75, 350, 'ground')
    ledge.body.immovable = true

    player = game.add.sprite(32, game.world.height - 150, 'baddie')
    game.physics.enable(player)
    player.body.gravity.y = 700
    player.body.collideWorldBounds = true

    player.animations.add('left', [0, 1], 10, true)
    player.animations.add('right', [2, 3], 10, true)

    diamonds = game.add.group()
    diamonds.enableBody = true

    for (var i = 0; i < 12; i++) { 
        var diamond = diamonds.create(i * 70, 0, 'diamond')
        diamond.body.gravity.y = 1000
        diamond.body.bounce.y = 0.3 + Math.random() * 0.2
    }

    scoreText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000'})
    cursors = game.input.keyboard.createCursorKeys()

}

function update () {

    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(diamonds, platforms)
    game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this)

    player.body.velocity.x = 0

    if (cursors.left.isDown) {
        player.body.velocity.x = -150
        player.animations.play('left')
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150
        player.animations.play('right')
    } else {
        player.animations.stop()
    }
    if (cursors.up.isDown && player.body.touching.down){
        player.body.velocity.y = -400
    }
    if (score == 120) {
        alert("You Win!")
        score = 0
    }
}

function collectDiamond (player, diamond) {
    diamond.kill()
    
    score += 10
    scoreText.text = 'Score: ' + score
}
