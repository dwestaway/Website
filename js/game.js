
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaserGame', { preload: preload, create: create, update: update });
var platforms;
var player;
var player2;

var score = 0;
var scoreText;

var score2 = 0;
var scoreText2;

var text;
var smallText;
var finishText;

function preload() {
	game.load.image('background', 'assets/background.png');
  game.load.image('ground', 'assets/ground.png');
  game.load.image('star', 'assets/treasure.png');
	game.load.spritesheet('player1', 'assets/player1.png', 32, 48);
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.image('ledge', 'assets/ledge.png');
}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'background');

    platforms = game.add.group();

    platforms.enableBody = true;

    ground = platforms.create(0, game.world.height - 65, 'ground');

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
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

		cursors = game.input.keyboard.createCursorKeys();


		player2 = game.add.sprite(750, game.world.height - 150, 'dude');

    game.physics.arcade.enable(player2);

    player2.body.bounce.y = 0.2;
    player2.body.gravity.y = 400;
    player2.body.collideWorldBounds = true;

    player2.animations.add('left', [0, 1, 2, 3], 10, true);
    player2.animations.add('right', [5, 6, 7, 8], 10, true);

		w = game.input.keyboard.addKey(Phaser.Keyboard.W);
		a = game.input.keyboard.addKey(Phaser.Keyboard.A);
		d = game.input.keyboard.addKey(Phaser.Keyboard.D);

		stars = game.add.group();

    stars.enableBody = true;

    for (var i = 0; i < 12; i++)
    {
        var star = stars.create(i * 70, 0, 'star');

        star.body.gravity.y = 50;

        star.body.bounce.y = 0.3 + Math.random() * 0.2;
    }


		scoreText = game.add.text(16, 555, 'Player 1 Score: 0', {font: '24px Arial', fill: '#77a9ff' });

		text = game.add.text(280, 550, 'Collect the Treasure', {font: '24px Arial', fill: '#FFFFFF' });

		smallText = game.add.text(280, 575, 'Player with more treasure wins', {font: '16px Arial', fill: '#FFFFFF' });

		scoreText2 = game.add.text(570, 555, 'Player 2 Score: 0', {font: '24px Arial', fill: '#ff5757' });




}

function update() {
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(player, player2);
	game.physics.arcade.overlap(player, stars, player1Treasure, null, this);

	game.physics.arcade.collide(player2, platforms);
	game.physics.arcade.overlap(player2, stars, player2Treasure, null, this);

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
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -300;
    }




	player2.body.velocity.x = 0;

			if (a.isDown)
			{
					player2.body.velocity.x = -150;

					player2.animations.play('left');
			}
			else if (d.isDown)
			{
					player2.body.velocity.x = 150;

					player2.animations.play('right');
			}
			else
			{
					player2.animations.stop();

					player2.frame = 4;
			}
			if (w.isDown && player2.body.touching.down)
			{
					player2.body.velocity.y = -300;
			}

	if (score + score2 == 1200)
	{
			if (score > score2)
			{
					finishText = game.add.text(220, 230, 'Player 1 Wins!', {font: '60px Arial', fill: '#77a9ff' });
			}
			else if (score < score2)
			{
					finishText = game.add.text(220, 230, 'Player 2 Wins!', {font: '60px Arial', fill: '#ff5757' });
			}
			else if (score === score2)
			{
				 	finishText = game.add.text(220, 230, 'Both Players Tie!', {font: '60px Arial', fill: '#FFFFFF' });

			}

	}
}
function player1Treasure (player, star) {

    star.kill();

		score = score + 100;
		scoreText.text = 'Player 1 Score: ' + score;
}
function player2Treasure (player2, star) {

    star.kill();

		score2 = score2 + 100;
		scoreText2.text = 'Player 2 Score: ' + score2;
}
