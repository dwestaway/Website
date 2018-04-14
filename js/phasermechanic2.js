
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaserGame', { preload: preload, create: create, update: update });
var platforms;
var player;
var maxSpeed;
var speedRight;
var speedLeft;
var snowballs;

var fireRate = 200;
var nextFire = 0;

function preload() {
	game.load.image('background', 'assets/background.png');
  game.load.image('ground', 'assets/iceground.png');
	game.load.spritesheet('player1', 'assets/player1.png', 32, 48);
	game.load.image('ledge', 'assets/iceledge.png');
	game.load.image('snowball', 'assets/snowball.png');
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


		snowballs = game.add.group();
    snowballs.enableBody = true;
    snowballs.physicsBodyType = Phaser.Physics.ARCADE;

    snowballs.createMultiple(50, 'snowball');
    snowballs.setAll('checkWorldBounds', true);
    snowballs.setAll('outOfBoundsKill', true);
		


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

		maxSpeed = 150;
		speedRight = 0;
		speedLeft = 0;
}

function update() {
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(platforms, snowballs);

    if (cursors.right.isDown)
    {
        if (speedRight < maxSpeed)
				{
						speedRight++;
						player.body.velocity.x = speedRight;
        		player.animations.play('right');
				}
    }
		else if (speedRight > 0)
		{
				speedRight--;
				player.body.velocity.x = speedRight;
		}

		if (cursors.left.isDown)
    {
        if (speedLeft < maxSpeed)
				{
						speedLeft++;
						player.body.velocity.x = -speedLeft;
        		player.animations.play('left');
				}
    }
		else if (speedLeft > 0)
		{
				speedLeft--;
				player.body.velocity.x = -speedLeft;
		}

		if (!cursors.left.isDown && !cursors.right.isDown)
		{
				player.animations.stop();

				player.frame = 4;
		}
		if (cursors.up.isDown && player.body.touching.down)
		{
				player.body.velocity.y = -350;
		}

		if (game.input.activePointer.isDown)
		    {
		        fire();
		    }

		function fire() {

		    if (game.time.now > nextFire && snowballs.countDead() > 0)
			  {
				    nextFire = game.time.now + fireRate;

				    var snowball = snowballs.getFirstDead();

				    snowball.reset(player.x - 8, player.y - 8);

				    game.physics.arcade.moveToPointer(snowball, 300);
		    }

		}

}
