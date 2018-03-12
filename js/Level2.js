var SamuraiCat = SamuraiCat || {};

SamuraiCat.Level2 = function () { };

SamuraiCat.Level2.prototype = {

  //initiate game settings
  init: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

    this.RUNNING_SPEED = 200;
    this.JUMPING_SPEED = 580;
  },
  preload: function () {

  },

  create: function () {
    var text = "Level 3";
    var style = { font: "40px Avenir", fill: "#000000", align: "center" };
    var t = this.game.add.text(560, 50, text, style);

    this.song3 = this.game.add.audio('song3')
    this.song3.play();
    soldierWalk = this.game.add.audio('soldierWalk');
    meow = this.game.add.audio('meow');
    hiss = this.game.add.audio('hiss');
    eating = this.game.add.audio('eating');
    warCry = this.game.add.audio('loudHiss');
    queenSound = this.game.add.audio('queenSound');
    rabbit = this.game.add.audio('rabbit');



    this.game.world.setBounds(0, 0, 780, 780);
    this.game.stage.backgroundColor = '#B19CD9'

    this.floor = this.add.sprite(2, 740, 'level2ground');
    this.game.physics.arcade.enable(this.floor)
    this.floor.body.allowGravity = false;
    this.floor.body.immovable = true;

    this.cheshire = this.add.sprite(420, 300, 'cheshire');
    this.cheshire.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.cheshire)
    this.cheshire.animations.add('moving');
    this.cheshire.animations.play('moving', 4, true);
    this.cheshire.body.allowGravity = false;
    this.cheshire.body.immovable = true;

    this.madHatter = this.add.sprite(400, 85, 'madHatter');
    this.madHatter.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.madHatter)
    this.madHatter.animations.add('moving');
    this.madHatter.animations.play('moving', 4, true);
    this.madHatter.body.allowGravity = false;
    this.madHatter.body.immovable = true;

    this.rabbit = this.add.sprite(150, 170, 'rabbit');
    this.rabbit.anchor.setTo(0.5);
    this.rabbit.scale.setTo(-1, 1.5)
    this.game.physics.arcade.enable(this.rabbit)
    this.rabbit.animations.add('moving');
    this.rabbit.animations.play('moving', 4, true);
    this.rabbit.body.allowGravity = false;
    this.rabbit.body.immovable = true;
    rabbit.play();

    this.door = this.add.sprite(50, 120, 'door');
    this.door.anchor.setTo(0.5);
    this.door.scale.setTo(1.25)
    this.game.physics.arcade.enable(this.door)
    this.door.body.allowGravity = false;
    this.door.body.immovable = true;

    this.evilQueen = this.add.sprite(710, 130, 'evilQueen');
    this.evilQueen.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.evilQueen)
    this.evilQueen.animations.add('moving');
    this.evilQueen.animations.play('moving', 2, true);
    queenSound.play();

    this.evilQueen.body.allowGravity = false;
    this.evilQueen.body.immovable = true;

    this.home = this.add.sprite(65, 50, 'home');
    this.home.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.home)
    this.home.animations.add('moving');
    this.home.animations.play('moving', 2, true);
    this.home.body.allowGravity = false;
    this.home.body.immovable = true;

    this.mushroom = this.add.sprite(130, 660, 'mushroom');
    this.mushroom.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.mushroom)
    this.mushroom.body.allowGravity = false;
    this.mushroom.body.immovable = true;

    //parse
    this.level2Data = JSON.parse(this.game.cache.getText('level2'));

    this.bricks = this.add.group();
    this.bricks.enableBody = true;
    this.level2Data.bricksData.forEach(function (element) {
      this.bricks.create(element.x, element.y, 'bricks')
    }, this)
    this.bricks.setAll('body.immovable', true);
    this.bricks.setAll('body.allowGravity', false)

    this.grass = this.add.group();
    this.grass.enableBody = true;
    this.level2Data.grassData.forEach(function (element) {
      this.grass.create(element.x, element.y, 'grass')
    }, this)
    this.grass.setAll('body.immovable', true);
    this.grass.setAll('body.allowGravity', false)

    //teaCup
    this.teaCup = this.add.group()
    this.teaCup.enableBody = true;

    var teaCup;

    this.level2Data.teaCupData.forEach(function (element) {
      teaCup = this.teaCup.create(element.x, element.y, 'teaCup');
      teaCup.animations.add('cup', [0, 1], 4, true)
      teaCup.play('cup');
    }, this)
    this.teaCup.setAll('body.allowGravity', false);

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

    this.mkey = this.input.keyboard.addKey(Phaser.Keyboard.M)

    this.input.keyboard.addKeyCapture([Phaser.Keyboard.M])

    this.player = this.add.sprite(129, 518, 'dukeNew');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [0, 1, 2], 6, true);
    this.player.animations.add('slash', [5, 6, 7, 8, 9], 20, true)

    this.player.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true;
    this.game.camera.follow(this.player)


    this.redSoldier = this.add.group();
    this.redSoldier.enableBody = true;

    this.createRedSoldier();
    this.redSoldierCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.level2Data.redSoldierFrequency, this.createRedSoldier, this)

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
      spaceBar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    }

    this.input.keyboard.addKeyCapture([Phaser.Keyboard.RIGHT, Phaser.Keyboard.LEFT, Phaser.Keyboard.UP])


  },
  update: function () {
    this.game.physics.arcade.collide(this.player, this.bricks);
    this.game.physics.arcade.collide(this.player, this.grass);
    this.game.physics.arcade.collide(this.player, this.mushroom);
    this.game.physics.arcade.collide(this.player, this.flower);
    this.game.physics.arcade.collide(this.player, this.madHatter)
      ;
    this.game.physics.arcade.collide(this.player, this.rabbit, this.rabbitTalk);
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
    this.game.physics.arcade.overlap(this.player, this.teaCup, this.onPlayerTea)

    this.player.body.velocity.x = 0;
    this.redSoldier.forEach(function (element) {
      if (element.x < 350 && element.y > 600) {
        element.kill()
      }
    }, this)

    this.player.body.velocity.x = 0;

    if (controls.left.isDown) {
      if (controls.up.isDown && this.player.body.touching.down) {
        this.player.body.velocity.y = -this.JUMPING_SPEED;
        this.player.body.velocity.x = -this.RUNNING_SPEED;
        this.player.scale.setTo(-1, 1);
        this.player.animations.play('walking');

      }
      this.player.body.velocity.x = -this.RUNNING_SPEED;
      this.player.scale.setTo(-1, 1);
      this.player.animations.play('walking');


    } else if (controls.right.isDown) {
      if (controls.up.isDown && this.player.body.touching.down) {
        this.player.body.velocity.y = -this.JUMPING_SPEED;
        this.player.body.velocity.x = this.RUNNING_SPEED;
        this.player.scale.setTo(1, 1);
        this.player.animations.play('walking');

      }
      this.player.body.velocity.x = this.RUNNING_SPEED;
      this.player.scale.setTo(1, 1)
      this.player.animations.play('walking')

    } else if (controls.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
    } else if (controls.spaceBar.isDown) {
      warCry.play();
      this.player.animations.play('slash')
    } else {
      this.player.animations.stop()
      this.player.frame = 0
    }
  },

  onPlayerTea: function(player, teaCup) {
    eating.play();
    teaCup.kill()
  },

  killPlayer: function (player, evilFlower) {
    meow.play();
    SamuraiCat.game.state.start('Level2');
  },
  win: function (player, goal) {
    hiss.play();
    SamuraiCat.game.state.start('Final');
  },
  createRedSoldier: function () {
    var redSoldier = this.redSoldier.getFirstExists(false)

    if (!redSoldier) {
      redSoldier = this.redSoldier.create(0, 0, 'redSoldier');
      redSoldier.animations.add('move', [0, 1, 2], 6, true)
      redSoldier.play('move');
      soldierWalk.play();
    }

    redSoldier.body.collideWorldBounds = true;
    redSoldier.body.bounce.set(1, .85);

    redSoldier.reset(750, 100);
    redSoldier.body.velocity.x = this.level2Data.redSoldierSpeed;
  }
};
