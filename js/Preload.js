var SamuraiCat = SamuraiCat || {};

SamuraiCat.Preload = function(){};

SamuraiCat.Preload.prototype = {
  preload: function() {
  	//show logo in loading screen
  	this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    this.splash.anchor.setTo(0.5);

    this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
    this.preloadBar.anchor.setTo(0.5);

    this.load.setPreloadSprite(this.preloadBar);

    //sample
    this.load.image('blue', 'assets/images/blue.png');


//load game assets
    this.load.image('level2ground', 'assets/images/level2ground.png')
    this.load.image('mushroom', 'assets/images/mushroom.png')
    this.load.image('hostessCake', 'assets/images/hostessCake.png');
    this.load.image('door', 'assets/images/door.png');
    this.load.image('tree', 'assets/images/tree.png')
    this.load.image('duke', 'assets/images/duke.jpg')
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('rollysticks', 'assets/images/rollysticks.png');
    this.load.image('star', 'assets/images/obstacle.png');
    this.load.image('candle', 'assets/images/candle.png');
    this.load.image('candy', 'assets/images/candy.png');
    this.load.image('floor', 'assets/images/transparentGround.png')
    this.load.image('goal', 'assets/images/gorilla3.png');
    this.load.image('arrowButton', 'assets/images/arrowButton.png');
    this.load.image('actionButton', 'assets/images/actionButton.png');

    this.load.image('bricks', 'assets/images/bricks.png');
    this.load.image('grass', 'assets/images/grass.png');

    this.load.image('background', 'assets/images/backgroundBlue.png');
    this.load.tilemap('level', 'assets/images/level1.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('gameTiles', 'assets/images/backgroundBlue.png')
    this.load.image('platformBrick', 'assets/images/platformBrick.png')
    this.load.image('pig', 'assets/images/pig.png')
    this.load.image('smallPlatform', 'assets/images/smallPlatform.png')

    this.load.spritesheet('redSoldier', 'assets/images/redSoldier.png', 28, 50)
    this.load.spritesheet('evilFlower', 'assets/images/evilPlant.png', 36, 35)
    this.load.spritesheet('madHatter', 'assets/images/madHatter.png', 40, 70)
    this.load.spritesheet('flower', 'assets/images/flower.png', 20, 50)
    this.load.spritesheet('sun', 'assets/images/sun.png', 61, 60)
    this.load.spritesheet('dukeSlash', 'assets/images/dukeFighting.png', 35, 48)
    this.load.spritesheet('cheshire', 'assets/images/cheshire.png', 81, 80)
    this.load.spritesheet('chowEnemy', 'assets/images/chowEnemy.png', 51, 40)
    this.load.spritesheet('player', 'assets/images/walking.png', 35, 48)
    this.load.spritesheet('piggie', 'assets/images/piggie.png', 83, 97, 5)
    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);
    this.load.text('level', 'assets/data/level.json')
    this.load.text('level2', 'assets/data/level2.json')
  },
  create: function() {
    this.state.start('MainMenu');
    // this.state.start('Game');
  }
};
