//this game will have only 1 state
var GameState = {
  findObjectsByType: function (type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function (element) {
      console.log(element);
      if (element.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust the y position
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact pixel position as in Tiled
        console.log("Found " + element.name);
        element.y -= map.tileHeight;
        result.push(element);
      }
    });
    return result;
  },

  //initiate game settings
  init: function () {
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
  preload: function () {
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('brick', 'assets/images/bricks.png');
    this.load.image('candle', 'assets/images/candle.png');
    this.load.image('grass', 'assets/images/grass.png');
    this.load.image('floor', 'assets/images/transparentGround.png')
    this.load.image('goal', 'assets/images/gorilla3.png');
    this.load.image('arrowButton', 'assets/images/arrowButton.png');
    this.load.image('actionButton', 'assets/images/actionButton.png');
    this.load.image('barrel', 'assets/images/barrel.png');
    this.load.image('background', 'assets/images/backgroundBlue.png');
    this.load.tilemap('level', 'assets/images/level1.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('gameTiles', 'assets/images/backgroundBlue.png')
    this.load.image('platformBrick', 'assets/images/platformBrick.png')
    this.load.image('pig', 'assets/images/pig.png')
    this.load.image('smallPlatform', 'assets/images/smallPlatform.png')


    this.load.spritesheet('player', 'assets/images/duke_spritesheet.png', 40, 50)
    this.load.spritesheet('piggie', 'assets/images/piggie.png', 90, 100, 5)
    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);
    this.load.text('level', 'assets/data/level.json')

  },

  create: function () {
    this.map = this.add.tilemap('level');
    this.map.addTilesetImage('backgroundBlue', 'gameTiles')
    this.map.addTilesetImage('pig', 'pig')
    this.background = this.map.createLayer('background')
    this.test = this.map.createLayer('test')
    console.log(this.map)


    this.background.resizeWorld();

    this.floor = this.add.sprite(2, 740, 'floor');
    this.game.physics.arcade.enable(this.floor)
    this.floor.body.allowGravity = false;
    this.floor.body.immovable = true;

    this.smallPlatform = this.add.sprite( 550, 618, 'smallPlatform');
    this.game.physics.arcade.enable(this.smallPlatform)
    this.smallPlatform.body.allowGravity = false;
    this.smallPlatform.body.immovable = true;

    this.ground = this.add.sprite(0, 630, 'ground');
    this.game.physics.arcade.enable(this.ground)
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    this.piggie = this.add.sprite(456, 562, 'piggie');
    this.piggie.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.piggie)
    this.piggie.animations.add('walking');
    this.piggie.animations.play('walking', 4, true);
    this.piggie.body.allowGravity = false;
    this.piggie.body.immovable = true;

    //parse
    this.levelData = JSON.parse(this.game.cache.getText('level'))

    this.bricks = this.add.group();
    this.bricks.enableBody = true;

    this.levelData.bricksData.forEach(function (element) {
      this.bricks.create(element.x, element.y, 'brick')
    }, this)

    this.bricks.setAll('body.immovable', true);
    this.bricks.setAll('body.allowGravity', false)

    this.grasses = this.add.group();
    this.grasses.enableBody = true;

    this.levelData.grassData.forEach(function (element) {
      this.grasses.create(element.x, element.y, 'grass')
    }, this)

    this.grasses.setAll('body.immovable', true);
    this.grasses.setAll('body.allowGravity', false)

    this.candles = this.add.group();
    this.candles.enableBody = true;

    this.levelData.candleData.forEach(function (element) {
      this.candles.create(element.x, element.y, 'candle')
    }, this)

    this.candles.setAll('body.immovable', true);
    this.candles.setAll('body.allowGravity', false)

    //fires
    this.fires = this.add.group()
    this.fires.enableBody = true;

    var fire;

    this.levelData.fireData.forEach(function (element) {
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
    this.player = this.add.sprite(this.map.objects.GameObjects[0].x, this.map.objects.GameObjects[0].y, 'player');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking');
    this.player.animations.play('walking', 6, true)

    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player)
    this.player.customParams = {};

    this.game.camera.follow(this.player)

    // this.createOnscreenControls();
  },
  update: function () {
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, this.bricks);
    this.game.physics.arcade.collide(this.player, this.grasses);
    this.game.physics.arcade.collide(this.player, this.test);
    this.game.physics.arcade.collide(this.player, this.floor);
    this.game.physics.arcade.collide(this.player, this.smallPlatform);
    this.game.physics.arcade.collide(this.player, this.piggie)

    this.piggie.play('walking')

    window.x = this
    this.game.physics.arcade.collide(this.player, this.test);
    // console.log(this.test)

    this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.goal, this.win)

    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      // console.log(this.player, 'left walking')
      this.player.play('walking');
    } else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(1, 1)
      // console.log(this.player, 'right walking')
      this.player.play('walking')
    } else {
      this.player.animations.stop();
      this.player.frame = 0;
    }

    // if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {

      if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
        console.log('out of loop')
      this.player.body.velocity.y = -this.JUMPING_SPEED;
    } else {

      // console.log(this.player.body.touching.down, 'touching down  OUT OF STATEMENT')
    }

  },

  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
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
  killPlayer: function (player, fire) {
    // alert('you lost')
    game.state.start('GameState');
  },
  win: function (player, goal) {
    game.state.start('GameState');
  }
};

//initiate the Phaser framework

var game = new Phaser.Game(668, 668, Phaser.AUTO);

game.state.add('GameState', GameState);
game.state.start('GameState');

