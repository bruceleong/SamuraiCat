var SamuraiCat = SamuraiCat || {};

SamuraiCat.game = new Phaser.Game(768, 768, Phaser.AUTO, '');
SamuraiCat.game.state.add('Boot', SamuraiCat.Boot);
SamuraiCat.game.state.add('Preload', SamuraiCat.Preload);
SamuraiCat.game.state.add('MainMenu', SamuraiCat.MainMenu);
SamuraiCat.game.state.add('Game', SamuraiCat.Game);

SamuraiCat.game.state.start('Boot')
