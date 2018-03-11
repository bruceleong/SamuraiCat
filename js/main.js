var SamuraiCat = SamuraiCat || {};

SamuraiCat.game = new Phaser.Game(768, 768, Phaser.AUTO, '');
SamuraiCat.game.state.add('Boot', SamuraiCat.Boot);
SamuraiCat.game.state.add('Preload', SamuraiCat.Preload);
SamuraiCat.game.state.add('MainMenu', SamuraiCat.MainMenu);
SamuraiCat.game.state.add('Level2', SamuraiCat.Level2);
SamuraiCat.game.state.add('Level1', SamuraiCat.Level1);

SamuraiCat.game.state.start('Boot')
