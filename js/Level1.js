var SamuraiCat = SamuraiCat || {};

SamuraiCat.Level1 = function () { };

SamuraiCat.Level1.prototype = {

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
    this.medSpeedSong = this.game.add.audio('medSpeedSong');
    this.medSpeedSong.play();

    var text = "Level 2";
    var style = { font: "40px Avenir", fill: "#000000", align: "center" };
    var t = this.game.add.text(300, 60, text, style);

    meow = this.game.add.audio('meow');
    hiss = this.game.add.audio('hiss');
    eating = this.game.add.audio('eating');
    warCry = this.game.add.audio('loudHiss');
    this.game.world.setBounds(0, 0, 780, 780);
    this.game.stage.backgroundColor = '#87ceeb'

    this.floor = this.add.sprite(2, 740, 'floor');
    this.game.physics.arcade.enable(this.floor)
    this.floor.body.allowGravity = false;
    this.floor.body.immovable = true;

    this.ground = this.add.sprite(0, 630, 'ground');
    this.game.physics.arcade.enable(this.ground)
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    this.piggie = this.add.sprite(456, 562, 'piggie');
    this.piggie.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.piggie)
    this.piggie.animations.add('mouth');
    this.piggie.animations.play('mouth', 4, true);
    this.piggie.body.allowGravity = false;
    this.piggie.body.immovable = true;

    this.sun = this.add.sprite(481, 178, 'sun');
    this.sun.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.sun)
    this.sun.animations.add('eye');
    this.sun.animations.play('eye', 4, true);
    this.sun.body.allowGravity = false;
    this.sun.body.immovable = true;

    this.tree = this.add.sprite(650, 165, 'tree');
    this.tree.anchor.setTo(0.5);
    this.tree.scale.setTo(1.5)
    this.game.physics.arcade.enable(this.tree)
    this.tree.body.allowGravity = false;
    this.tree.body.immovable = true;

    this.exit = this.add.sprite(650, 100, 'exit');
    this.exit.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.exit)
    this.exit.animations.add('exit');
    this.exit.animations.play('exit', 4, true);
    this.exit.body.allowGravity = false;
    this.exit.body.immovable = true;

    //parse
    this.levelData = JSON.parse(this.game.cache.getText('level'))

    this.rollysticks = this.add.group();
    this.rollysticks.enableBody = true;
    this.levelData.rollysticksData.forEach(function (element) {
      this.rollysticks.create(element.x, element.y, 'rollysticks')
    }, this)
    this.rollysticks.setAll('body.immovable', true);
    this.rollysticks.setAll('body.allowGravity', false)

    this.candies = this.add.group();
    this.candies.enableBody = true;
    this.levelData.candyData.forEach(function (element) {
      this.candies.create(element.x, element.y, 'candy')
    }, this)
    this.candies.setAll('body.immovable', true);
    this.candies.setAll('body.allowGravity', false)

    this.candles = this.add.group();
    this.candles.enableBody = true;
    this.levelData.candleData.forEach(function (element) {
      this.candles.create(element.x, element.y, 'candle')
    }, this)
    this.candles.setAll('body.immovable', true);
    this.candles.setAll('body.allowGravity', false)

    this.hostessCake = this.add.group();
    this.hostessCake.enableBody = true;
    this.levelData.hostessCakeData.forEach(function (element) {
      this.hostessCake.create(element.x, element.y, 'hostessCake')
    }, this)
    this.hostessCake.setAll('body.immovable', true);
    this.hostessCake.setAll('body.allowGravity', false)
    //Spam musubi
    this.spamMusubi = this.add.group()
    this.spamMusubi.enableBody = true;

    var spamMusubi;

    this.levelData.spamMusubiData.forEach(function (element) {
      spamMusubi = this.spamMusubi.create(element.x, element.y, 'spamMusubi');
      spamMusubi.animations.add('fire', [0, 1], 4, true)
      spamMusubi.play('fire');
    }, this)
    this.spamMusubi.setAll('body.allowGravity', false);

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

    this.chowEnemy = this.add.sprite(22, 42, 'chowEnemy');
    this.game.physics.arcade.enable(this.chowEnemy);
    this.chowEnemy.body.allowGravity = false;
    this.chowEnemy.scale.setTo(1.75, 1.75)
    this.chowEnemy.animations.add('moving');
    this.chowEnemy.animations.play('moving', 4, true);
    this.chowEnemy.body.immovable = true;

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

    this.star = this.add.group();
    this.star.enableBody = true;

    this.createStar();
    this.starCreator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levelData.starFrequency, this.createStar, this)

    controls = {
      right: this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
      left: this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
      up: this.input.keyboard.addKey(Phaser.Keyboard.UP),
      spaceBar: this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    }

    this.input.keyboard.addKeyCapture([Phaser.Keyboard.RIGHT, Phaser.Keyboard.LEFT, Phaser.Keyboard.UP])
  },
  update: function () {

    this.game.physics.arcade.collide(this.player, this.ground);
    this.game.physics.arcade.collide(this.player, this.rollysticks);
    this.game.physics.arcade.collide(this.player, this.candies);
    this.game.physics.arcade.collide(this.player, this.floor);
    this.game.physics.arcade.collide(this.player, this.hostessCake)
    this.game.physics.arcade.collide(this.player, this.piggie);
    this.game.physics.arcade.collide(this.player, this.sun);

    this.game.physics.arcade.collide(this.star, this.sun)
    this.game.physics.arcade.collide(this.star, this.hostessCake)
    this.game.physics.arcade.collide(this.star, this.ground);
    this.game.physics.arcade.collide(this.star, this.rollysticks);
    this.game.physics.arcade.collide(this.star, this.candies);
    this.game.physics.arcade.collide(this.star, this.floor);

    window.x = this
    this.game.physics.arcade.collide(this.player, this.test);
    this.game.physics.arcade.overlap(this.player, this.fires, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.star, this.killPlayer);
    this.game.physics.arcade.overlap(this.player, this.tree, this.win)
    this.game.physics.arcade.overlap(this.player, this.spamMusubi, this.onPlayerSushi)


    this.star.forEach(function (element) {
      if (element.x < 10 && element.y > 600) {
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
  onPlayerSushi: function (player, spamMusubi) {
    eating.play()
    spamMusubi.kill();
  },
  killPlayer: function (player, fire) {
    meow.play()
    SamuraiCat.game.state.start('Level1');
  },
  win: function (player, goal) {
    hiss.play()
    SamuraiCat.game.state.start('Level2');
  },
  createStar: function () {
    var star = this.star.getFirstExists(false)

    if (!star) {
      star = this.star.create(0, 0, 'star');
    }

    star.body.collideWorldBounds = true;
    star.body.bounce.set(1, .75);

    star.reset(20, 80);
    star.body.velocity.x = this.levelData.starSpeed;
  }
};
