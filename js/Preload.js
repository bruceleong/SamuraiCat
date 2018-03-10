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
    this.load.image('duke', 'assets/images/duke.jpg')
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('brick', 'assets/images/bricks.png');
    this.load.image('star', 'assets/images/obstacle.png');
    this.load.image('candle', 'assets/images/candle.png');
    this.load.image('grass', 'assets/images/grass.png');
    this.load.image('floor', 'assets/images/transparentGround.png')
    this.load.image('goal', 'assets/images/gorilla3.png');
    this.load.image('arrowButton', 'assets/images/arrowButton.png');
    this.load.image('actionButton', 'assets/images/actionButton.png');
    // this.load.image('barrel', 'assets/images/barrel.png');
    this.load.image('background', 'assets/images/backgroundBlue.png');
    this.load.tilemap('level', 'assets/images/level1.json', null, Phaser.Tilemap.TILED_JSON)
    this.load.image('gameTiles', 'assets/images/backgroundBlue.png')
    this.load.image('platformBrick', 'assets/images/platformBrick.png')
    this.load.image('pig', 'assets/images/pig.png')
    this.load.image('smallPlatform', 'assets/images/smallPlatform.png')

    this.load.spritesheet('cheshire', 'assets/images/cheshire.png', 81, 80)
    this.load.spritesheet('player', 'assets/images/walking.png', 35, 48)
    this.load.spritesheet('piggie', 'assets/images/piggie.png', 83, 97, 5)
    this.load.spritesheet('fire', 'assets/images/fire_spritesheet.png', 20, 21, 2, 1, 1);
    this.load.text('level', 'assets/data/level.json')
  },
  create: function() {
    this.state.start('MainMenu');
    this.state.start('Game');
  }
};
