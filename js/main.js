//this game will have only 1 state
var GameState = {

  //initiate game settings
  init: function() {
    //adapt to screen size, fit all the game
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.game.world.setBounds(0, 0, 360, 700);

    this.RUNNING_SPEED = 200;
    this.JUMPING_SPEED = 580;

  },
  //load the game assets before the game starts
  preload: function() {
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('platform', 'assets/images/platform.png');
    this.load.image('goal', 'assets/images/gorilla3.png');
    this.load.image('arrowButton', 'assets/images/arrowButton.png');
    this.load.image('actionButton', 'assets/images/actionButton.png');
    this.load.image('barrel', 'assets/images/barrel.png');
    this.load.image('background', 'assets/images/backgroundBlue.png');
    this.load.tilemap('level', 'assets/images/testLevel.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('gameTiles', 'assets/images/backgroundBlue.png')


    this.load.spritesheet('player', 'assets/images/duke_spritesheet.png', 40, 50)
    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);
    this.load.text('level', 'assets/data/level.json')
  },
  create: function() {
    this.map = this.add.tilemap('level');
    console.log(this.map, 'map')
    this.map.addTilesetImage('backgroundBlue', 'gameTiles')
    // this.blockedLayer1 = this.map.createLayer('blockedLayer1')
    this.tileLayer = this.map.createLayer('tileLayer')

    this.ground = this.add.sprite(0, 630, 'ground');
    this.game.physics.arcade.enable(this.ground)
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    this.platform = this.add.sprite(10, 'platform');
    this.game.physics.arcade.enable(this.platform)
    this.platform.body.allowGravity = false;
    this.platform.body.immovable = true;

    //parse
    this.levelData = JSON.parse(this.game.cache.getText('level'))

    this.platforms = this.add.group();
    this.platforms.enableBody = true;

    this.levelData.platformData.forEach(function(element) {
      this.platforms.create(element.x, element.y, 'platform')
    }, this)

    this.platforms.setAll('body.immovable', true);
    this.platforms.setAll('body.allowGravity', false)

    //fires
    this.fires = this.add.group()
    this.fires.enableBody = true;

    var fire;

    this.levelData.fireData.forEach(function(element) {
      fire = this.fires.create(element.x, element.y, 'fire');
      fire.animations.add('fire', [0, 1], 4, true)
      fire.play('fire');
    }, this)

    this.fires.setAll('body.allowGravity', false);
    //GOAL
    this.goal = this.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'goal');
    this.game.physics.arcade.enable(this.goal);
    this.goal.body.allowGravity = false;

    //create player
    this.player = this.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking');
    this.player.animations.play('walking', 6, true)

    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player)
    this.player.customParams = {};

    this.game.camera.follow(this.player)

    this.createOnscreenControls();
  },
  update: function() {
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, this.platforms);

    this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.goal, this.win)

    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1)
      this.player.play('walking');
    } else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(1, 1)
      this.player.play('walking')
    } else {
      this.player.animations.stop();
      this.player.frame = 0;
    }

    if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
    }
  },
  createOnscreenControls: function() {
    this.leftArrow = this.add.button(150, 630, 'arrowButton');
    this.rightArrow = this.add.button(300, 630, 'arrowButton');
    this.actionButton = this.add.button(500, 630, 'actionButton');

    this.leftArrow.alpha = 0.5;
    this.rightArrow.alpha = 0.5;
    this.actionButton.alpha = 0.5;

    this.leftArrow.fixedToCamera = true;
    this.rightArrow.fixedToCamera = true;
    this.actionButton.fixedToCamera = true;

    this.actionButton.events.onInputDown.add(function() {
      this.player.customParams.mustJump = true;
    }, this)
    this.actionButton.events.onInputUp.add(function() {
      this.player.customParams.mustJump = false;
    }, this)

    //left
    this.leftArrow.events.onInputDown.add(function() {
      this.player.customParams.isMovingLeft = true;
    }, this)
    this.leftArrow.events.onInputUp.add(function() {
      this.player.customParams.isMovingLeft = false;
    }, this)
    this.leftArrow.events.onInputOver.add(function() {
      this.player.customParams.isMovingLeft = true;
    }, this)
    this.leftArrow.events.onInputOut.add(function() {
      this.player.customParams.isMovingLeft = false;
    }, this)
    //right
    this.rightArrow.events.onInputDown.add(function() {
      this.player.customParams.isMovingRight = true;
    }, this)
    this.rightArrow.events.onInputUp.add(function() {
      this.player.customParams.isMovingRight = false;
    }, this)
    this.rightArrow.events.onInputOver.add(function() {
      this.player.customParams.isMovingRight = true;
    }, this)
    this.rightArrow.events.onInputOut.add(function() {
      this.player.customParams.isMovingRight = false;
    }, this)
  },
  killPlayer: function(player, fire) {
    // alert('you lost')
    game.state.start('GameState');
  },
  win: function(player, goal) {
    game.state.start('GameState');
  }
};

//initiate the Phaser framework

var game = new Phaser.Game(800, 800, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');

