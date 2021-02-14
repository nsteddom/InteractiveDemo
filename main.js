// Creates a new game and defines the functions to be used.

var game = new Phaser.Game(800, 600, Phaser.Auto, '', {
    preload: preload,
    create: create,
    update: update
});

// Defines the variables
var platforms
var player
var diamonds
var score = 0


// Adds all the assets needed for this state of the game.
function preload() {
    game.load.image('sky', 'assets/sky.png')
    game.load.image('ground', 'assets/platform.png')
    game.load.image('diamond', 'assets/diamond.png')
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32)
}

// Adds actions to the above assets. Adds physics, defines the heights of objects.
// What you actually see in the screen. 
function create () {
    game.physics.startSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0, 0, 'sky')

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

// Adds the actions that allow the game to perform. Includes movements and not being able
// go through objects like platforms. 
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
        // alert("You Win!")
        // score = 0
        game.state.start('state2');
    }
}

// Allows the score to increase when the diamonds are collected and updates the score. 
function collectDiamond (player, diamond) {
    diamond.kill()
    
    score += 10
    scoreText.text = 'Score: ' + score
}


// Adds a new state to the game when the score of 120 is reached. This is similiar to the abouve update,
// preload, and create functions but couldn't figure out how to do in separte .js file. 
game.state.add('state2', {
    preload: function(game){
        game.load.image('sky', 'assets/sky.png')
        game.load.image('ground', 'assets/platform.png')
        game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32)

    },
 
    create: function(game){
        game.physics.startSystem(Phaser.Physics.ARCADE)

        game.add.sprite(0, 0, 'sky')
        platforms = game.add.group()
        platforms.enableBody = true

        player = game.add.sprite(32, game.world.height - 150, 'baddie')
        game.physics.enable(player)
        player.body.gravity.y = 700
        player.body.collideWorldBounds = true

        player.animations.add('left', [0, 1], 10, true)
        player.animations.add('right', [2, 3], 10, true)

        var ground = platforms.create(0, game.world.height - 64, 'ground')
        ground.scale.setTo(2, 2)
        ground.body.immovable = true

        var ledge = platforms.create(-75, 350, 'ground')
        ledge.body.immovable = true

        ledge = platforms.create(400, 200, 'ground')
        ledge.body.immovable = true

    },

    update: function(game){
        game.physics.arcade.collide(player, platforms)

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
            player.body.velocity.y = -700
        }
    }
}, false)