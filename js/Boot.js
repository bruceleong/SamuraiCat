var SamuraiCat = SamuraiCat || {};

SamuraiCat.Boot = function(){};

SamuraiCat.Boot.prototype = {
  preload: function() {
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('preloadbar', 'assets/sampleImages/preloadBar.png');
  },
  create: function() {
    this.game.stage.backgroundColor = '#fff';

	this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	this.scale.minWidth = 240;
	this.scale.minHeight = 170;
	this.scale.maxWidth = 2880;
	this.scale.maxHeight = 1920;

	this.scale.pageAlignHorizontally = true;

	this.scale.setScreenSize(true);

	this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.state.start('Preload');
  }
};
