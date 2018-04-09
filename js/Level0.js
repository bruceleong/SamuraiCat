var SamuraiCat = SamuraiCat || {};

SamuraiCat.Level0 = function () { };

SamuraiCat.Level0.prototype = {

  //game settings
  init: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1000;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.RUNNING_SPEED = 200;
    this.JUMPING_SPEED = 580;
    currentScore = 0;

  },
  preload: function () {

  },

  create: function () {
    this.song3 = this.game.add.audio('song3')
    this.song3.play();

    var text = "Level 1";
    var style = { font: "40px Avenir", fill: "#000000 ", align: "center" };
    var t = this.game.add.text(50, 80, text, style);

    meow = this.game.add.audio('meow');
    hiss = this.game.add.audio('hiss');
    eating = this.game.add.audio('eating');
    warCry = this.game.add.audio('loudHiss');
    this.game.world.setBounds(0, 0, 780, 780);
    this.game.stage.backgroundColor = '#D3D3D3'

    this.floor = this.add.sprite(2, 740, 'floor');
    this.game.physics.arcade.enable(this.floor)
    this.floor.body.allowGravity = false;
    this.floor.body.immovable = true;

    this.thisWay = this.add.sprite(630, 100, 'thisWay');
    this.thisWay.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.thisWay)
    this.thisWay.animations.add('thisWay');
    this.thisWay.animations.play('thisWay', 4, true);
    this.thisWay.body.allowGravity = false;
    this.thisWay.body.immovable = true;

    this.heart = this.add.sprite(630, 150, 'heart');
    this.heart.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.heart)
    this.heart.animations.add('heart');
    this.heart.animations.play('heart', 4, true);
    this.heart.body.allowGravity = false;
    this.heart.body.immovable = true;

    //parse
    this.level0Data = JSON.parse(this.game.cache.getText('level0'))

    this.evilPlatform = this.add.group();
    this.evilPlatform.enableBody = true;
    this.level0Data.evilPlatformData.forEach(function (element) {
      this.evilPlatform.create(element.x, element.y, 'evilPlatform')
    }, this)
    this.evilPlatform.setAll('body.immovable', true);
    this.evilPlatform.setAll('body.allowGravity', false)

    var dukeBlue;
    this.dukeBlue = this.add.group();
    this.dukeBlue.enableBody = true;
    this.level0Data.dukeBlueData.forEach(function (element) {
      dukeBlue = this.dukeBlue.create(element.x, element.y, 'dukeBlue')
      dukeBlue.animations.add('move', [0, 1, 2, 3, 4], 2, true)
      dukeBlue.play('move')
    }, this)
    this.dukeBlue.setAll('body.immovable', true);
    this.dukeBlue.setAll('body.allowGravity', false)

    var dukeRed;
    this.dukeRed = this.add.group();
    this.dukeRed.enableBody = true;
    this.level0Data.dukeRedData.forEach(function (element) {
      dukeRed = this.dukeRed.create(element.x, element.y, 'dukeRed')
      dukeRed.animations.add('move', [0, 1, 2, 3, 4], 4, true)
      dukeRed.play('move')
    }, this)
    this.dukeRed.setAll('body.immovable', true);
    this.dukeRed.setAll('body.allowGravity', false)

    var dukeGreen;
    this.dukeGreen = this.add.group();
    this.dukeGreen.enableBody = true;
    this.level0Data.dukeGreenData.forEach(function (element) {
      dukeGreen = this.dukeGreen.create(element.x, element.y, 'dukeGreen')
      dukeGreen.scale.setTo(1, 1.25)
      dukeGreen.animations.add('move', [0, 1, 2, 3, 4], 8, true)
      dukeGreen.play('move')
    }, this)
    this.dukeGreen.setAll('body.immovable', true);
    this.dukeGreen.setAll('body.allowGravity', false)

    var dukeYellow;
    this.dukeYellow = this.add.group();
    this.dukeYellow.enableBody = true;
    this.level0Data.dukeYellowData.forEach(function (element) {
      dukeYellow = this.dukeYellow.create(element.x, element.y, 'dukeYellow')
      dukeYellow.animations.add('move', [0, 1, 2, 3, 4], 6, true)
      dukeYellow.play('move')
    }, this)
    this.dukeYellow.setAll('body.immovable', true);
    this.dukeYellow.setAll('body.allowGravity', false)

    //create player
    this.player = this.add.sprite(129, 518, 'dukeNew');
    this.player.anchor.setTo(0.5);
    this.player.animations.add('walking', [0, 1, 2], 6, true);
    this.player.animations.add('slash', [5, 6, 7, 8, 9], 20, true)

    this.player.anchor.setTo(0.5);
    // this.player.customParams = {};
    this.game.physics.arcade.enable(this.player)
    this.player.body.collideWorldBounds = true;
    this.game.camera.follow(this.player)

    this.apple = this.add.group();
    this.apple.enableBody = true;

    this.createApple();
    this.appleCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.level0Data.appleFrequency, this.createApple, this)

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
      spaceBar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    }

    this.input.keyboard.addKeyCapture([Phaser.Keyboard.RIGHT, Phaser.Keyboard.LEFT, Phaser.Keyboard.UP])

    this.createOnScreenControls()

  },
  update: function () {

    this.player.customParams = {}

    this.game.physics.arcade.collide(this.player, this.floor);
    this.game.physics.arcade.collide(this.player, this.evilPlatform);
    this.game.physics.arcade.collide(this.apple, this.evilPlatform);
    this.game.physics.arcade.collide(this.apple, this.floor);

    this.game.physics.arcade.collide(this.evilPlatform, this.dukeBlue)

    window.x = this
    this.game.physics.arcade.overlap(this.player, this.dukeRed, this.onPlayerEvilRed);
    this.game.physics.arcade.overlap(this.player, this.dukeGreen, this.onPlayerEvilGreen);
    this.game.physics.arcade.overlap(this.player, this.dukeYellow, this.onPlayerEvilYellow);
    this.game.physics.arcade.overlap(this.player, this.dukeBlue, this.onPlayerEvilBlue);
    this.game.physics.arcade.overlap(this.player, this.apple, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.heart, this.win);


    this.apple.forEach(function (element) {
      if (element.x < 10 && element.y > 600) {
        element.kill()
      }
    }, this)

    this.player.body.velocity.x = 0;

    if (controls.left.isDown) {
      if ((controls.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
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

    } else if ((controls.up.isDown || this.player.customParams.mustJump) && this.player.body.touching.down) {
      this.player.body.velocity.y = -this.JUMPING_SPEED;
    } else if (controls.spaceBar.isDown) {
      warCry.play()
      this.player.animations.play('slash')
    } else {
      this.player.animations.stop()
      this.player.frame = 0
    }

  },
  onPlayerEvilRed: function (player, dukeRed) {
    hiss.play()
    dukeRed.kill();
  },
  killPlayer: function (player, apple) {
    meow.play()
    SamuraiCat.game.state.start('Level0')
  },
  onPlayerEvilGreen: function (player, dukeGreen) {
    hiss.play()
    dukeGreen.kill();
  },
  onPlayerEvilYellow: function (player, dukeYellow) {
    hiss.play()
    dukeYellow.kill();
  },
  onPlayerEvilBlue: function (player, dukeBlue) {
    hiss.play()
    dukeBlue.kill();
  },
  win: function (player, goal) {
    hiss.play()
    SamuraiCat.game.state.start('Level1');
  },
  createApple: function () {
    var apple = this.apple.getFirstExists(false)

    if (!apple) {
      apple = this.apple.create(0, 0, 'apple');
      apple.scale.setTo(.75, .75)
    }

    apple.body.collideWorldBounds = true;
    apple.body.bounce.set(1, .85);

    apple.reset(750, 100);
    apple.body.velocity.x = this.level0Data.appleSpeed;
  },
  createOnScreenControls: function() {
    this.leftArrow = this.add.button(110, 675, 'left')
    this.jump = this.add.button(260, 675, 'jump')
    this.attack = this.add.button(410, 675, 'attack')
    this.RightArrow = this.add.button(560, 675, 'right')

    this.jump.events.onInputDown.add(function() {
      this.player.customParams.mustJump = true;
    }, this)

    this.jump.events.onInputUp.add(function() {
      this.player.customParams.mustJump = false;
    }, this)
  }
};
