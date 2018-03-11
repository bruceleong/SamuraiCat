var SamuraiCat = SamuraiCat || {};

SamuraiCat.Level2 = function () { };

SamuraiCat.Level2.prototype = {

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
    this.game.stage.backgroundColor = '#B19CD9'
    // console.log(this.game)
    // this.map = this.add.tilemap('level');
    // this.map.addTilesetImage('backgroundBlue', 'gameTiles')
    // this.map.addTilesetImage('pig', 'pig')
    // this.background = this.map.createLayer('background')
    // this.test = this.map.createLayer('test')

    // this.background.resizeWorld();

    this.floor = this.add.sprite(2, 740, 'level2ground');
    this.game.physics.arcade.enable(this.floor)
    this.floor.body.allowGravity = false;
    this.floor.body.immovable = true;

    // this.smallPlatform = this.add.sprite( 550, 618, 'smallPlatform');
    // this.game.physics.arcade.enable(this.smallPlatform)
    // this.smallPlatform.body.allowGravity = false;
    // this.smallPlatform.body.immovable = true;

    // this.ground = this.add.sprite(0, 630, 'ground');
    // this.game.physics.arcade.enable(this.ground)
    // this.ground.body.allowGravity = false;
    // this.ground.body.immovable = true;

    this.cheshire = this.add.sprite(440, 320, 'cheshire');
    this.cheshire.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.cheshire)
    this.cheshire.animations.add('moving');
    this.cheshire.animations.play('moving', 4, true);
    this.cheshire.body.allowGravity = false;
    this.cheshire.body.immovable = true;

    this.madHatter = this.add.sprite(40, 364, 'madHatter');
    this.madHatter.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.madHatter)
    this.madHatter.animations.add('moving');
    this.madHatter.animations.play('moving', 4, true);
    this.madHatter.body.allowGravity = false;
    this.madHatter.body.immovable = true;

    this.rabbit = this.add.sprite(150, 160, 'rabbit');
    this.rabbit.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.rabbit)
    this.rabbit.animations.add('moving');
    this.rabbit.animations.play('moving', 4, true);
    this.rabbit.body.allowGravity = false;
    this.rabbit.body.immovable = true;

    this.evilQueen = this.add.sprite(730, 130, 'evilQueen');
    this.evilQueen.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.evilQueen)
    this.evilQueen.animations.add('moving');
    this.evilQueen.animations.play('moving', 4, true);
    this.evilQueen.body.allowGravity = false;
    this.evilQueen.body.immovable = true;

    console.log(this.evilQueen.animations, 'evil queen')

    this.mushroom = this.add.sprite(130, 660, 'mushroom');
    this.mushroom.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.mushroom)
    this.mushroom.body.allowGravity = false;
    this.mushroom.body.immovable = true;

    var text = "welcome to level2";
    var style = { font: "25px Avenir", fill: "#003366", align: "center" };
    var t = this.game.add.text(650, 130, text, style);
    t.anchor.set(0.5);

    //parse
    this.level2Data = JSON.parse(this.game.cache.getText('level2'));

    this.bricks = this.add.group();
    this.bricks.enableBody = true;
    this.level2Data.bricksData.forEach(function (element) {
      this.bricks.create(element.x, element.y, 'bricks')
    }, this)
    this.bricks.setAll('body.immovable', true);
    this.bricks.setAll('body.allowGravity', false)

    this.tree = this.add.group();
    this.tree.enableBody = true;
    this.level2Data.treeData.forEach(function (element) {
      this.tree.create(element.x, element.y, 'tree')
    }, this)
    this.tree.setAll('body.immovable', true);
    this.tree.setAll('body.allowGravity', false)

    this.grass = this.add.group();
    this.grass.enableBody = true;
    this.level2Data.grassData.forEach(function (element) {
      this.grass.create(element.x, element.y, 'grass')
    }, this)
    this.grass.setAll('body.immovable', true);
    this.grass.setAll('body.allowGravity', false)

    var flower;
    this.flower = this.add.group();
    this.flower.enableBody = true;
    this.level2Data.flowerData.forEach(function (element) {
      flower = this.flower.create(element.x, element.y, 'flower')
      flower.animations.add('move', [0, 1], 6, true)
      flower.play('move')
    }, this)
    this.flower.setAll('body.immovable', true);
    this.flower.setAll('body.allowGravity', false);

    var evilFlower;
    this.evilFlower = this.add.group();
    this.evilFlower.enableBody = true;
    this.level2Data.evilFlowerData.forEach(function (element) {
      evilFlower = this.evilFlower.create(element.x, element.y, 'evilFlower')
      evilFlower.animations.add('move', [0, 1, 2, 3], 6, true)
      evilFlower.play('move')
    }, this)
    this.evilFlower.setAll('body.immovable', true);
    this.evilFlower.setAll('body.allowGravity', false)


    //create player
    this.player = this.add.sprite(129, 518, 'player');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking');

    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player)
    this.player.customParams = {};

    this.game.camera.follow(this.player)

    // this.star = this.add.group();
    // this.star.enableBody = true;

    // this.createStar();
    // this.starCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.starFrequency, this.createStar, this)

    this.mkey = this.input.keyboard.addKey(Phaser.Keyboard.M)

    this.input.keyboard.addKeyCapture([Phaser.Keyboard.M])

    this.redSoldier = this.add.group();
    this.redSoldier.enableBody = true;

    this.createRedSoldier();
    this.redSoldierCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.level2Data.redSoldierFrequency, this.createRedSoldier, this)

    console.log(SamuraiCat.game)
  },
  update: function () {

    this.game.physics.arcade.collide(this.player, this.bricks);
    this.game.physics.arcade.collide(this.player, this.grass);
    this.game.physics.arcade.collide(this.player, this.mushroom);
    this.game.physics.arcade.collide(this.player, this.flower);
    this.game.physics.arcade.collide(this.player, this.madHatter)
    ;
    this.game.physics.arcade.collide(this.player, this.tree);
    this.game.physics.arcade.collide(this.player, this.cheshire);
    this.game.physics.arcade.collide(this.redSoldier, this.bricks);
    this.game.physics.arcade.collide(this.redSoldier, this.grass);
    this.game.physics.arcade.collide(this.redSoldier, this.evilFlower);
    this.game.physics.arcade.collide(this.redSoldier, this.flower);
    this.game.physics.arcade.collide(this.redSoldier, this.cheshire);

    this.game.physics.arcade.collide(this.player, this.floor);

    window.x = this;
    this.game.physics.arcade.overlap(this.player, this.evilFlower, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.redSoldier, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.door, this.win)

    this.player.body.velocity.x = 0;
    this.redSoldier.forEach(function (element) {
      if (element.x < 350 && element.y > 600) {
        element.kill()
      }
    }, this)

    if (this.mkey.isDown) {
      this.player.animations.play('slash', 4, true)
    }

    if (this.cursors.left.isDown || this.player.customParams.isMovingLeft) {
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      this.player.play('walking', 6, true);
    } else if (this.cursors.right.isDown || this.player.customParams.isMovingRight) {
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(1, 1)
      this.player.play('walking', 6, true)
    } else {
      this.player.animations.stop();
      this.player.frame = 0;
    }

    if ((this.cursors.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
    }
  },

  killPlayer: function (player, evilFlower) {
    console.log('you lost')
    SamuraiCat.game.state.start('Level2');
  },
  win: function (player, goal) {
    SamuraiCat.game.state.start('Level2');
  },
  createRedSoldier: function () {
    var redSoldier = this.redSoldier.getFirstExists(false)

    if (!redSoldier) {
      redSoldier = this.redSoldier.create(0, 0, 'redSoldier');
      redSoldier.animations.add('move', [0, 1, 2], 6, true)
      redSoldier.play('move')
    }

    redSoldier.body.collideWorldBounds = true;
    redSoldier.body.bounce.set(1, .85);

    redSoldier.reset(750, 100);
    redSoldier.body.velocity.x = this.level2Data.redSoldierSpeed;
  }
};
