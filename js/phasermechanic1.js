
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaserGame', { preload: preload, create: create, update: update });
var platforms;
var player;

function preload() {
	game.load.image('background', 'assets/background.png');
  game.load.image('ground', 'assets/ground.png');
	game.load.spritesheet('player1', 'assets/player1.png', 32, 48);
	game.load.image('ledge', 'assets/ledge.png');
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'background');

    platforms = game.add.group();

    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 65, 'ground');

    ground.body.immovable = true;




		var ledge;

    ledge = platforms.create(400, 440, 'ledge');

    ledge.body.immovable = true;

    ledge = platforms.create(-100, 300, 'ledge');

    ledge.body.immovable = true;

		ledge = platforms.create(360, 100, 'ledge');

    ledge.body.immovable = true;

		ledge = platforms.create(200, 350, 'ledge');

    ledge.body.immovable = true;

		ledge = platforms.create(80, 200, 'ledge');

    ledge.body.immovable = true;

		ledge = platforms.create(500, 300, 'ledge');

    ledge.body.immovable = true;

		ledge = platforms.create(700, 200, 'ledge');

    ledge.body.immovable = true;




		player = game.add.sprite(32, game.world.height - 150, 'player1');

    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 500;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

		cursors = game.input.keyboard.createCursorKeys();

		jumping = false;

		jumps = 0;

}

function update() {
	game.physics.arcade.collide(player, platforms);

	player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        player.animations.stop();

        player.frame = 4;
    }

		if (player.body.touching.down) {
			 	jumps = 0;
			 	jumping = false;
		}
	 	if (jumps < 2 && cursors.up.isDown) {
			 	player.body.velocity.y = -250;
			 	jumping = true;
	 	}
	 	if (jumping && !cursors.up.isDown) {
			 	jumps++;
			 	jumping = false;
	 	}


}
