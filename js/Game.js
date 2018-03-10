var SamuraiCat = SamuraiCat || {};

SamuraiCat.Game = function(){};

SamuraiCat.Game.prototype = {

  //initiate game settings
  init: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.RUNNING_SPEED = 200;
    this.JUMPING_SPEED = 580;

  },
  preload: function () {

  },

  create: function () {
    this.game.world.setBounds(0, 0, 780, 780);
    this.game.stage.backgroundColor = '#87ceeb'
    // console.log(this.game)
    // this.map = this.add.tilemap('level');
    // this.map.addTilesetImage('backgroundBlue', 'gameTiles')
    // this.map.addTilesetImage('pig', 'pig')
    // this.background = this.map.createLayer('background')
    // this.test = this.map.createLayer('test')

    // this.background.resizeWorld();

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

    this.cheshire = this.add.sprite(481, 178, 'cheshire');
    this.cheshire.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.cheshire)
    this.cheshire.animations.add('moving');
    this.cheshire.animations.play('moving', 4, true);
    this.cheshire.body.allowGravity = false;
    this.cheshire.body.immovable = true;

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
    this.player = this.add.sprite(129, 518, 'player');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking');
    this.player.animations.play('walking', 6, true)

    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player)
    this.player.customParams = {};

    this.game.camera.follow(this.player)

    this.star = this.add.group();
    this.star.enableBody = true;

    this.createStar();
    this.starCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.starFrequency, this.createStar, this)
  },
  update: function () {
    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, this.bricks);
    this.game.physics.arcade.collide(this.player, this.grasses);
    // this.game.physics.arcade.collide(this.player, this.test);
    this.game.physics.arcade.collide(this.player, this.floor);
    // this.game.physics.arcade.collide(this.player, this.smallPlatform);
    this.game.physics.arcade.collide(this.player, this.piggie);
    this.game.physics.arcade.collide(this.player, this.cheshire);

    this.game.physics.arcade.collide(this.star, this.ground);
    this.game.physics.arcade.collide(this.star, this.bricks);
    this.game.physics.arcade.collide(this.star, this.grasses);
    this.game.physics.arcade.collide(this.star, this.floor);

    this.piggie.play('walking')

    window.x = this
    this.game.physics.arcade.collide(this.player, this.test);

    this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.star, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.goal, this.win)

    this.player.body.velocity.x = 0;

    this.star.forEach(function(element) {
      if(element.x < 10 && element.y > 600) {
        element.kill()
      }
    }, this)

    if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);

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

  createFromTiledObject: function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);

      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
  killPlayer: function (player, fire) {
    // alert('you lost')
    SamuraiCat.game.state.start('Game');
  },
  win: function (player, goal) {
    SamuraiCat.game.state.start('Game');
  },
  createStar: function() {
    var star = this.star.getFirstExists(false)

    if (!star) {
      star = this.star.create(0, 0, 'star');
    }

    star.body.collideWorldBounds = true;
    star.body.bounce.set(1, .75);

    star.reset(this.levelData.goal.x, this.levelData.goal.y);
    star.body.velocity.x = this.levelData.starSpeed;
  }
};
